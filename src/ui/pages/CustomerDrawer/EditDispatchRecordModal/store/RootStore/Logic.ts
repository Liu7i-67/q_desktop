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
  get_available_org,
  get_project_tree,
  save_dispatch,
} from "../../service";
import { ITreeItem } from "@/utils/interface";
import { getOrgTree, getProjectTree } from "../tool";
import { IReqBusinessV1CustomerDispatchSaveItemPostDTO } from "@/service/business/v1/customer-dispatch/save";
import { message } from "antd";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  orgTree: ITreeItem[] = [];
  pojectTree: ITreeItem[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getAvailableOrg = withRequest(this.getAvailableOrg, "getAvailableOrg");
    this.getProjectTree = withRequest(this.getProjectTree, "getProjectTree");
    this.submit = withRequest(this.submit, "submit");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    this.getProjectTree();
    this.getAvailableOrg();
  }

  closeModal() {
    const { propsStore } = this.rootStore;
    this.open = false;
    this.initData = null;
    propsStore.props.onSuccess?.();
  }

  async getAvailableOrg() {
    const { refs } = this.rootStore;
    const phoneNumber = refs.form.getFieldValue("phoneNumber");
    if (!this.initData?.customerId || !phoneNumber) {
      return;
    }
    const [err, res] = await to(
      get_available_org({
        customerId: this.initData?.customerId,
        phoneNumber,
      })
    );
    if (err || !res?.data) {
      return;
    }
    runInAction(() => {
      this.orgTree = getOrgTree(res.data || []);
    });
  }

  async getProjectTree() {
    const [err, res] = await to(get_project_tree());
    if (err || !res?.data) {
      return;
    }
    runInAction(() => {
      this.pojectTree = getProjectTree(res.data || []);
    });
  }

  async submit() {
    const { refs, propsStore } = this.rootStore;
    const values = await refs.form.validateFields();
    if (!values || !this.initData?.customerId) {
      return;
    }

    const itemPostDTOList: IReqBusinessV1CustomerDispatchSaveItemPostDTO[] =
      values.itemPostDTOList.map((i) => {
        return {
          dataId: i,
          dataType: "PROJECT",
        };
      });

    const [err, res] = await to(
      save_dispatch({
        ...values,
        itemPostDTOList,
        customerId: this.initData?.customerId,
      })
    );
    if (err || res?.code !== 200) {
      showErrorInfo({
        err,
        res,
      });
      return;
    }
    runInAction(() => {
      message.success("派单成功");
      this.closeModal();
      propsStore.props.onSuccess?.();
    });
  }
}
