import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { message } from "antd";
import { to } from "@/utils/tools";
import { transfer_customer } from "../../service";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.handleConfirmTransferCustomer = withRequest(
      this.handleConfirmTransferCustomer,
      "handleConfirmTransferCustomer"
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData: IInitData) {
    this.open = true;
    this.initData = initData || null;
  }

  closeModal() {
    this.open = false;
    this.initData = null;
    this.rootStore.refs.transferForm.resetFields();
  }
  async handleConfirmTransferCustomer() {
    const values = await this.rootStore.refs.transferForm.validateFields();
    const [err, res] = await to(
      transfer_customer({
        transferUserId: values.transferUserId,
        targetCustomerIds: this.initData?.targetCustomerIds || [],
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.closeModal();
      this.rootStore.propsStore.props.afterClose?.();
      message.success("转移成功");
    });
  }
}
