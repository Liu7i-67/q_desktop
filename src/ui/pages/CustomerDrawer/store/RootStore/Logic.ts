import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData, TCustomerTab } from "../../interface";
import { TabsProps } from "antd";
import { showErrorInfo, to } from "@/utils/tools";
import { get_customer_detail } from "../../service";
import { IResBusinessV1Customer } from "@/service/business/v1/customer";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  tabs: TabsProps["items"] = [];
  activeKey: TCustomerTab = "EMPTY";
  renderSet: Set<TCustomerTab> = new Set();
  detail: IResBusinessV1Customer | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getCustomerDetail = withRequest(
      this.getCustomerDetail,
      "getCustomerDetail"
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeActiveKey(key: TCustomerTab): void {
    this.activeKey = key;
    this.renderSet.add(key);
    if (this.activeKey === "BASE_INFO") {
      this.getCustomerDetail();
    }
  }

  openDrawer(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;

    const tabs: TabsProps["items"] = [
      {
        key: "BASE_INFO",
        label: "基础信息",
      },
      {
        key: "DISPATCH_RECORD",
        label: "派单记录",
      },
      {
        key: "TRANSACTION_RECORD",
        label: "成交记录",
      },
      {
        key: "FOLLOW_UP_RECORD",
        label: "跟进记录",
      },
      {
        key: "CUSTOMER_RECORD",
        label: "客户记录",
      },
      {
        key: "VISIT_RECORD",
        label: "到院记录",
      },
      {
        key: "ORGANIZATION_RECORD",
        label: "机构联系记录",
      },
    ];
    this.tabs = tabs;
    const defaultKey = (initData?.defaultTab || tabs[0].key) as TCustomerTab;
    this.activeKey = defaultKey;
    this.renderSet.add(defaultKey);
    this.getCustomerDetail();
  }

  closeDrawer() {
    const { propsStore } = this.rootStore;
    this.open = false;
    this.initData = null;
    this.detail = null;
    this.renderSet.clear();
    this.activeKey = "EMPTY";
    propsStore.props.afterClose?.();
  }

  async getCustomerDetail() {
    const [err, res] = await to(
      get_customer_detail({ id: this.initData?.customerId || "" })
    );
    if (err || !res?.data) {
      showErrorInfo({
        err,
        res,
      });
      return;
    }
    runInAction(() => {
      this.detail = res.data || null;
    });
  }
}
