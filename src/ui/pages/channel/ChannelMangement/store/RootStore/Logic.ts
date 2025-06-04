import { IPagination } from "@/utils/interface";
import { to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { IChannelMangement } from "../../interface";
import { get_channel_page } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";
import { IReqBaseV1ChannelGetPage } from "@/service/base/v1/channel/get-page";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IChannelMangement[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  channelType: string;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.channelType = "";
    this.getList = withRequest(this.getList, "getList");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getList() {
    const values = this.rootStore.refs.form.getFieldsValue();
    const req: IReqBaseV1ChannelGetPage = {
      page: this.pagination.current,
      size: this.pagination.pageSize,
      channelName: values.channelName,
      enableFlag: values.enableFlag,
    };

    if (this.channelType) {
      req.channelTypeId = this.channelType;
    }
    if (values.managerUserIdList) {
      req.managerUserIdList = values.managerUserIdList.join(",");
    }
    const [err, res] = await to(get_channel_page(req));
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.dataSource = (res.data?.records || []).map((r) => {
        return {
          ...r,
          mangementUsers: r.managerDTOList?.map((r) => r.userName),
        };
      });
      this.pagination.total = +(res.data?.total || 0);
    });
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
  }

  onSelectTreeNode(selectedKeys: string[]) {
    this.channelType = selectedKeys.length ? selectedKeys[0] : "";
    this.getList();
  }

  onReset() {
    this.pagination.current = 1;
    this.getList();
  }

  onSearch() {
    this.pagination.current = 1;
    this.getList();
  }
}
