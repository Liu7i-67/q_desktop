import { showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import { IInitData } from "../../interface";
import {
  get_project_detail,
  save_project,
  update_project,
} from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open: boolean;
  initData: IInitData;
  uploadImageLoading: boolean;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.open = false;
    this.initData = {
      tree: [],
    };
    this.uploadImageLoading = false;
    this.onCreateProject = withRequest(this.onCreateProject, "onCreateProject");
    this.onEditProject = withRequest(this.onEditProject, "onEditProject");
    this.getProjectDetail = withRequest(
      this.getProjectDetail,
      "getProjectDetail"
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onOk() {
    if (this.initData.recordId) {
      this.onEditProject();
      return;
    }
    this.onCreateProject();
  }

  async onCreateProject() {
    const formValues = await this.getFormData();
    const [err, res] = await to(save_project(formValues));
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

  async onEditProject() {
    const formValues = await this.getFormData();
    const [err, res] = await to(
      update_project({
        ...formValues,
        id: this.initData.recordId as string,
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

  async getProjectDetail() {
    const { refs } = this.rootStore;
    const [err, res] = await to(
      get_project_detail({
        id: this.initData.recordId as string,
      })
    );
    runInAction(() => {
      if (!(err || !res)) {
        refs.editForm.setFieldsValue(res.data ?? {});
        return;
      }
      showErrorInfo({
        err,
        res,
      });
    });
  }

  async getFormData() {
    const { refs } = this.rootStore;
    const values = await refs.editForm.validateFields();
    return values;
  }

  openModal(initData: IInitData) {
    this.open = true;
    this.initData = initData;
    if (initData.recordId) {
      this.getProjectDetail();
      return;
    }
    this.initCreateModalForm();
  }

  initCreateModalForm() {
    const { refs } = this.rootStore;
    refs.editForm.setFieldValue("enableFlag", true);
    if (this.initData.typeId) {
      refs.editForm.setFieldValue("typeId", this.initData.typeId);
    }
  }

  closeModal() {
    this.open = false;
    this.initData = {
      tree: [],
    };
    this.rootStore.refs.editForm.resetFields();
  }
}
