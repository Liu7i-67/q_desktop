import { TNode } from "@/components/TXTreeSidebar/store/RootStore/interface";
import { showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import { IInitData } from "../../interface";
import { save_project_type, update_project_type } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.onSave = withRequest(this.onSave, "onSave");
    this.onEdit = withRequest(this.onEdit, "onEdit");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async onOk() {
    if (this.initData?.isCreate) {
      this.onSave();
      return;
    }
    this.onEdit();
  }

  async onSave() {
    const { propsStore, refs } = this.rootStore;
    const values = refs.form.getFieldsValue();
    const [err, res] = await to(save_project_type(values));
    runInAction(() => {
      if (!(err || !res)) {
        message.success("新增成功");
        this.closeModal();
        propsStore.props.afterClose?.();
        return;
      }
      showErrorInfo({
        err,
        res,
        msg: "新增失败",
      });
    });
  }

  async onEdit() {
    const { propsStore, refs } = this.rootStore;
    const values = refs.form.getFieldsValue();
    const [err, res] = await to(
      update_project_type({
        ...values,
        parentId: values.parentId ?? undefined,
        id: (this.initData?.node as TNode).key as string,
      })
    );
    runInAction(() => {
      if (!(err || !res)) {
        message.success("修改成功");
        this.closeModal();
        propsStore.props.afterClose?.();
        return;
      }
      showErrorInfo({
        err,
        res,
        msg: "修改失败",
      });
    });
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    if (initData?.isCreate) {
      this.initFormByCreate();
      return;
    }
    this.initFormByEdit();
  }

  initFormByCreate() {
    const { refs } = this.rootStore;
    if (this.initData?.node) {
      refs.form.setFieldsValue({
        parentId: this.initData.node.key as string,
      });
    }
  }

  initFormByEdit() {
    const { refs } = this.rootStore;
    if (this.initData?.node) {
      refs.form.setFieldsValue({
        typeName: this.initData.node.title as string,
        parentId: this.initData.node.data.parentId,
        memo: this.initData.node.data.memo,
      });
    }
  }

  closeModal() {
    this.open = false;
    this.rootStore.refs.form.resetFields();
  }
}
