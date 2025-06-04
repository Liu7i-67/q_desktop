import { IReqBusinessV1CustomerUpdateFiled } from "@/service/business/v1/customer/update-field";
import { showErrorInfo, to } from "@/utils/tools";
import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import { IInitData } from "../../interface";
import { update_customer_filed } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData = {};
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async onOk() {
    const { refs, propsStore } = this.rootStore;
    if (!refs.editForm.getFieldValue("leadsType")) {
      this.closeModal();
      return;
    }
    const values = await refs.editForm.validateFields();
    if (!values) return;
    let request: IReqBusinessV1CustomerUpdateFiled = {
      leadsType: values.leadsType === "ECOMMERCE" ? 1 : 0,
      channelId: values.channelId?.value,
      liveStreamerId: values.liveStreamerId?.value,
      platformId: values.platformId?.value,
      id: this.initData?.id,
    };
    const [err, res] = await to(update_customer_filed(request));
    if (err || !res || res.code !== 200) {
      showErrorInfo({
        err,
        res,
        msg: "编辑失败",
      });
      return;
    }
    message.success("编辑成功");
    this.closeModal();
    propsStore.props.afterClose?.();
  }

  openModal(initData: IInitData) {
    this.open = true;
    this.initData = initData;
    this.rootStore.refs.editForm.setFieldsValue({
      channelId: {
        label: initData.channelName,
        value: initData.channelId,
      },
      liveStreamerId: {
        label: initData.liveStreamerName,
        value: initData.liveStreamerId,
      },
      platformId: {
        label: initData.platformName,
        value: initData.platformId,
      },
      leadsType: initData.leadsType,
    });
  }

  closeModal() {
    this.open = false;
    this.initData = {};
    this.rootStore.refs.editForm.resetFields();
  }
}
