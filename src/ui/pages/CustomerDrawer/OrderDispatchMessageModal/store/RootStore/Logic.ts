import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData, IOrderDispatchMessage } from "../../interface";
import { IPagination } from "@/utils/interface";
import { to } from "@/utils/tools";
import { get_dispatch_messages, save_dispatch_message } from "../../service";
import UserHelper from "@/utils/user-helper";
import { message } from "antd";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  dataSource: IOrderDispatchMessage[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.submit = withRequest(this.submit, "submit");
    this.getDispatchMessages = withRequest(
      this.getDispatchMessages,
      "getDispatchMessages"
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    this.getDispatchMessages();
  }

  closeModal() {
    const { propsStore, refs } = this.rootStore;
    this.open = false;
    this.initData = null;
    this.dataSource = [];
    this.pagination.current = 1;
    refs.form.resetFields();
    propsStore.props.afterClose?.();
  }

  async getDispatchMessages() {
    if (!this.initData?.dispatchId) {
      return;
    }
    const [err, res] = await to(
      get_dispatch_messages({
        dispatchId: this.initData?.dispatchId,
        page: this.pagination.current,
        size: this.pagination.pageSize,
      })
    );
    if (err || !res?.data) {
      return;
    }

    runInAction(() => {
      this.pagination.total = +(res.data.total || 0);
      if (this.pagination.current === 1) {
        this.dataSource = res.data.records;
        return;
      }
      this.dataSource = [...this.dataSource, ...res.data.records];
    });
  }

  nextPage() {
    const { computed } = this.rootStore;
    if (this.pagination.total <= this.dataSource.length) {
      return;
    }
    if (computed.loading) {
      return;
    }
    this.pagination.current = this.pagination.current + 1;
    this.getDispatchMessages();
  }

  async submit() {
    const { refs } = this.rootStore;
    const values = await refs.form.validateFields();
    if (!values || !this.initData?.dispatchId) {
      return;
    }
    const [err, res] = await to(
      save_dispatch_message({
        dispatchId: this.initData?.dispatchId,
        message: values.message,
        messageFrom: UserHelper.getInstance().loginInfo.userType,
      })
    );
    if (err || res?.code !== 200) {
      return;
    }
    runInAction(() => {
      message.success("留言成功");
      this.closeModal();
    });
  }
}
