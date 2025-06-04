import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { showErrorInfo, to } from "@/utils/tools";
import { campaign_update } from "../../service";
import { message } from "antd";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.onSubmit = withRequest(this.onSubmit, "onSubmit");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IInitData) {
    const { refs } = this.rootStore;
    this.open = true;
    this.initData = initData || null;
    if (this.initData?.record) {
      refs.form.setFieldsValue(this.initData.record);
    }
  }

  closeModal() {
    const { refs } = this.rootStore;
    this.open = false;
    this.initData = null;
    refs.form.resetFields();
  }

  async onSubmit() {
    const { refs, propsStore } = this.rootStore;
    if (!this.initData?.record) {
      return;
    }
    const values = await refs.form.validateFields();
    if (!values) {
      return;
    }
    const [err, res] = await to(
      campaign_update({
        id: this.initData.record.id,
        channelId: this.initData.record.channelId,
        campaignName: this.initData.record.campaignName,
        userId: values.userId,
      })
    );

    if (err || !res) {
      showErrorInfo({
        err,
        res,
      });
      return;
    }

    runInAction(() => {
      message.success("操作成功");
      this.closeModal();
      propsStore.props.afterClose?.();
    });
  }
}
