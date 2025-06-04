import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import {
  get_user_org_relation_detail,
  update_user_org_relation,
  save_user_org_relation,
} from "../../service/index";
import { message } from "antd";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.submitForm = withRequest(this.submitForm, "submitForm");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    this.getUserOrgDetail();
  }

  closeModal() {
    this.open = false;
    this.initData = null;
    this.rootStore.refs.editForm.resetFields();
  }

  async getUserOrgDetail() {
    const id = this.initData?.userId;
    if (!id) {
      return;
    }
    const [err, res] = await to(get_user_org_relation_detail(id));
    if (err || !res) {
      return;
    }
    runInAction(() => {
      const orgList = (res.data ?? []).map((item) => ({
        value: item?.orgId,
        label: item?.orgName,
      }));

      this.rootStore.refs.editForm.setFieldsValue({
        orgId: orgList,
        userId: id,
      });
    });
  }

  async submitForm() {
    const values = await this.rootStore.refs.editForm.validateFields();
    const isEdit = Boolean(this.initData?.userId);
    const orgId = values.orgId.map((item) => item.value);
    const request = isEdit
      ? update_user_org_relation({
          userId: this.initData!.userId,
          orgId,
        })
      : save_user_org_relation({
          userId: values.userId,
          orgId,
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
