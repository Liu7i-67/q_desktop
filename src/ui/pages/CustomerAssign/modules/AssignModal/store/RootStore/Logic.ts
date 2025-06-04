import { IReqBusinessV1CustomerAssign } from "@/service/business/v1/customer/assign";
import { IResBusinessV1CustomerGetPage } from "@/service/business/v1/customer/get-page";
import { showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import { assign } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IResBusinessV1CustomerGetPage | null = null;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.onAssign = withRequest(this.onAssign, "onAssign");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IResBusinessV1CustomerGetPage) {
    this.open = true;
    this.initData = initData || null;
  }

  closeModal() {
    this.rootStore.refs.assiginModalForm.resetFields();
    this.open = false;
    this.initData = null;
  }

  async onOk() {
    const { refs } = this.rootStore;
    const values = await refs.assiginModalForm.validateFields();
    if (!values) return;

    runInAction(() => {
      const request = {
        ...values,
        customerId: this.initData?.id,
      };
      this.onAssign(request);
    });
  }

  async onAssign(request: IReqBusinessV1CustomerAssign) {
    const [err, res] = await to(assign(request));
    runInAction(() => {
      if (res?.code === 200) {
        message.success("分配成功");
        this.rootStore.refs.assiginModalForm.resetFields();
        this.closeModal();
        this.rootStore.propsStore.props.afterClose?.();
        return;
      }
      showErrorInfo({
        err,
        res,
        msg: "分配失败",
      });
    });
  }
}
