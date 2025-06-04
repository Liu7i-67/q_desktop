import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { showErrorInfo, to } from "@/utils/tools";
import { change_password } from "../../service";
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
  }

  closeModal() {
    const { refs } = this.rootStore;
    this.open = false;
    this.initData = null;
    refs.form.resetFields();
  }

  async onSubmit() {
    const { refs } = this.rootStore;

    const values = await refs.form.validateFields();
    if (!values) {
      return;
    }
    const [err, res] = await to(
      change_password({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
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
      this.closeModal();
      message.success("修改成功，2秒后将重新登录");
      // 清除缓存
      localStorage.clear();
      // 跳转登录
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    });
  }
}
