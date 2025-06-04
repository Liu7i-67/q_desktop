import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { showErrorInfo, to } from "@/utils/tools";
import { update_specific_field } from "../../service";
import { message } from "antd";
import UserHelper from "@/utils/user-helper";

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
    if (UserHelper.getInstance().loginInfo.nickname) {
      refs.form.setFieldsValue({
        nickname: UserHelper.getInstance().loginInfo.nickname,
      });
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
    if (!UserHelper.getInstance().getUserId) {
      return;
    }
    const values = await refs.form.validateFields();
    if (!values) {
      return;
    }
    const [err, res] = await to(
      update_specific_field({
        id: UserHelper.getInstance().getUserId,
        nickname: values.nickname || "",
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
      message.success("修改成功");
      localStorage.setItem("nickName", values.nickname || "");
      // 刷新登录信息
      UserHelper.getInstance().initLoginInfo();
      this.closeModal();
      propsStore.props.afterClose?.();
    });
  }
}
