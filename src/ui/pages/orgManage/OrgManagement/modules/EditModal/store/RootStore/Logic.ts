import { IResBaseV1OrganizationGetPage } from "@/service/base/v1/organization/get-page";
import { showErrorInfo, to } from "@/utils/tools";
import { toUpload } from "@/utils/upload";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message } from "antd";
import dayjs from "dayjs";
import { IInitData } from "../../interface";
import { get_org_detail, save_org, update_org } from "../../service";
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
      cityTree: [],
      orgType: "",
    };
    this.uploadImageLoading = false;
    this.onCreateOrg = withRequest(this.onCreateOrg, "onCreateOrg");
    this.onEditOrg = withRequest(this.onEditOrg, "onEditOrg");
    this.getOrgDetail = withRequest(this.getOrgDetail, "getOrgDetail");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onOk() {
    if (this.initData?.record) {
      this.onEditOrg();
      return;
    }
    this.onCreateOrg();
  }

  async onCreateOrg() {
    const formValues = await this.getFormData();
    if (!formValues) return;
    const [err, res] = await to(save_org(formValues));
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

  async onEditOrg() {
    const formValues = await this.getFormData();
    if (!formValues) return;
    const [err, res] = await to(
      update_org({
        ...formValues,
        id: this.initData.record?.id,
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

  async getOrgDetail() {
    const { refs } = this.rootStore;
    const [err, res] = await to(
      get_org_detail({
        id: (this.initData.record as IResBaseV1OrganizationGetPage).id,
      })
    );
    runInAction(() => {
      if (!(err || !res)) {
        const { data } = res;
        const formValues = {
          ...data,
          establishYear: data.establishYear,
          operatingDate: [
            data.operatingDateStart
              ? dayjs(data.operatingDateStart)
              : undefined,
            data.operatingDateEnd ? dayjs(data.operatingDateEnd) : undefined,
          ],
          operatingTime: [
            data.operatingTimeEnd
              ? dayjs(data.operatingTimeStart, "HH:mm:ss")
              : undefined,
            data.operatingTimeEnd
              ? dayjs(data.operatingTimeEnd, "HH:mm:ss")
              : undefined,
          ],
        };
        refs.editForm.setFieldsValue(formValues);
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
    const res = await refs.editForm.validateFields();
    if (!res) return;
    runInAction(() => {
      this.uploadImageLoading = true;
    });
    const logoImg = await toUpload(res.logoImg);

    if (!logoImg) {
      runInAction(() => {
        this.uploadImageLoading = false;
      });
      return;
    }
    const businessLicenseImg = await toUpload(res.businessLicenseImg);
    if (!businessLicenseImg) {
      runInAction(() => {
        this.uploadImageLoading = false;
      });
      return;
    }
    const authCertificateImg = await toUpload(res.authCertificateImg);
    if (!authCertificateImg) {
      runInAction(() => {
        this.uploadImageLoading = false;
      });
      return;
    }
    const honorCertificateImg = await toUpload(res.honorCertificateImg);
    if (!honorCertificateImg) {
      runInAction(() => {
        this.uploadImageLoading = false;
      });
      return;
    }
    const medicalLicenseImg = await toUpload(res.medicalLicenseImg);
    if (!medicalLicenseImg) {
      runInAction(() => {
        this.uploadImageLoading = false;
      });
      return;
    }
    const environmentImg = await toUpload(res.environmentImg);
    if (!environmentImg) {
      runInAction(() => {
        this.uploadImageLoading = false;
      });
      return;
    }

    const request = {
      ...res,
      establishYear: dayjs(res.establishYear).format("YYYY"),
      operatingDateStart: res.operatingDate?.[0]
        ? dayjs(res.operatingDate[0]).format("YYYY-MM-DD")
        : undefined,
      operatingDateEnd: res.operatingDate?.[1]
        ? dayjs(res.operatingDate[1]).format("YYYY-MM-DD")
        : undefined,
      operatingTimeStart: res.operatingTime?.[0]
        ? dayjs(res.operatingTime[0]).format("HH:mm:ss")
        : undefined,
      operatingTimeEnd: res.operatingTime?.[1]
        ? dayjs(res.operatingTime[1]).format("HH:mm:ss")
        : undefined,
      logoImg,
      businessLicenseImg,
      authCertificateImg,
      honorCertificateImg,
      medicalLicenseImg,
      environmentImg,
    };
    delete request["operatingDate"];
    delete request["operatingTime"];
    return request;
  }

  openModal(initData: IInitData) {
    this.open = true;
    this.initData = initData || null;
    this.rootStore.refs.editForm.setFieldValue("enableFlag", true);
    if (initData.record) {
      this.getOrgDetail();
      return;
    }
    this.initCreateModalForm();
  }

  initCreateModalForm() {
    const { refs } = this.rootStore;
    if (this.initData.orgType) {
      refs.editForm.setFieldValue("orgType", this.initData.orgType);
    }
  }

  closeModal() {
    this.open = false;
    this.initData = {
      cityTree: [],
      orgType: "",
    };
    this.rootStore.refs.editForm.resetFields();
  }
}
