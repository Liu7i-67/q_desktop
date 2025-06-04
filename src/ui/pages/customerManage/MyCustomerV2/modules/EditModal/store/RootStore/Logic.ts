import { IRepeatCustomerListDTO } from "@/service/business/v1/customer/peek";
import { IReqBusinessV1CustomerUpdate } from "@/service/business/v1/customer/update";
import { AddressHelper } from "@/utils/address-helper";
import { IOption } from "@/utils/interface";
import { showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message, TreeDataNode } from "antd";
import dayjs from "dayjs";
import { RootStore } from ".";
import { IInitData, ITreeData } from "../../interface";
import {
  get_customer_detail,
  get_project_type_tree,
  save,
  update,
} from "../../service";
import { IFormInfo, ILogic, IRepeatItem, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  firstConsultTree: ITreeData[] = [];
  regionTree: TreeDataNode[] = [];
  repeatList: IRepeatItem[] = [];
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.addCustomer = withRequest(this.addCustomer, "addCustomer");
    this.updateCustomer = withRequest(this.updateCustomer, "updateCustomer");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    this.getCustomerDetail();
    this.getRegionTree();
    this.getFirstConsultTree();
  }

  closeModal() {
    this.open = false;
    this.initData = null;
    this.rootStore.refs.editForm.resetFields();
    this.repeatList = [];
  }

  async getFirstConsultTree() {
    const [err, res] = await to(get_project_type_tree());
    if (err || !res) {
      return;
    }
    runInAction(() => {
      const newData = res.data?.reduce((prev: ITreeData[], item) => {
        const firstLevelNode: ITreeData = {
          value: item.id,
          label:
            item.typeName === "其他"
              ? "其他（看脸、避雷、查医院等）"
              : item.typeName,
        };
        firstLevelNode["value"] = item.id;
        if (item.typeName === "其他") {
          firstLevelNode["label"] = "其他（看脸、避雷、查医院等）";
        } else {
          firstLevelNode["label"] = item.typeName;
        }
        return item.typeName !== "皮肤"
          ? item.typeName === "轻医美"
            ? [firstLevelNode, ...prev]
            : [...prev, firstLevelNode]
          : prev;
      }, []);
      this.firstConsultTree = newData;
    });
  }

  async getRegionTree() {
    const res = await AddressHelper.getInstance().getTreeDataWithLevel(true, 2);
    runInAction(() => {
      this.regionTree = res as TreeDataNode[];
    });
  }

  async getCustomerDetail() {
    const id = this.initData?.id;
    if (!id) {
      return;
    }
    const [err, res] = await to(get_customer_detail({ id }));
    if (err || !res) {
      return;
    }
    runInAction(() => {
      const newData = {
        ...res.data,
        wechatPassTime: res.data.wechatPassTime
          ? dayjs(res.data.wechatPassTime)
          : undefined,
        labelValueList: res.data.labelRelationDTOList?.reduce(
          (
            prev: { label: string; value: string }[],
            item: {
              labelName: string;
              labelValue: string;
            }
          ) => {
            return [
              ...prev,
              {
                value: item.labelValue,
                label: item.labelName,
              },
            ];
          },
          []
        ),
        intentionalProjectPostDTOList:
          res.data.intentionalProjectDTOList?.reduce<string[]>((prev, item) => {
            return [...prev, item.dataId];
          }, []),
      };
      this.rootStore.refs.editForm.setFieldsValue(newData as IFormInfo);
    });
  }

  async submitForm() {
    const values = await this.rootStore.refs.editForm.validateFields();
    //清理数组，去除空格、空字符串
    const cleanArray = (arr?: string[]) =>
      Array.isArray(arr) ? arr.map((s) => s.trim()).filter(Boolean) : [];
    //判断数组是否有效（至少有一个元素）
    const isValid = (arr: string[]) => arr.length > 0;
    //检查数组是否有重复（可以选择忽略大小写）
    const hasDuplicate = (arr: string[], ignoreCase = false) => {
      const normalized = ignoreCase ? arr.map((s) => s.toLowerCase()) : arr;
      return new Set(normalized).size !== normalized.length;
    };

    const phoneNumbers = cleanArray(values.phoneNumber);
    const wechatNumbers = cleanArray(values.wechatNumber);

    // 校验微信号和电话至少填写一个
    if (!isValid(phoneNumbers) && !isValid(wechatNumbers)) {
      message.error("请填写微信号或者客户电话");
      return;
    }
    // 校验微信号不能重复（忽略大小写）
    if (hasDuplicate(wechatNumbers, true)) {
      message.error("微信号重复（不区分大小写），请重新填写");
      return;
    }
    // 校验电话号码不能重复
    if (hasDuplicate(phoneNumbers)) {
      message.error("电话号码重复，请重新填写");
      return;
    }
    const leadsType = values.leadsType
      ? values.leadsType === "PLACE"
        ? 0
        : 1
      : undefined;
    const params: IReqBusinessV1CustomerUpdate = {
      ...values,
      phoneNumber: phoneNumbers,
      wechatNumber: wechatNumbers,
      labelValueList: values?.labelValueList?.map((o: IOption) => o.value),
      intentionalProjectPostDTOList: values?.intentionalProjectPostDTOList?.map(
        (id: string) => ({
          dataId: id,
          dataType: "PROJECT_TYPE",
        })
      ),
      //固定传
      createdSource: "PERSONAL_CREATED",
      leadsType,
    };

    if (this.initData) {
      this.updateCustomer({ ...params, id: this.initData.id });
    } else {
      this.addCustomer(params);
    }
  }

  async addCustomer(params: IReqBusinessV1CustomerUpdate) {
    const [err, res] = await to(save(params));
    if (err || !res) {
      showErrorInfo({
        err,
        res,
        msg: "新增失败",
      });
      return;
    }
    if (!this.handleValidateDuplicateCheck(res.data.repeatCustomerList)) return;
    runInAction(() => {
      this.closeModal();
      this.rootStore.propsStore.props.afterClose?.();
      message.success("新增成功");
    });
  }

  async updateCustomer(params: IReqBusinessV1CustomerUpdate) {
    const [err, res] = await to(update(params));
    if (err || !res) {
      showErrorInfo({
        err,
        res,
        msg: "编辑失败",
      });
      return;
    }
    if (!this.handleValidateDuplicateCheck(res.data.repeatCustomerList)) return;
    runInAction(() => {
      this.closeModal();
      this.rootStore.propsStore.props.afterClose?.();
      message.success("编辑成功");
    });
  }

  handleValidateDuplicateCheck(repeatCustomerList: IRepeatCustomerListDTO[]) {
    /**存在 repeatCustomerList 且 length > 0 就视为操作失败，同时提示是哪些联系方式重了 */
    if (repeatCustomerList && repeatCustomerList.length) {
      let repeatList: IRepeatItem[] = [];

      repeatCustomerList.map((item) => {
        repeatList = [
          ...repeatList,
          {
            id: item.id,
            value: [...item.phoneNumber, ...item.wechatNumber],
            ownerName: item.ownerName,
          },
        ];
      });

      this.repeatList = repeatList;
      return false;
    }
    return true;
  }
}
