import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import {
  getOrgTree,
  getProjectTree,
} from "@/pages/CustomerDrawer/EditDispatchRecordModal/store/tool";
import { showErrorInfo, to } from "@/utils/tools";
import { get_project_tree } from "@/pages/CustomerDrawer/EditDispatchRecordModal/service";
import { ITreeItem } from "@/utils/interface";
import { get_org_tree, save_customer_deal } from "../../service";
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
    this.submit = withRequest(this.submit, "submit");
    this.getOrgTreeData = withRequest(this.getOrgTreeData, "getOrgTreeData");
    this.getProjectTreeData = withRequest(
      this.getProjectTreeData,
      "getProjectTree"
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IInitData) {
    const { refs } = this.rootStore;
    this.open = true;
    this.initData = initData || null;
    this.getProjectTreeData();
    this.getOrgTreeData();
    refs.form.setFieldsValue({
      itemPostDTOList: [
        {
          dataId: undefined,
          amount: undefined,
        },
      ],
      orgId: this.initData?.orgId,
    });
  }

  closeModal() {
    const { refs } = this.rootStore;
    this.open = false;
    this.initData = null;
    this.pojectTree = [];
    refs.form.resetFields();
  }

  async submit() {
    const { refs, propsStore } = this.rootStore;
    const values = await refs.form.validateFields();

    if (!values.itemPostDTOList?.length) {
      message.warning("请配置成交项目信息");
      return;
    }

    if (!values || !this.initData?.customerId) {
      return;
    }
    const [err, res] = await to(
      save_customer_deal({
        dispatchId: this.initData?.dispatchId,
        dealDate: values.dealDate.format("YYYY-MM-DD"),
        customerId: this.initData?.customerId,
        itemPostDTOList: values.itemPostDTOList?.map((item) => ({
          dataId: item.dataId,
          amount: item.amount,
          dataType: "PROJECT",
        })),
        amount: values.amount || 0,
        createTime: values.historyFlag
          ? values.createTime?.format("YYYY-MM-DD HH:mm:ss")
          : undefined,
        orgId: values.orgId,
        memo: values.memo,
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
      message.success("提交成功");
      this.closeModal();
      propsStore.props.onSuccess?.();
    });
  }

  async getProjectTreeData() {
    const [err, res] = await to(get_project_tree());
    if (err || !res?.data) {
      return;
    }
    runInAction(() => {
      this.pojectTree = getProjectTree(res.data || [], { disabled: true });
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
}
