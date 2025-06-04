import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, ISearchInfo, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { showErrorInfo, to } from "@/utils/tools";
import { delete_channel_group } from "@/pages/SchedulingManagement/service";
import { ITransactionRecord } from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import { message } from "antd";
import {
  delete_customer_deal,
  get_customer_deal_page,
} from "@/pages/CustomerDrawer/service";
import { Modal } from "@/components/TXModal";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: ITransactionRecord[] = [];
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
    this.deleteRecord = withRequest(this.deleteRecord, "deleteRecord");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getList() {
    const { propsStore } = this.rootStore;
    if (!propsStore.props.detail?.id) {
      return;
    }

    const [err, res] = await to(
      get_customer_deal_page({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        customerId: propsStore.props.detail?.id,
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

  async deleteRecord(record: ITransactionRecord) {
    const [err, res] = await to(delete_customer_deal({ id: record.id }));
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

  recordAction(record: ITransactionRecord, action: TAction) {
    const { refs } = this.rootStore;
    switch (action) {
      case "DETAIL":
        {
          refs.detailRef.current?.openModal({
            id: record.id,
          });
        }
        break;
      case "DELETE": {
        let that = this;
        Modal.confirm({
          title: "确定删除该成交记录吗？",
          content: "删除后无法恢复",
          okText: "确定",
          cancelText: "取消",
          onOk() {
            runInAction(() => {
              that.deleteRecord(record);
            });
          },
        });
      }
    }
  }
}
