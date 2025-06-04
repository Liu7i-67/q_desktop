import { IResBusinessV1CustomerGetPage } from "@/service/business/v1/customer/get-page";
import { AddressHelper } from "@/utils/address-helper";
import { IPagination } from "@/utils/interface";
import { to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message, TreeDataNode } from "antd";
import { get_page_data } from "../../service";
import { RootStore } from "./";
import { ILogic, TFieldKey, TLoadingStore } from "./interface";
import { findArea } from "../../tool";
import { customerTypeOptions } from "@/utils/enum/modules/customerType";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IResBusinessV1CustomerGetPage[];
  reginTree: TreeDataNode[];
  pagination: IPagination;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.dataSource = [];
    this.reginTree = [];
    this.pagination = {
      pageSize: 20,
      current: 1,
      total: 0,
    };
    this.getPageData = withRequest(this.getPageData, "getPageData");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getPageData() {
    const values = this.generateSearchFormValues();
    const [err, res] = await to(
      get_page_data(
        {
          ...values,
          // 固定传这个值
          createdSource: "CUSTOMER_ASSIGNED",
        },
        {
          page: this.pagination.current,
          size: this.pagination.pageSize,
        }
      )
    );
    runInAction(() => {
      if (!err || !res?.data) {
        const records = res?.data?.records ?? [];
        //处理展示数据
        this.dataSource = records.map((item) => {
          const { leadsType, channelName, platformName, liveStreamerName } =
            item;
          //渠道展示字段
          const channelStr =
            leadsType === "PLACE"
              ? `[投放]${channelName}`
              : `[电商]${platformName}/${liveStreamerName}`;
          //城市展示字段
          const cityStr = findArea(this.reginTree, item);
          //客户类型展示字段
          const customerTypeStr = customerTypeOptions.find(
            (r) => r.value === item?.customerType
          )?.label;
          return {
            ...item,
            channelStr,
            cityStr,
            customerTypeStr,
          };
        });

        this.pagination.total = Number(res?.data?.total) || 0;
      }
    });
  }

  async getCityTree() {
    const res = await AddressHelper.getInstance().getTreeDataWithLevel(true, 2);
    runInAction(() => {
      this.reginTree = res as TreeDataNode[];
    });
  }

  async checkCustomerPeek(fieldKey: TFieldKey) {
    const { refs } = this.rootStore;
    const keyword = refs.form.getFieldValue(fieldKey);
    if (!keyword) {
      message.warning("请输入查重电话/微信");
      return;
    }
    this.rootStore.refs.TXPeekModal.current?.openModal({ keyword });
    // const [err, res] = await to(
    //   get_repeat_user({
    //     keyword: value,
    //   })
    // );
    // runInAction(() => {
    //   if (!err || !res?.data) {
    //     refs.custPeekModalRef.current?.openModal(res?.data);
    //   }
    // });
  }

  generateSearchFormValues() {
    const values = this.rootStore.refs.form.getFieldsValue();
    return {
      phoneNumber: values.phoneNumber,
      wechatNumber: values.wechatNumber,
      customerName: values.customerName,
      areaCode: values.areaCode,
      channelIdList: values.channelIdList,
      platformIdList: values.platformIdList,
      liveStreamerIdList: values.liveStreamerIdList,
      assignedFlag: values.assignedFlag,
      createTimeStart: values.createTime?.[0]?.format("YYYY-MM-DD 00:00:00"),
      createTimeEnd: values.createTime?.[1]?.format("YYYY-MM-DD 23:59:59"),
      assignTimeStart: values.assignTime?.[0]?.format("YYYY-MM-DD 00:00:00"),
      assignTimeEnd: values.assignTime?.[1]?.format("YYYY-MM-DD 23:59:59"),
    };
  }

  reset() {
    this.rootStore.refs.form.resetFields();
    this.pagination.current = 1;
    this.pagination.pageSize = 20;
    this.getPageData();
  }

  onSearch() {
    this.pagination.current = 1;
    this.getPageData();
  }

  onChangePageSize(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getPageData();
  }
}
