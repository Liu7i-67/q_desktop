import { showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import { IInitData } from "../../interface";
import {
  get_channel_detail,
  save_channel,
  update_channel,
} from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open: boolean;
  initData: IInitData;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.open = false;
    this.initData = {
      tree: [],
    };
    this.getChannelDetail = withRequest(
      this.getChannelDetail,
      "getChannelDetail"
    );
    this.onCreateChannel = withRequest(this.onCreateChannel, "onCreateChannel");
    this.onEditChannel = withRequest(this.onEditChannel, "onEditChannel");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getChannelDetail() {
    const [err, res] = await to(
      get_channel_detail({
        id: this.initData.recordId as string,
      })
    );
    runInAction(() => {
      if (!(err || !res)) {
        let managerUserIdList: string[] = [];
        if (res.data.managerDTOList) {
          managerUserIdList = res.data.managerDTOList.map((r) => r.userId);
        }

        this.rootStore.refs.editForm.setFieldsValue({
          ...(res.data ?? {}),
          managerUserIdList,
        });
        return;
      }
      showErrorInfo({
        err,
        res,
      });
    });
  }

  async onCreateChannel() {
    const values = await this.getFormData();
    const [err, res] = await to(save_channel(values));
    runInAction(() => {
      if (res?.code === 200 && res?.data === true) {
        message.success("新增成功");
        this.closeModal();
        this.rootStore.propsStore.props.afterClose?.();
        return;
      }
      showErrorInfo({
        err,
        res,
        msg: "新增失败",
      });
    });
  }

  async onEditChannel() {
    const values = await this.getFormData();
    const [err, res] = await to(
      update_channel({
        ...values,
        id: this.initData.recordId,
      })
    );
    runInAction(() => {
      if (res?.code === 200 && res?.data === true) {
        message.success("修改成功");
        this.closeModal();
        this.rootStore.propsStore.props.afterClose?.();
        return;
      }
      showErrorInfo({
        err,
        res,
        msg: "修改失败",
      });
    });
  }

  async getFormData() {
    const { refs } = this.rootStore;
    const res = await refs.editForm.validateFields();
    return res;
  }

  onOk() {
    if (this.initData.recordId) {
      this.onEditChannel();
      return;
    }
    this.onCreateChannel();
  }

  openModal(initData: IInitData) {
    this.open = true;
    this.initData = initData;
    this.rootStore.refs.editForm.setFieldValue("enableFlag", true);
    if (initData.recordId) {
      this.getChannelDetail();
      return;
    }
    this.initCreateModalForm();
  }

  closeModal() {
    this.open = false;
    this.rootStore.refs.editForm.resetFields();
  }

  initCreateModalForm() {
    const { refs } = this.rootStore;
    if (this.initData.channelTypeId) {
      refs.editForm.setFieldValue("channelTypeId", this.initData.channelTypeId);
    }
  }
}
