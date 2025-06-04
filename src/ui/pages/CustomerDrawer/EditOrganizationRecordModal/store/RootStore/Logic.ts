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
import { get_org_tree } from "@/pages/CustomerDrawer/EditDealModal/service";
import { getOrgTree } from "@/pages/CustomerDrawer/EditDispatchRecordModal/store/tool";
import dayjs from "dayjs";
import {
  save_org_contact_record,
  update_org_contact_record,
} from "../../service";
import { IReqBusinessV1OrganizationcontactrecordSave } from "@/service/business/v1/organizationcontactrecord/save";
import { METHODS } from "http";
import { message } from "antd";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  orgTree: ITreeItem[] = [];
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getOrgTreeData = withRequest(this.getOrgTreeData, "getOrgTreeData");
    this.updateRecord = withRequest(this.updateRecord, "updateRecord");
    this.submit = withRequest(this.submit, "submit");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IInitData) {
    const { refs } = this.rootStore;
    this.open = true;
    this.initData = initData || null;
    this.getOrgTreeData();
    if (this.initData?.oldData) {
      refs.form.setFieldsValue({
        contactTime: dayjs(this.initData.oldData.contactTime),
        organizationId: {
          label: this.initData.oldData.organizationName,
          value: this.initData.oldData.organizationId,
        },
      });
    }
  }

  closeModal() {
    const { refs } = this.rootStore;
    this.open = false;
    this.initData = null;
    this.orgTree = [];
    refs.form.resetFields();
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

    const req: IReqBusinessV1OrganizationcontactrecordSave = {
      customerId: this.initData?.customerId,
      contactTime: values.contactTime?.format("YYYY-MM-DD HH:mm:ss"),
      organizationId: values.organizationId?.value,
    };

    if (this.initData?.oldData) {
      this.updateRecord(req);
      return;
    }
    const [err, res] = await to(save_org_contact_record(req));
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
      propsStore?.props?.onSuccess?.();
    });
  }

  async updateRecord(req: IReqBusinessV1OrganizationcontactrecordSave) {
    const { propsStore } = this.rootStore;
    if (!this.initData?.oldData?.id) {
      return;
    }
    const [err, res] = await to(
      update_org_contact_record({
        ...req,
        id: this.initData?.oldData?.id,
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
      message.success("修改成功");
      this.closeModal();
      propsStore?.props?.onSuccess?.();
    });
  }
}
