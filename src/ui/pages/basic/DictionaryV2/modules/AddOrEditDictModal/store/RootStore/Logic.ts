import { showErrorInfo, to } from "@/utils/tools";
import { makeAutoObservable, withRequest } from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import { save, update } from "../../service";
import { RootStore } from "./";
import { IinitData, ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IinitData | undefined = undefined;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.onUpdate = withRequest(this.onUpdate, "onUpdate");
    this.onSave = withRequest(this.onSave, "onSave");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async onUpdate() {
    const { refs } = this.rootStore;
    const values = await refs.form.validateFields();
    if (!values) return;
    const [err, res] = await to(
      update({
        ...values,
        id: (this.initData as IinitData).id,
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

  async onSave() {
    const { refs } = this.rootStore;
    const values = await refs.form.validateFields();
    if (!values) return;
    const [err, res] = await to(save(values));
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

  onOk() {
    if (this.initData) {
      this.onUpdate();
      return;
    }
    this.onSave();
  }

  openModal(initData?: IinitData) {
    this.open = true;
    this.initData = initData;
    this.rootStore.refs.form.setFieldValue("enableFlag", true);
    if (initData) {
      this.rootStore.refs.form.setFieldsValue(initData);
    }
  }

  closeModal() {
    this.open = false;
    this.initData = undefined;
    this.rootStore.refs.form.resetFields();
  }
}
