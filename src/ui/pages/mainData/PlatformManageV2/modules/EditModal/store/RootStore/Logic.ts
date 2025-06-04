import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { save_platform, update_platform } from "../../service/index";
import { showErrorInfo, to } from "@/utils/tools";
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
    if (initData) {
      this.rootStore.refs.editForm.setFieldsValue({ ...initData });
    }
  }

  closeModal() {
    this.open = false;
    this.initData = null;
    this.rootStore.refs.editForm.resetFields();
  }

  async onSubmit() {
    const values = await this.rootStore.refs.editForm.validateFields();
    const isEdit = Boolean(this.initData?.id);
    const request = isEdit
      ? update_platform({
          id: this.initData!.id,
          ...values,
        })
      : save_platform({
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
