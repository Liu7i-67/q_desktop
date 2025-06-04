import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import {
  get_anchor_detail,
  save_anchor,
  update_anchor,
} from "../../service/index";
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
    this.open = true;
    this.initData = initData || null;
    this.getDetail();
  }

  closeModal() {
    this.open = false;
    this.initData = null;
    this.rootStore.refs.editForm.resetFields();
  }

  async getDetail() {
    const id = this.initData?.id;
    if (!id) {
      return;
    }
    const [err, res] = await to(get_anchor_detail(id));
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.rootStore.refs.editForm.setFieldsValue({ ...res.data });
    });
  }

  async onSubmit() {
    const values = await this.rootStore.refs.editForm.validateFields();
    const isEdit = Boolean(this.initData?.id);
    const request = isEdit
      ? update_anchor({
          id: this.initData!.id,
          ...values,
        })
      : save_anchor({
          ...values,
        });

    const [err, res] = await to(request);

    if (err || !res || res.code !== 200) {
      return;
    }

    runInAction(() => {
      this.closeModal();
      this.rootStore.propsStore.props.afterClose?.();
      message.success(isEdit ? "修改成功" : "新增成功");
    });
  }
}
