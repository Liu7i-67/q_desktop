import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { IResBusinessV1CustomerGetPage } from "@/service/business/v1/customer/get-page";
import { get_customer_page, merge_customer } from "../../service";
import { to } from "@/utils/tools";
import { message } from "antd";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  mergeCustomerTableData: IResBusinessV1CustomerGetPage[] = [];
  mergeCustomerSelectedRowKeys: string[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.onMergeCustomerSearch = withRequest(
      this.onMergeCustomerSearch,
      "onMergeCustomerSearch"
    );
    this.handleConfirmMergeCustomer = withRequest(
      this.handleConfirmMergeCustomer,
      "handleConfirmMergeCustomer"
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
  }

  closeModal() {
    const { propsStore } = this.rootStore;
    this.open = false;
    this.initData = null;
    this.rootStore.refs.mergeSearchForm.resetFields();
    this.onMergeCustomerReset();
    propsStore.props.afterClose?.();
  }

  async onMergeCustomerSearch() {
    const values = this.rootStore.refs.mergeSearchForm.getFieldsValue();
    const [err, res] = await to(
      get_customer_page({
        data: values,
        params: {
          page: 1,
          size: 20,
        },
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.mergeCustomerTableData = res.data?.records || [];
    });
  }

  onMergeCustomerReset() {
    this.mergeCustomerTableData = [];
    this.mergeCustomerSelectedRowKeys = [];
  }

  handleMergeCustomerSelectChange(selectedRowKeys: string[]) {
    this.mergeCustomerSelectedRowKeys = selectedRowKeys;
  }

  async handleConfirmMergeCustomer() {
    const [err, res] = await to(
      merge_customer({
        mergedCustomerId: this.mergeCustomerSelectedRowKeys[0] as string,
        retainCustomerId: this.initData?.id || "",
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.closeModal();
      message.success("合并成功");
    });
  }
}
