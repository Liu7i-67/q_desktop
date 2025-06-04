import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, ISearchInfo, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { showErrorInfo, to } from "@/utils/tools";
import {
  delete_channel_group,
  get_channel_group,
} from "@/pages/SchedulingManagement/service";
import { IChannelGrouping } from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import { message } from "antd";
import { Modal } from "@/components/TXModal";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IChannelGrouping[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  formInfo: ISearchInfo = {};
  expandRows: string[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    this.deleteGroup = withRequest(this.deleteGroup, "deleteGroup");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onSearch(info: ISearchInfo) {
    this.formInfo = info;
    this.pagination.current = 1;
    this.pagination.total = 0;
    this.dataSource = [];
    this.getList();
  }

  async getList() {
    const [err, res] = await to(
      get_channel_group({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        groupName: this.formInfo.groupName,
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

  async deleteGroup(record: IChannelGrouping) {
    const [err, res] = await to(
      delete_channel_group({ groupIdList: [record.groupId] })
    );
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

  setExpandRows(keys: string[]) {
    this.expandRows = keys;
  }

  onAction(action: TAction, record: IChannelGrouping) {
    const { refs } = this.rootStore;
    switch (action) {
      case "EDIT":
        {
          refs.editRef.current?.openModal({
            old: record,
          });
        }
        break;
      case "DELETE":
        {
          Modal.confirm({
            title: "确认删除",
            content: "确认删除该渠道分组？",
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
              this.deleteGroup(record);
            },
          });
        }
        break;
    }
  }
}
