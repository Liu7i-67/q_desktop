import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { showErrorInfo, to } from "@/utils/tools";
import {
  get_user_channel_relation_page,
  delete_user_channel_relation,
} from "../../service";
import { IPagination, TAction } from "@/utils/interface";
import { message, Modal } from "antd";
import { IResBaseV1UserChannelRelationGetPage } from "@/service/base/v1/user-channel-relation/getPage";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IResBaseV1UserChannelRelationGetPage[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    this.deleteUserOrgRelation = withRequest(
      this.deleteUserOrgRelation,
      "deleteUserOrgRelation"
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onSearch() {
    this.pagination.current = 1;
    this.getList();
  }

  onReset() {
    this.pagination.current = 1;
    this.getList();
  }

  async getList() {
    const values = this.rootStore.refs.searchForm.getFieldsValue();
    const [err, res] = await to(
      get_user_channel_relation_page({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        userId: values.userId,
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

  async deleteUserOrgRelation(id: string) {
    const [err, res] = await to(delete_user_channel_relation([id]));
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
  recordAction(record: IResBaseV1UserChannelRelationGetPage, action: TAction) {
    switch (action) {
      case "EDIT":
        this.rootStore.refs.editRef.current?.openModal({
          userId: record.userId,
        });
        break;
      case "DELETE":
        {
          let that = this;
          Modal.confirm({
            title: "确定删除该成交记录吗？",
            content: "删除后无法恢复",
            okText: "确定",
            cancelText: "取消",
            onOk() {
              runInAction(() => {
                that.deleteUserOrgRelation(record.userId);
              });
            },
          });
        }
        break;
    }
  }
}
