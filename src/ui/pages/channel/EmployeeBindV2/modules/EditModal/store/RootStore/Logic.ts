import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { showErrorInfo, to } from "@/utils/tools";
import {
  get_user_channel_relation_detail,
  save_user_channel_relation,
  update_user_channel_relation,
} from "../../service";
import { message } from "antd";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.handleSubmit = withRequest(this.handleSubmit, "handleSubmit");
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
    const id = this.initData?.userId;
    if (!id) {
      return;
    }
    const [err, res] = await to(get_user_channel_relation_detail(id));
    if (err || !res) {
      return;
    }
    runInAction(() => {
      const relationList =
        res.data?.map((item: any) => ({
          channelId: item.channelId,
          weight: item.weight,
        })) || [];
      this.rootStore.refs.editForm.setFieldsValue({
        userId: id,
        relationList,
      });
    });
  }

  async handleSubmit() {
    const values = await this.rootStore.refs.editForm.validateFields();
    const isEdit = Boolean(this.initData?.userId);

    const request = isEdit
      ? update_user_channel_relation({
          ...values,
          userId: this.initData!.userId,
        })
      : save_user_channel_relation({
          ...values,
        });
    const [err, res] = await to(request);
    if (err || !res || res.code !== 200) {
      showErrorInfo({
        err,
        res,
        msg: res?.msg || (isEdit ? "修改失败" : "新增失败"),
      });
      return;
    }

    runInAction(() => {
      this.closeModal();
      this.rootStore.propsStore.props.afterClose?.();
      message.success(isEdit ? "修改成功" : "新增成功");
    });
  }
}
