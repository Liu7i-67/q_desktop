import { showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import { IInitData } from "../../interface";
import { save_department_type, update_department_type } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.initData = {
      tree: [],
      isCreate: false,
    };
    this.onSave = withRequest(this.onSave, "onSave");
    this.onEdit = withRequest(this.onEdit, "onEdit");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async onOk() {
    if (this.initData.isCreate) {
      this.onSave();
      return;
    }
    this.onEdit();
  }

  async onSave() {
    const { propsStore, refs } = this.rootStore;
    const values = refs.form.getFieldsValue();
    const [err, res] = await to(save_department_type(values));
    runInAction(() => {
      if (err || !res) {
        showErrorInfo({
          err,
          res,
          msg: "新增失败",
        });
        return;
      }
      message.success("新增成功");
      this.closeModal();
      propsStore.props.afterClose?.();
    });
  }

  async onEdit() {
    const { propsStore, refs } = this.rootStore;
    const values = refs.form.getFieldsValue();
    const [err, res] = await to(
      update_department_type({
        ...values,
        parentId: values.parentId ?? null,
        id: this.initData.node?.key as string,
      })
    );
    runInAction(() => {
      if (err || !res) {
        showErrorInfo({
          err,
          res,
          msg: "修改失败",
        });
        return;
      }
      message.success("修改成功");
      this.closeModal();
      propsStore.props.afterClose?.();
    });
  }

  openModal(initData: IInitData) {
    this.open = true;
    this.initData = initData;
    if (initData.isCreate) {
      this.initFormByCreate();
      return;
    }
    this.initFormByEdit();
  }

  closeModal() {
    this.open = false;
    this.rootStore.refs.form.resetFields();
  }

  initFormByCreate() {
    const { refs } = this.rootStore;
    if (this.initData.node) {
      refs.form.setFieldsValue({
        parentId: this.initData.node.key as string,
      });
    }
  }

  initFormByEdit() {
    const { refs } = this.rootStore;
    if (this.initData.node) {
      refs.form.setFieldsValue({
        parentId: this.initData.node.data.parentId,
        deptName: this.initData.node.title as string,
      });
    }
  }
}
