import { Modal } from "@/components/TXModal";
import { IReqBusinessV1CustomerDealGetPage } from "@/service/business/v1/customer-deal/get-page";
import { IPagination, TAction } from "@/utils/interface";
import { deleteEmptyKey, showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import type { UploadRequestOption } from "rc-upload/lib/interface";
import { ITransactionManageV2 } from "../../interface";
import { delete_deal, export_deal, get_deal_page, upload } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: ITransactionManageV2[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    this.deleteRecord = withRequest(this.deleteRecord, "deleteRecord");
    this.onExport = withRequest(this.onExport, "onExport");
    this.onUpload = withRequest(this.onUpload, "onUpload");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getList() {
    const values = this.generateSearchFormRequest();
    const [err, res] = await to(get_deal_page(values));
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.dataSource = res.data?.records || [];
      this.pagination.total = +(res.data?.total || 0);
    });
  }

  async deleteRecord(id: string) {
    const [err, res] = await to(delete_deal({ id }));
    if (err || !res) {
      showErrorInfo({
        err,
        res,
        msg: "删除失败",
      });
      return;
    }
    runInAction(() => {
      message.success("删除成功");
      this.getList();
    });
  }

  async onExport() {
    const values = this.generateSearchFormRequest();
    const [err, res] = await to(export_deal(values));
    if (err || !res || res.code !== 200) {
      showErrorInfo({
        err,
        res,
      });
      return;
    }
    if (res.data?.fileDTO?.fullPath) {
      const link = document.createElement("a");
      link.href = res.data.fileDTO.fullPath;
      link.download = res.data.fileDTO.fileName || "成交信息导出.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      message.success("导出成功");
    } else if (res.data.exportAsync) {
      message.warning("本次操作后台处理中，请稍后到下载中心下载");
    } else if (res.data.noDataFlag) {
      message.warning("暂无数据");
    } else {
      message.error(res.msg);
    }
  }

  async onUpload(info: UploadRequestOption<any>) {
    const file = info.file;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const [err, res] = await to(upload(formData));
      if (err || !res) {
        showErrorInfo({
          err,
          res,
        });
        return;
      }
      message.success("数据正在处理中，请稍后刷新界面查看");
    }
  }

  generateSearchFormRequest() {
    const values = this.rootStore.refs.form.getFieldsValue();
    const createUserIdList = values?.createUserIdList
      ? values.createUserIdList.map((item: string) => {
          return item.replace(/_.*$/, "");
        })
      : null;
    const request = {
      phoneNumber: values.phoneNumber,
      wechatNumber: values.wechatNumber,
      createUserIdList: createUserIdList?.join(","),
      createTimeStart: values.createTime?.[0]
        ?.startOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
      createTimeEnd: values.createTime?.[1]
        ?.endOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
      dealDateStart: values.confirmTime?.[0]
        ?.startOf("day")
        .format("YYYY-MM-DD"),
      dealDateEnd: values.confirmTime?.[1]?.endOf("day").format("YYYY-MM-DD"),
      dealStatus: values.dealStatus,
      orgIdList: values.orgIdList ? values.orgIdList.join(",") : undefined,
      page: this.pagination.current,
      size: this.pagination.pageSize,
    };
    return deleteEmptyKey(request) as IReqBusinessV1CustomerDealGetPage;
  }

  onSearch() {
    this.pagination.current = 1;
    this.getList();
  }

  onReset() {
    this.pagination.current = 1;
    this.rootStore.refs.form.resetFields();
    this.getList();
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
  }

  onAction(action: TAction, record: ITransactionManageV2) {
    const { refs } = this.rootStore;
    switch (action) {
      case "DETAIL":
        {
          refs.transactionRecordDetailModalRef.current?.openModal({
            id: record.id,
            tabKey: "NONE",
          });
        }
        break;
      case "CONFIRM":
        {
          refs.transactionEditRecordDetailModalRef.current?.openModal({
            id: record.id,
            tabKey: "COMFIRM",
          });
        }
        break;
      case "CANNEL":
        {
          refs.transactionEditRecordDetailModalRef.current?.openModal({
            id: record.id,
            tabKey: "CANCEL",
          });
        }
        break;
      case "DELETE":
        {
          Modal.confirm({
            title: "确认删除",
            content: "确定要删除这条成交记录吗？",
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
              this.deleteRecord(record.id);
            },
          });
        }
        break;
    }
  }
}
