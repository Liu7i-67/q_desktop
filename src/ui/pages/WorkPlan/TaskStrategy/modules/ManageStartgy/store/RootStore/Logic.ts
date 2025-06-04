import { IPagination, TAction } from "@/utils/interface";
import { showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import { IManageStartgy } from "../../interface";
import { delete_task, get_task_strategy_page } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IManageStartgy[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    this.onDeleteTask = withRequest(this.onDeleteTask, "onDeleteTask");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getList() {
    const [err, res] = await to(
      get_task_strategy_page({
        taskStrategyRole: "CARETAKER",
        page: this.pagination.current,
        size: this.pagination.pageSize,
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

  async onDeleteTask(id: string) {
    const [err, res] = await to(
      delete_task({
        idList: [id],
      })
    );
    if (err || !res) {
      showErrorInfo({
        err,
        res,
        msg: "删除失败",
      });
      return;
    }
    message.success("删除成功");
    await this.getList();
  }

  onAction(action: TAction, record: IManageStartgy) {
    const { propsStore } = this.rootStore;
    switch (action) {
      case "EDIT":
        {
          propsStore.props.onSetManageStartgyEditId(record.id);
          propsStore.props.onStrategyVisibleChange(true);
        }
        break;
    }
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
  }
}
