import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { ITreeItem } from "@/utils/interface";
import { showErrorInfo, to } from "@/utils/tools";
import {
  getOrgTree,
  getProjectTree,
} from "@/pages/CustomerDrawer/EditDispatchRecordModal/store/tool";
import { get_org_tree } from "@/pages/CustomerDrawer/EditDealModal/service";
import { get_project_tree } from "@/pages/CustomerDrawer/EditDispatchRecordModal/service";
import { save_arrival } from "../../service";
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
    this.getProjectTreeData = withRequest(
      this.getProjectTreeData,
      "getProjectTreeData"
    );
    this.getOrgTreeData = withRequest(this.getOrgTreeData, "getOrgTreeData");
    this.submit = withRequest(this.submit, "submit");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    this.getProjectTreeData();
    this.getOrgTreeData();
  }

  closeModal() {
    const { refs } = this.rootStore;
    this.open = false;
    this.initData = null;
    this.pojectTree = [];
    this.orgTree = [];
    refs.form.resetFields();
  }

  async getProjectTreeData() {
    const [err, res] = await to(get_project_tree());
    if (err || !res?.data) {
      return;
    }
    runInAction(() => {
      this.pojectTree = getProjectTree(res.data || []);
    });
  }

  async getOrgTreeData() {
    const [err, res] = await to(
      get_org_tree({
        maxLevel: 2,
        enableFlag: true,
      })
    );
    if (err || !res?.data) {
      return;
    }
    runInAction(() => {
      this.orgTree = getOrgTree(res.data || [], { disabled: true });
    });
  }

  async submit() {
    const { refs, propsStore } = this.rootStore;
    if (!this.initData?.customerId) {
      return;
    }
    const values = await refs.form.validateFields();
    if (!values) {
      return;
    }
    const [err, res] = await to(
      save_arrival({
        customerId: this.initData?.customerId,
        orgId: values.orgId,
        arrivalTime: values.arrivalTime?.format("YYYY-MM-DD HH:mm:ss"),
        itemDTOList: values.itemDTOList.map((item) => {
          return {
            dataId: item,
            dataType: "PROJECT",
          };
        }),
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
      message.success("新增成功");
      this.closeModal();
      propsStore.props.onSuccess?.();
    });
  }
}
