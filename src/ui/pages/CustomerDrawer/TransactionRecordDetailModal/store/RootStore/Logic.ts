import { showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message, TabsProps } from "antd";
import { IInitData, ITransactionRecordDetail } from "../../interface";
import {
  cancel_deal_cancel,
  customer_deal_confirm,
  get_customer_deal,
} from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  detail: ITransactionRecordDetail | null = null;
  items: TabsProps["items"] = [
    {
      key: "COMFIRM",
      label: "确认成交",
    },
    {
      key: "CANCEL",
      label: "成交取消",
    },
  ];
  activeKey = "NONE";

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getDetail = withRequest(this.getDetail, "getDetail");
    this.customerDealConfirm = withRequest(
      this.customerDealConfirm,
      "customerDealConfirm"
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeActive(key: string) {
    this.activeKey = key;
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    this.getDetail();
    if (this.initData?.tabKey) {
      this.activeKey = this.initData.tabKey;
    }
  }

  closeModal() {
    const { propsStore, refs } = this.rootStore;
    this.open = false;
    this.initData = null;
    this.detail = null;
    if (this.activeKey) {
      this.activeKey = "NONE";
      refs.form.resetFields();
    }
  }

  async getDetail() {
    if (!this.initData?.id) {
      return;
    }
    const [err, res] = await to(
      get_customer_deal({
        id: this.initData.id,
      })
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

  async customerDealConfirm() {
    const { refs, propsStore } = this.rootStore;
    const values = await refs.form.validateFields();
    if (!values) {
      return;
    }
    if (typeof values.confirmAmount !== "number") {
      message.error("请填写确认金额");
      return;
    }
    const [err, res] = await to(
      customer_deal_confirm({
        id: this.detail?.id,
        operateMemo: values.operateMemo,
        confirmAmount: values.confirmAmount,
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
      this.closeModal();
      propsStore.props.afterClose?.();
      message.success("确认成功");
    });
  }

  async cancelDealCancel() {
    const { refs, propsStore } = this.rootStore;
    const values = await refs.form.validateFields();
    if (!values) {
      return;
    }
    if (!values.cancelMemo) {
      message.error("请输入作废原因");
      return;
    }
    const [err, res] = await to(
      cancel_deal_cancel({
        id: this.detail?.id,
        operateMemo: values.cancelMemo,
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
      this.closeModal();
      propsStore.props.afterClose?.();
      message.success("作废成功");
    });
  }

  onOK() {
    switch (this.activeKey) {
      case "COMFIRM":
        {
          this.customerDealConfirm();
        }
        break;
      case "CANCEL": {
        this.cancelDealCancel();
      }
    }
  }
}
