import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, ISearchInfo, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { to } from "@/utils/tools";
import { IPagination } from "@/utils/interface";
import { message } from "antd";
import { get_xhs_leads_page, export_xhs_leads } from "../../service";
import { IResBusinessV1LittleRedBookLeadsPushGetPage } from "@/service/business/v1/little-red-book-leads-push/get-page";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IResBusinessV1LittleRedBookLeadsPushGetPage[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  formInfo: ISearchInfo = {};

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    this.exportList = withRequest(this.exportList, "exportList");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onSearch(info: ISearchInfo) {
    this.formInfo = info;
    this.pagination.current = 1;
    this.getList();
  }

  onReset() {
    this.formInfo = {};
    this.pagination.current = 1;
    this.getList();
  }

  async getList() {
    const { createTime, leadsTagList, channelIdList, ...restFormInfo } =
      this.formInfo;

    const values = {
      ...restFormInfo,
      leadsTagList: leadsTagList?.join(","),
      channelIdList: channelIdList?.join(","),
      timeStart: createTime?.[0]?.format("YYYY-MM-DD 00:00:00"),
      timeEnd: createTime?.[1]?.format("YYYY-MM-DD 23:59:59"),
    };
    const [err, res] = await to(
      get_xhs_leads_page({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        ...values,
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.dataSource = res.data?.records || [];
      this.pagination.total = +(res.data?.total || 0);
    });
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
  }

  async exportList() {
    const { createTime, leadsTagList, channelIdList, ...restFormInfo } =
      this.formInfo;
    const values = {
      ...restFormInfo,
      leadsTagList: leadsTagList?.join(","),
      channelIdList: channelIdList?.join(","),
      timeStart: createTime?.[0]?.format("YYYY-MM-DD 00:00:00"),
      timeEnd: createTime?.[1]?.format("YYYY-MM-DD 23:59:59"),
    };
    // 去除空值字段
    const newValues = Object.fromEntries(
      Object.entries(values).filter(
        ([_, v]) => v !== null && v !== undefined && v !== ""
      )
    );
    const [err, res] = await to(
      export_xhs_leads({
        ...newValues,
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      if (res.code !== 200) {
        message.error(res.msg);
        return;
      }
      const fileDTO = res.data?.fileDTO;
      if (fileDTO?.fullPath) {
        const link = document.createElement("a");
        link.href = fileDTO.fullPath;
        link.download = fileDTO.fileName || "小红书聚光线索导出.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        message.success("导出成功");
        return;
      }

      if (res.data?.exportAsync) {
        message.warning("本次操作后台处理中，请稍后到下载中心下载");
        return;
      }

      if (res.data?.noDataFlag) {
        message.warning("暂无数据");
        return;
      }
    });
  }
}
