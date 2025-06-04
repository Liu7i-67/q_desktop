import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IEditChannelGroupingModalInit } from "../..";
import { get_channel_page } from "@/pages/customerLead/service";
import { showErrorInfo, to } from "@/utils/tools";
import { debounce } from "lodash";
import { IOption } from "@/utils/interface";
import {
  add_channel_group,
  update_channel_group,
} from "@/pages/SchedulingManagement/service";
import { IReqAddChannelGroup } from "@/pages/SchedulingManagement/interface";
import { message } from "antd";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  iniData: IEditChannelGroupingModalInit | null = null;
  channelList: IOption[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getChannelList = withRequest(this.getChannelList, "getChannelList");
    this.updateGroup = withRequest(this.updateGroup, "updateGroup");
    this.submit = withRequest(this.submit, "submit");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getChannelData = debounce(this.getChannelList, 500);

  openModal(iniData?: IEditChannelGroupingModalInit) {
    this.open = true;
    this.iniData = iniData || null;
    this.getChannelList();

    if (this.iniData?.old) {
      this.rootStore.refs.form.setFieldsValue({
        groupName: this.iniData?.old?.groupName,
        channelIdList:
          this.iniData?.old?.channelDTOList?.map((i) => ({
            label: i.channelName,
            value: i.channelId,
          })) || [],
      });
    }
  }

  closeModal() {
    const { refs } = this.rootStore;
    this.open = false;
    this.iniData = null;
    refs.form.resetFields();
  }

  async getChannelList(text?: string) {
    const [err, res] = await to(
      get_channel_page({
        channelName: text || "",
        page: 1,
        size: 200,
        enableFlag: true,
      })
    );
    if (err || !res?.data) {
      return;
    }
    runInAction(() => {
      this.channelList = (res.data?.records || []).map(
        (i: { channelName: string; id: string }) => {
          return {
            label: i.channelName,
            value: i.id,
          };
        }
      );
    });
  }

  async updateGroup(req: IReqAddChannelGroup) {
    const { propsStore } = this.rootStore;
    if (!this.iniData?.old) {
      return;
    }
    const [err, res] = await to(
      update_channel_group({
        ...req,
        groupId: this.iniData?.old?.groupId,
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
      message.success("编辑成功");
      this.closeModal();
      propsStore?.props?.onSuccess?.();
    });
  }

  async submit() {
    const { refs, propsStore } = this.rootStore;
    const values = await refs.form.validateFields();
    const req: IReqAddChannelGroup = {
      channelIdList: values.channelIdList?.map((i) => i.value) || [],
      groupName: values.groupName,
      memo: "",
    };

    if (this.iniData?.old) {
      this.updateGroup(req);
      return;
    }

    const [err, res] = await to(add_channel_group(req));
    if (err || !res) {
      showErrorInfo({
        err,
        res,
      });
      return;
    }
    runInAction(() => {
      message.success("添加成功");
      this.closeModal();
      propsStore?.props?.onSuccess?.();
    });
  }
}
