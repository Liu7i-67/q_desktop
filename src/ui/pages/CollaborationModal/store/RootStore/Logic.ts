import {
  makeAutoObservable,
  runInAction,
  toJS,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { showErrorInfo, to } from "@/utils/tools";
import { getCustomerCollabDetail, update_collab } from "../../service";
import {
  IResBusinessV1CustomerCollabDetail,
  TCollabType,
} from "@/service/business/v1/customer-collab/detail";
import { IOption } from "@/utils/interface";
import { message } from "antd";
import { IReqCollabPostDTO } from "@/service/business/v1/customer-collab/update";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  collabs: IResBusinessV1CustomerCollabDetail[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getDetail = withRequest(this.getDetail, "getDetail");
    this.submit = withRequest(this.submit, "submit");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    this.getDetail();
  }

  closeModal() {
    const { propsStore } = this.rootStore;
    this.open = false;
    this.initData = null;
    this.collabs = [];
  }

  async getDetail() {
    if (!this.initData?.existCustomerId) {
      return;
    }
    const [err, res] = await to(
      getCustomerCollabDetail({
        customerId: this.initData?.existCustomerId,
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
      this.collabs = res.data || [];
    });
  }

  handleAdd() {
    this.collabs = this.collabs.concat([
      {
        id: `web_test_${Date.now()}`,
        collabType: undefined,
        ratio: 100,
        leaderFlag: false,
      },
    ]);
  }

  handleDelete(record: IResBusinessV1CustomerCollabDetail) {
    this.collabs = this.collabs.filter((item) => item.id !== record.id);
  }

  changeRecordCollabType(
    record: IResBusinessV1CustomerCollabDetail,
    value: TCollabType
  ) {
    this.collabs = this.collabs.map((item) => {
      if (item.id === record.id) {
        return {
          ...item,
          collabType: value,
        };
      }
      return item;
    });
  }

  changeRecordRatio(record: IResBusinessV1CustomerCollabDetail, value: number) {
    if (value === 0) {
      message.warning("合作比率不能为0");
      return;
    }
    this.collabs = this.collabs.map((item) => {
      if (item.id === record.id) {
        return {
          ...item,
          ratio: value,
        };
      }
      return item;
    });
  }

  changeRecordUser(record: IResBusinessV1CustomerCollabDetail, value: IOption) {
    if (this.collabs.find((item) => item.userId === value.value)) {
      message.warning("请勿添加重复的协作者");
      return;
    }

    this.collabs = this.collabs.map((item) => {
      if (item.id === record.id) {
        return {
          ...item,
          userId: value.value,
          userName: value.label,
        };
      }
      return item;
    });
  }

  async submit() {
    const { propsStore } = this.rootStore;
    if (!this.initData?.existCustomerId) {
      return;
    }

    const total = {
      OFFICIAL: 0,
      COLLABORATION: 0,
    };
    const collabPostDTOList: IReqCollabPostDTO[] = [];

    for (let record of this.collabs) {
      if (!record.collabType) {
        message.error("存在合作类型未选择");
        return;
      }
      if (!record.userId) {
        message.error("存在合作用户未选择");
        return;
      }
      if (!record.ratio) {
        message.error("合作比率不能为0");
        return;
      }

      collabPostDTOList.push({
        userId: record.userId,
        ratio: Number(record.ratio),
        collabType: record.collabType,
        leaderFlag: record.leaderFlag,
        id: record.id.startsWith("web_test") ? undefined : record.id,
      });

      total[record.collabType] =
        (total[record.collabType] || 0) + (record.ratio || 0);
    }

    if (total.OFFICIAL && total.OFFICIAL !== 100) {
      message.error("官方合作比例相加必须为100%");
      return;
    }
    if (total.COLLABORATION !== 100) {
      message.error("协作合作比例相加必须为100%");
      return;
    }

    const [err, res] = await to(
      update_collab({
        customerId: this.initData.existCustomerId,
        dataId: "",
        dataType: "CUSTOMER",
        collabPostDTOList,
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
      message.success("操作成功");
      propsStore.props.onSuccess?.();
    });
  }
}
