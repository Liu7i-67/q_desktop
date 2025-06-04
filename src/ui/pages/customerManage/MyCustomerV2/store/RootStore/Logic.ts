import {
  IReqBusinessV1CustomerGetPage,
  IResBusinessV1CustomerGetPage,
} from "@/service/business/v1/customer/get-page";
import { AddressHelper } from "@/utils/address-helper";
import { IPagination } from "@/utils/interface";
import { to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message, TreeDataNode } from "antd";
import { ITreeData } from "../../interface";
import { get_customer_page, get_project_type_tree } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IResBusinessV1CustomerGetPage[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  regionTree: TreeDataNode[] = [];
  firstConsultTree: ITreeData[] = [];
  transferVisible: boolean = false;
  selectedRowKeys: React.Key[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onSearch() {
    this.pagination.current = 1;
    this.pagination.total = 0;
    this.getList();
  }

  onReset() {
    this.rootStore.refs.searchForm.resetFields();
    this.pagination.current = 1;
    this.getList();
  }

  async getList() {
    const values = this.rootStore.refs.searchForm.getFieldsValue();
    // 处理客户所属人（去掉下划线及后缀）
    const ownerUserId = values?.ownerUserId?.replace(/_.*$/, "") || null;
    // 判断是否选择了“我的主单客户”
    const isSelect =
      values.onlyCollabType &&
      !["OFFICIAL", "COLLABORATION"].includes(values.onlyCollabType);

    const [createTimeStart, createTimeEndRaw] = values.createTime || [];
    const [dealDateStart, dealDateEndRaw] = values.dealDate || [];

    const searchValues = {
      ...values,
      createTimeStart: createTimeStart?.format?.("YYYY-MM-DD 00:00:00"),
      createTimeEnd: createTimeEndRaw?.format?.("YYYY-MM-DD 23:59:59"),
      dealDateStart: dealDateStart?.format?.("YYYY-MM-DD 00:00:00"),
      dealDateEnd: dealDateEndRaw?.format?.("YYYY-MM-DD 23:59:59"),
      // 优先客户所属人的值,如果没有选择客户所属人,再根据xx条件的值设置 ownerUserId
      ownerUserId:
        ownerUserId || (isSelect ? values.onlyCollabType : undefined),
      onlyCollabType: !isSelect ? values.onlyCollabType : undefined,
      ids: values.ids ? [values.ids] : [],
      labelRelationLabelValue: values.labelRelationLabelValue?.map(
        (item: { value: string }) => item.value
      ),
      // 固定传
      createdSource: "PERSONAL_CREATED",
    };
    delete searchValues.createTime;
    delete searchValues.dealDate;
    const [err, res] = await to(
      get_customer_page({
        data: searchValues as IReqBusinessV1CustomerGetPage,
        params: {
          page: this.pagination.current,
          size: this.pagination.pageSize,
        },
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.dataSource = res.data?.records || [];
      this.pagination.total = +(res.data?.total || 0);
    });
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
  }
  async getRepeatUser(key: "wechatNumber" | "phoneNumber") {
    const keyword = this.rootStore.refs.searchForm.getFieldValue(key);
    if (!keyword) {
      message.warning("请输入查重电话/微信");
      return;
    }
    // this.rootStore.refs.repeatRef.current?.openModal({ keyword });
    this.rootStore.refs.TXPeekModalRef.current?.openModal({ keyword });
  }
  async getRegionTree() {
    const res = await AddressHelper.getInstance().getTreeDataWithLevel(true, 2);
    runInAction(() => {
      this.regionTree = res as TreeDataNode[];
    });
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
  handleToggleTransferCustomer() {
    this.transferVisible = !this.transferVisible;
  }
  onSelectChange(selectedRowKeys: React.Key[]) {
    this.selectedRowKeys = selectedRowKeys;
  }

  afterCloseTransferModal() {
    this.transferVisible = false;
    this.selectedRowKeys = [];
    this.getList();
  }
}
