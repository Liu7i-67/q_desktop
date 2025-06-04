import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { to } from "@/utils/tools";
import { IDeadline } from "../../interface";
import { IPagination } from "@/utils/interface";
import {
  get_customer_follow_page,
  get_today_task_statistics,
} from "../../service";
import { getRate100 } from "@/utils/tools";
import { IStatisticsCardProps } from "../../../modules/Statistics";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IDeadline[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  showStatistics: boolean = true;
  statisticsData: IStatisticsCardProps[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getList() {
    const [err, res] = await to(
      get_customer_follow_page({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        searchTabEnum: "TODAY_END_UNFINISHED",
      })
    );
    if (err || !res) return;

    const records = res.data?.records || [];
    const total = +res.data?.total || 0;

    // 判断分页为空，且不是第一页
    if (records.length === 0 && total !== 0 && this.pagination.current > 1) {
      runInAction(() => {
        this.pagination.current = 1;
        setTimeout(() => {
          this.getList();
        }, 0);
      });
      return;
    }

    runInAction(() => {
      this.dataSource = records.map((record) => {
        const ownerUserId = record?.ownerUserId;
        const collabList = record?.customerDTO?.collabDTOList || [];
        const xzrList: string[] = collabList
          .filter((item: any) => item.userId !== ownerUserId)
          .map((item: any) => item.userName);
        const phoneNumber = record?.customerDTO?.phoneNumber;
        const wechatNumber = record?.customerDTO?.wechatNumber;
        const createTime = record?.customerDTO?.createTime;
        return {
          ...record,
          customerStatus: record?.customerDTO?.customerStatus,
          wechatStatus: record?.customerDTO?.wechatStatus,
          xzrList,
          phoneNumber,
          wechatNumber,
          createTime,
        };
      });
      this.pagination.total = total;
    });
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
  }

  toggleStatistics() {
    this.showStatistics = !this.showStatistics;
  }

  async getStatistics() {
    const [err, res] = await to(
      get_today_task_statistics({
        searchTabEnum: "TODAY_END_UNFINISHED",
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      const { totalCount, completeCount, restCount, completeRate } = res.data;
      this.statisticsData = [
        {
          title: "今日截止任务量",
          value: totalCount || 0,
          color: "blue",
        },
        {
          title: "任务完成",
          value: completeCount || 0,
          color: "green",
        },
        {
          title: "任务剩余",
          value: restCount || 0,
          color: "red",
        },
        {
          title: "任务完成率",
          value: `${getRate100(completeRate) || 0}%`,
          color: "purple",
        },
      ];
    });
  }
}
