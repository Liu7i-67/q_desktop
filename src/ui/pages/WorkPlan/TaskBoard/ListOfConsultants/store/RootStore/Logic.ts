import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, ISearchInfo, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { getRate100, showErrorInfo, to } from "@/utils/tools";
import { delete_channel_group } from "@/pages/SchedulingManagement/service";
import { IListOfConsultants } from "../../interface";
import { IPagination, ISegmentedOption, TAction } from "@/utils/interface";
import { message } from "antd";
import dayjs from "dayjs";
import {
  customer_follow_board_stat,
  customer_follow_board_stat_list,
} from "../../../service";
import { IReqBusinessV1CustomerFollowFollowBoardStatList } from "@/service/business/v1/customer-follow/follow-board-stat-list";
import { IReqBusinessV1CustomerFollowFollowBoardStat } from "@/service/business/v1/customer-follow/follow-board-stat";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IListOfConsultants[] = [];
  dataSourceByDate: IListOfConsultants[] = [];
  options: ISegmentedOption[] = [
    {
      label: "按咨询师查看",
      value: "type1",
    },
    {
      label: "按日期查看",
      value: "type2",
    },
  ];
  active = "type1";
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  paginationByDate: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  formInfo: ISearchInfo = {};

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    this.getListByData = withRequest(this.getListByData, "getListByData");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeActive(key: string) {
    this.active = key;
    if (this.active === "type2") {
      this.getListByData();
      return;
    }
    this.getList();
  }

  onSearch(info: ISearchInfo) {
    this.formInfo = info;
    this.pagination.current = 1;
    this.pagination.total = 0;
    this.dataSource = [];
    if (this.active === "type2") {
      this.getListByData();
      return;
    }
    this.getList();
  }

  async init() {
    this.pagination.current = 1;
    this.pagination.total = 0;
    this.dataSource = [];

    this.paginationByDate.current = 1;
    this.paginationByDate.total = 0;
    this.dataSourceByDate = [];

    if (this.active === "type2") {
      this.getListByData();
      return;
    }
    this.getList();
  }

  async getList() {
    const today = dayjs().format("YYYY-MM-DD");
    const { propsStore } = this.rootStore;
    const req: IReqBusinessV1CustomerFollowFollowBoardStatList = {
      page: this.pagination.current,
      size: this.pagination.pageSize,
      groupByUserFlag: true,
      searchTotalFlag: true,
      endDateStart: today,
      endDateEnd: today,
    };

    if (this.formInfo.userIdList?.length) {
      req.userIdList = this.formInfo.userIdList;
    }
    if (propsStore.props.taskId) {
      req.taskStrategyIdList = [propsStore.props.taskId];
    }

    const [err, res] = await to(customer_follow_board_stat_list(req));
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.dataSource = (res.data?.records || []).map((r) => {
        return {
          ...r,
          taskCompletionRate: getRate100(r.taskCompletionRate),
          deadlineTaskCompletionRate: getRate100(r.deadlineTaskCompletionRate),
        };
      });
      this.pagination.total = +(res.data?.total || 0);
    });
  }

  async getListByData() {
    const { propsStore } = this.rootStore;
    const today = dayjs().format("YYYY-MM-DD");
    const req: IReqBusinessV1CustomerFollowFollowBoardStat = {
      endDateStart: today,
      endDateEnd: today,
      searchTotalFlag: true,
      groupByUserFlag: true,
    };

    if (this.formInfo.userIdList?.length) {
      req.userIdList = this.formInfo.userIdList;
    }

    if (propsStore.props.taskId) {
      req.taskStrategyIdList = [propsStore.props.taskId];
    }

    const [err, res] = await to(customer_follow_board_stat(req));
    if (err || !res?.data) {
      showErrorInfo({
        err,
        res,
      });
      return;
    }

    runInAction(() => {
      this.dataSourceByDate = [
        {
          ...res.data,
          taskCompletionRate: getRate100(res.data?.taskCompletionRate),
          deadlineTaskCompletionRate: getRate100(
            res.data?.deadlineTaskCompletionRate
          ),
          endDate: today,
        },
      ];
    });
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
  }

  onPageChangeByDate(pagination: IPagination) {
    this.paginationByDate.pageSize =
      pagination.pageSize || this.paginationByDate.pageSize;
    this.paginationByDate.current = pagination.current || 1;
  }

  onAction(action: TAction, record: IListOfConsultants) {
    const { propsStore } = this.rootStore;
    switch (action) {
      case "DETAIL":
        {
          const today = dayjs().format("YYYY-MM-DD");
          window.open(
            `/#/workplan/taskOverview?comDate=${today}&&type=taskList&&taskOrg=${record?.createBy || ""}&&taskId=${propsStore.props.taskId || ""}`
          );
        }
        break;
    }
  }

  refresh() {
    if (this.active === "type2") {
      this.getListByData();
      return;
    }
    this.getList();
  }
}
