import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, ISearchInfo, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { to } from "@/utils/tools";
import { ILiveDataV2 } from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import { message } from "antd";
import { getLiveData, exportData } from "../../services";
import dayjs from "dayjs";
import { IReqReportV1ReportAnchorCustomerDataPagination } from "@/service/report/v1/report/ANCHOR_CUSTOMER_DATA/pagination";
import { exportDownload } from "@/utils/tools";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: ILiveDataV2[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  formInfo: ISearchInfo = { date: [dayjs().startOf("month"), dayjs()] };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    this.exportData = withRequest(this.exportData, "exportData");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onSearch(info: ISearchInfo) {
    this.formInfo = info;
    this.pagination.current = 1;
    this.getList();
  }

  async getList() {
    const { date, liverStreamerIdList } = this.formInfo;
    const params: IReqReportV1ReportAnchorCustomerDataPagination = {
      page: this.pagination.current,
      size: this.pagination.pageSize,
      liverStreamerIdList,
    };
    if (date) {
      params.startLocalDateTime = dayjs(date[0]).format("YYYY-MM-DD 00:00:00");
      params.endLocalDateTime = dayjs(date[1]).format("YYYY-MM-DD 23:59:59");
    }
    const [err, res] = await to(getLiveData(params));
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

  async exportData() {
    const { date, liverStreamerIdList } = this.formInfo;
    const params: {
      startLocalDateTime?: string;
      endLocalDateTime?: string;
      liverStreamerIdList?: string[];
    } = {
      liverStreamerIdList,
    };
    if (date) {
      params.startLocalDateTime = dayjs(date[0]).format("YYYY-MM-DD 00:00:00");
      params.endLocalDateTime = dayjs(date[1]).format("YYYY-MM-DD 23:59:59");
    }
    const [err, res] = await to(exportData(params));
    if (err || !res) {
      return;
    }
    runInAction(() => {
      exportDownload(res.data);
    });
  }

  onAction(action: TAction, record: ILiveDataV2) {
    switch (action) {
      case "DETAIL":
        this.rootStore.refs.detailRef.current?.openDrawer({
          id: record.liveStreamerId,
          startLocalDateTime:
            this.formInfo.date?.[0]?.format("YYYY-MM-DD 00:00:00") || "",
          endLocalDateTime:
            this.formInfo.date?.[1]?.format("YYYY-MM-DD 23:59:59") || "",
        });
        break;
    }
  }
}
