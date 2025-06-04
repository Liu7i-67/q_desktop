import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, ISearchInfo, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { getRate100, to } from "@/utils/tools";
import { IPastListOfDpts } from "../../interface";
import { IPagination, ISegmentedOption, TAction } from "@/utils/interface";
import { customer_follow_board_stat_list } from "../../../service";
import { IReqBusinessV1CustomerFollowFollowBoardStatList } from "@/service/business/v1/customer-follow/follow-board-stat-list";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IPastListOfDpts[] = [];
  dataSourceByDate: IPastListOfDpts[] = [];
  options: ISegmentedOption[] = [
    {
      label: "按部门查看",
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
    const { propsStore } = this.rootStore;
    const req: IReqBusinessV1CustomerFollowFollowBoardStatList = {
      page: this.pagination.current,
      size: this.pagination.pageSize,

      groupByDeptFlag: true,
      endDateStart: propsStore.props.endDate?.[0]?.format("YYYY-MM-DD"),
      endDateEnd: propsStore.props.endDate?.[1]?.format("YYYY-MM-DD"),
    };

    if (this.formInfo.deptIdList?.length) {
      req.deptIdList = this.formInfo.deptIdList;
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
    const size =
      propsStore.props.endDate?.[1].diff(propsStore.props.endDate?.[0], "d") +
      1;
    const req: IReqBusinessV1CustomerFollowFollowBoardStatList = {
      page: this.pagination.current,
      size,

      groupByDateFlag: true,
      endDateStart: propsStore.props.endDate?.[0]?.format("YYYY-MM-DD"),
      endDateEnd: propsStore.props.endDate?.[1]?.format("YYYY-MM-DD"),
    };

    if (this.formInfo.deptIdList?.length) {
      req.deptIdList = this.formInfo.deptIdList;
    }

    if (propsStore.props.taskId) {
      req.taskStrategyIdList = [propsStore.props.taskId];
    }
    const [err, res] = await to(customer_follow_board_stat_list(req));
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.dataSourceByDate = (res.data?.records || []).map((r) => {
        return {
          ...r,
          taskCompletionRate: getRate100(r.taskCompletionRate),
          deadlineTaskCompletionRate: getRate100(r.deadlineTaskCompletionRate),
        };
      });
      this.paginationByDate.total = +(res.data?.total || 0);
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

  onAction(action: TAction, record: IPastListOfDpts) {
    const { propsStore } = this.rootStore;
    switch (action) {
      case "DETAIL":
        {
          const start =
            record.endDate ||
            propsStore.props.endDate?.[0]?.format("YYYY-MM-DD");
          const end =
            record.endDate ||
            propsStore.props.endDate?.[1]?.format("YYYY-MM-DD");

          window.open(
            `/#/workplan/taskOverview?comDateStart=${start}&&comDateEnd=${end}&&type=taskList&&taskOrg=${
              record?.deptId || ""
            }&&taskId=${propsStore.props.taskId || ""}`
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
