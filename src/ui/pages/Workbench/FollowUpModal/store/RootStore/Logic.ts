import { showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import { IFollowUpModalInit } from "../..";
import { save_customer_follow } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";
import { IReqBusinessV1CustomerFollowSave } from "@/service/business/v1/customer-follow/save";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open: boolean;
  iniData: IFollowUpModalInit | null = null;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.open = false;
    this.onSaveCustomerFollow = withRequest(
      this.onSaveCustomerFollow,
      "onSaveCustomerFollow"
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(iniData?: IFollowUpModalInit) {
    this.open = true;
    this.iniData = iniData || null;
  }

  closeModal() {
    this.open = false;
    this.iniData = null;
    this.rootStore.refs.followUpForm.resetFields();
  }

  async onOk() {
    const { refs } = this.rootStore;
    if (!this.iniData?.customerId) {
      return;
    }
    const values = await refs.followUpForm.validateFields();
    if (!values) return;

    runInAction(() => {
      const request = {
        ...values,
        nextDate: values.nextDate.format("YYYY-MM-DD"),
        customerId: this.iniData!.customerId,
        lastFollowId: this.iniData?.id,
      };
      this.onSaveCustomerFollow(request);
    });
  }

  async onSaveCustomerFollow(request: IReqBusinessV1CustomerFollowSave) {
    const [err, res] = await to(save_customer_follow(request));
    runInAction(() => {
      if (err || res?.code !== 200 || res.data !== true) {
        showErrorInfo({
          err,
          res,
          msg: "新增失败",
        });
        return;
      }
      message.success("新增成功");
      this.closeModal();
      this.rootStore.propsStore.props.onSuccess?.();
    });
  }
}
