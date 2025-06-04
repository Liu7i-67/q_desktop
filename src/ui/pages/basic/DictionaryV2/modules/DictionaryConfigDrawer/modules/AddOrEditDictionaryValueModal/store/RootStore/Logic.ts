import { showErrorInfo, to } from "@/utils/tools";
import { makeAutoObservable, withRequest } from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import { IInitData } from "../../interface";
import { save_dict_value, update_dict_value } from "../../service";
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
    this.onSave = withRequest(this.onSave, "onSave");
    this.onUpdate = withRequest(this.onUpdate, "onUpdate");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async onSave() {
    const { refs } = this.rootStore;
    const values = await refs.form.validateFields();
    if (!values) return;
    const [err, res] = await to(
      save_dict_value({
        ...values,
      })
    );
    if (err || !res || res.code !== 200) {
      showErrorInfo({
        err,
        res,
        msg: "新增失败",
      });
      return;
    }
    message.success("新增成功");
    this.closeModal();
    this.rootStore.propsStore.props.afterClose?.();
  }

  async onUpdate() {
    const { refs } = this.rootStore;
    const values = await refs.form.validateFields();
    if (!values) return;
    const [err, res] = await to(
      update_dict_value({
        ...values,
        id: this.initData.id as string,
      })
    );
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
    this.rootStore.propsStore.props.afterClose?.();
  }

  onOk() {
    if (this.initData?.id) {
      this.onUpdate();
      return;
    }
    this.onSave();
  }

  openModal(initData: IInitData) {
    this.open = true;
    this.initData = initData || undefined;
    this.rootStore.refs.form.setFieldValue("enableFlag", true);
    this.rootStore.refs.form.setFieldsValue(initData);
  }

  closeModal() {
    this.open = false;
    this.initData = {};
    this.rootStore.refs.form.resetFields();
  }
}
