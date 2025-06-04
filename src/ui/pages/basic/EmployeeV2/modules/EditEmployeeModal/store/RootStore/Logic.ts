import { showErrorInfo, to } from "@/utils/tools";
import { EUserType } from "@/utils/user-helper/interface";
import { makeAutoObservable, withRequest } from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import { get_user_detail, save_employee, update_employee } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  recordId: string = "";
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getRoleDetail = withRequest(this.getRoleDetail, "getRoleDetail");
    this.addEmployee = withRequest(this.addEmployee, "addEmployee");
    this.editEmployee = withRequest(this.editEmployee, "editEmployee");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getRoleDetail() {
    const [err, res] = await to(
      get_user_detail({
        id: this.recordId,
      })
    );
    if (err || !res) {
      showErrorInfo({
        err,
        res,
      });
      return;
    }
    // 处理表单数据
    const formValues = {
      ...res?.data,
      ...(res?.data.userType === EUserType.ORG
        ? {
            orgName: {
              label: res?.data.orgName,
              value: res?.data.orgId,
            },
          }
        : {}),
      roleList: res?.data?.roleRelationDTOList?.map((item) => item.roleId),
      deptList: res?.data?.deptRelationDTOList?.map((item) => ({
        deptId: item.deptId,
        directorFlag: item.directorFlag,
      })),
      orgName: {
        label: res?.data?.orgName,
        value: res?.data?.orgId,
      },
    };
    this.rootStore.refs.addForm.setFieldsValue(formValues);
  }

  async addEmployee() {
    const values = await this.generateFormValues();
    if (!values) return;
    const [err, res] = await to(save_employee(values));
    if (err || !res || res.code !== 200) {
      showErrorInfo({
        err,
        res,
        msg: "新增失败",
      });
      return;
    }
    message.success("新增成功");
    this.closeModal();
    this.rootStore.propsStore.props.afterClose?.();
  }

  async editEmployee() {
    const values = await this.generateFormValues();
    if (!values) return;
    const [err, res] = await to(update_employee(values));
    if (err || !res || res.code !== 200) {
      showErrorInfo({
        err,
        res,
        msg: "修改失败",
      });
      return;
    }
    message.success("修改成功");
    this.closeModal();
    this.rootStore.propsStore.props.afterClose?.();
  }

  async generateFormValues() {
    const values = await this.rootStore.refs.addForm.validateFields();
    if (!values) return;
    const request = {
      ...values,
      ...(values.userType === EUserType.ORG
        ? {
            orgId: values.orgName?.value,
          }
        : {}),
      id: this.recordId,
      ignorePermission: true,
    };
    delete request["orgName"];
    return request;
  }

  onOk() {
    if (this.recordId) {
      this.editEmployee();
      return;
    }
    this.addEmployee();
  }

  openModal(recordId?: string) {
    this.open = true;
    this.recordId = recordId ?? "";
    this.rootStore.refs.addForm.setFieldValue("enableFlag", true);
    if (this.recordId) {
      this.getRoleDetail();
    }
  }

  closeModal() {
    this.open = false;
    this.recordId = "";
    this.rootStore.refs.addForm.resetFields();
  }
}
