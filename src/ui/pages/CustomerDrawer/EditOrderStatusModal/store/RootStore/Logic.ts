import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IShowData } from "../../interface";
import { to, showErrorInfo } from "@/utils/tools";
import { update_dispatch_status } from "../../service";
import { message } from "antd";
import { ImageFile, toUpload } from "@/utils/upload";
import { IReqBusinessV1CustomerDispatchHandle } from "@/service/business/v1/customer-dispatch/handle";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  visible: boolean = false;
  defaultData: IShowData = { id: "" };
  initType: string = "";
  showUpload?: string;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.editOrderStatus = withRequest(this.editOrderStatus, "editOrderStatus");
    this.onOk = withRequest(this.onOk, "onOk");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  open(initData: IShowData) {
    this.initType = initData.dispatchStatus || "";
    this.defaultData = initData;
    this.visible = true;
  }

  onCancel() {
    this.rootStore.refs.form.resetFields();
    this.initType = "";
    this.showUpload = "";
    this.visible = false;
  }

  async onOk() {
    const values = await this.rootStore.refs.form.validateFields();
    const imgs = await toUpload(values.operateImg);
    if (!imgs) {
      return;
    }
    this.editOrderStatus({
      dispatchId: this.defaultData.id,
      dispatchStatus: values.dispatchStatus,
      operateImg: imgs,
      memo: values.memo,
      forceHandleFlag: this.defaultData.forceHandleFlag, //默认传true
    });
  }

  async editOrderStatus(data: IReqBusinessV1CustomerDispatchHandle) {
    const [err, res] = await to(update_dispatch_status(data));
    runInAction(() => {
      if (err || res?.code !== 200) {
        showErrorInfo({
          err,
          res,
          msg: "修改失败",
        });
        return;
      }

      this.onCancel();
      this.rootStore.propsStore.props.onRefresh?.();
      message.success("修改成功");
    });
  }
  selectChange(value: string) {
    this.showUpload = value;
  }
}
