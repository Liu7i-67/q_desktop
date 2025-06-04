import { IRepeatItem } from "@/pages/customerManage/MyCustomerV2/modules/EditModal/store/RootStore/interface";
import { IRepeatCustomerListDTO } from "@/service/business/v1/customer/peek";
import { AddressHelper } from "@/utils/address-helper";
import { TRecord } from "@/utils/interface";
import { showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message, TreeDataNode } from "antd";
import { IInitData } from "../../interface";
import { save_customer } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  regionTree: TreeDataNode[] = [];
  repeatList: IRepeatItem[] = [];
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.onAddCustomer = withRequest(this.onAddCustomer, "onAddCustomer");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
  }

  closeModal() {
    this.rootStore.refs.addCustomerForm.resetFields();
    this.open = false;
    this.initData = null;
    this.repeatList = [];
  }

  async onOk() {
    const { refs } = this.rootStore;
    const values = await refs.addCustomerForm.validateFields();
    if (!values) return;

    const request = {
      ...values,
      wechatQrCode: values.wechatQrCode?.[0],
      channelId: values.channelName?.value,
      liveStreamerId: values.liveStreamerName?.value,
      wechatNumber: values.wechatNumber
        ? values.wechatNumber.toLowerCase()
        : values.wechatNumber,
    };
    this.onAddCustomer(request);
  }

  async onAddCustomer(request: TRecord) {
    const [err, res] = await to(
      save_customer({
        ...request,
        // 固定传这个值
        createdSource: "CUSTOMER_ASSIGNED",
      })
    );
    runInAction(() => {
      if (err || !res) {
        showErrorInfo({
          err,
          res,
          msg: "新增失败",
        });
        return;
      }
      if (!this.handleValidateDuplicateCheck(res.data.repeatCustomerList))
        return;
      message.success("新增成功");
      this.rootStore.refs.addCustomerForm.resetFields();
      this.closeModal();
      this.rootStore.propsStore.props.afterClose?.();
    });
  }

  async getRegionTree() {
    const res = await AddressHelper.getInstance().getTreeDataWithLevel(true, 2);
    runInAction(() => {
      this.regionTree = res as TreeDataNode[];
    });
  }

  handleValidateDuplicateCheck(repeatCustomerList: IRepeatCustomerListDTO[]) {
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
