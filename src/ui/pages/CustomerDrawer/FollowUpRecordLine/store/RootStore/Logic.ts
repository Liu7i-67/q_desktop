import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { showErrorInfo, to } from "@/utils/tools";
import { save_customer_follow } from "@/pages/Workbench/FollowUpModal/service";
import { message } from "antd";
import { IFollowUpRecord, ITaskSuggest } from "../../interface";
import {
  get_customer_follow_content_page,
  task_strategy_suggestion_list,
} from "@/pages/CustomerDrawer/service";
import { IPagination } from "@/utils/interface";
import { IReqBusinessV1CustomerFollowSave } from "@/service/business/v1/customer-follow/save";
import { Dayjs } from "dayjs";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IFollowUpRecord[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  suggests: ITaskSuggest[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.onSubmit = withRequest(this.onSubmit, "onSubmit");
    this.getList = withRequest(this.getList, "getList");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getSuggest() {
    const [err, res] = await to(
      task_strategy_suggestion_list({
        customerId: this.rootStore.propsStore.props.detail?.id,
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.suggests = (res.data || []).filter((r) => !!r.taskDesc);
    });
  }

  async onSubmit(noCheck?: boolean, cancelIds?: string[], noNextDay?: boolean) {
    const { refs, propsStore } = this.rootStore;
    const customerId = propsStore.props.detail?.id || "";
    if (!customerId) {
      return;
    }

    let canGoOn = true;

    let currentDate = undefined;
    const nextDate: Dayjs = refs.followUpForm.getFieldValue("nextDate");
    if (nextDate) {
      currentDate = nextDate.format("YYYY-MM-DD");
    }

    if (!noCheck) {
      canGoOn =
        (await refs.checkRef.current?.checkPlan(customerId, currentDate)) ||
        false;
    }

    if (!canGoOn) {
      return;
    }

    const values = await refs.followUpForm.validateFields();
    if (!values) return;

    const request: IReqBusinessV1CustomerFollowSave = {
      ...values,
      nextDate: values.nextDate
        ? values.nextDate.format("YYYY-MM-DD")
        : undefined,
      customerId,
    };

    if (cancelIds?.length) {
      request.cancelFollowIds = cancelIds;
    }
    if (noNextDay) {
      request.nextDate = undefined;
    }

    const [err, res] = await to(save_customer_follow(request));
    runInAction(() => {
      if (err || res?.code !== 200 || res.data !== true) {
        showErrorInfo({
          err,
          res,
          msg: "跟进失败",
        });
        return;
      }
      message.success("跟进成功");
      refs.followUpForm.resetFields();
      this.getList();
    });
  }

  afterClose(cancelIds?: string[], noNextDay?: boolean) {
    this.onSubmit(true, cancelIds, noNextDay);
  }

  async getList() {
    const { propsStore } = this.rootStore;
    if (!propsStore.props.detail?.id) {
      return;
    }
    const [err, res] = await to(
      get_customer_follow_content_page({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        customerId: propsStore.props.detail?.id,
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      if (this.pagination.current === 1) {
        this.dataSource = res.data?.records || [];
      } else {
        this.dataSource = [...this.dataSource, ...(res.data?.records || [])];
      }
      this.pagination.total = +(res.data?.total || 0);
    });
  }

  nextPage() {
    const { computed } = this.rootStore;
    if (this.pagination.total <= this.dataSource.length) {
      return;
    }
    if (computed.loading) {
      return;
    }
    this.pagination.current = this.pagination.current + 1;
    this.getList();
  }
}
