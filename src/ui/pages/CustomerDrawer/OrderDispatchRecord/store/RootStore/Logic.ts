import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { showErrorInfo, to } from "@/utils/tools";
import {
  delete_dispatch_records,
  get_customer_dispatch_page,
} from "@/pages/CustomerDrawer/service";
import { IOrderDispatchRecord } from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import { Modal } from "@/components/TXModal";
import { message } from "antd";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IOrderDispatchRecord[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getCustomerDispatchPage = withRequest(
      this.getCustomerDispatchPage,
      "getCustomerDispatchPage"
    );
    this.deleteRecord = withRequest(this.deleteRecord, "deleteRecord");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getCustomerDispatchPage() {
    const { propsStore } = this.rootStore;
    if (!propsStore.props.detail?.id) {
      return;
    }
    const [err, res] = await to(
      get_customer_dispatch_page({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        customerId: propsStore.props.detail?.id,
      })
    );
    if (err || !res?.data) {
      showErrorInfo({
        err,
        res,
      });
      return;
    }
    runInAction(() => {
      this.dataSource = res.data.records || [];
      this.pagination.total = +(res.data.total || 0);
    });
  }

  resetPageData() {
    this.dataSource = [];
    this.pagination.current = 1;
    this.pagination.total = 0;
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getCustomerDispatchPage();
  }

  async deleteRecord(record: IOrderDispatchRecord) {
    const [err, res] = await to(delete_dispatch_records({ id: record.id }));
    if (err) {
      showErrorInfo({
        err,
        res,
      });
      return;
    }
    runInAction(() => {
      message.success("删除成功");
      this.getCustomerDispatchPage();
    });
  }

  recordAction(record: IOrderDispatchRecord, action: TAction) {
    const { refs } = this.rootStore;
    switch (action) {
      case "MESSAGE":
        {
          refs.msgRef.current?.openModal({
            dispatchId: record.id,
          });
        }
        break;
      case "EDIT":
        {
          refs.statusRef.current?.open({
            ...record,
            forceHandleFlag: true,
          });
        }
        break;
      case "FEEDBACK":
        {
          refs.feedbackRef.current?.openDrawer({
            dispatchItemIdList: record.dispatchItemIdList,
          });
        }
        break;
      case "DEAL":
        {
          refs.dealRef.current?.openModal({
            dispatchId: record.id,
            customerId: record.customerId,
            orgId: record.orgId,
          });
        }
        break;
      case "DELETE": {
        let that = this;
        Modal.confirm({
          title: "确定删除该派单吗？",
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
