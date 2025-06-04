import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, ISearchInfo, TLoadingStore } from "./interface";
import { RootStore } from "./";
import {
  handleJudgeCustomerIdSmallThanTwoH,
  showErrorInfo,
  to,
} from "@/utils/tools";
import { ITaskList } from "../../interface";
import { IPagination, TAction } from "@/utils/interface";
import { message } from "antd";
import { Modal } from "@/components/TXModal";
import dayjs, { Dayjs } from "dayjs";
import {
  customer_follow_delete,
  customer_follow_get_page,
} from "../../../service";
import { IReqBusinessV1CustomerFollowGetPage } from "@/service/business/v1/customer-follow/get-page";
import { cancelSvg } from "../../svg";
import { getCascaderItem } from "@/components/TXEmployeePicker";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: ITaskList[] = [];
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  formInfo: ISearchInfo = {};

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    this.deleteRecord = withRequest(this.deleteRecord, "deleteRecord");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onReset() {
    const { refs } = this.rootStore;
    const endDate: [Dayjs, Dayjs] = [
      dayjs().startOf("month"),
      dayjs().endOf("month"),
    ];
    refs.form.setFieldsValue({
      endDate,
    });
    this.formInfo = {
      endDate,
    };
    this.pagination.current = 1;
    this.pagination.total = 0;
    this.getList();
  }

  onSearch(info: ISearchInfo) {
    this.formInfo = info;
    this.pagination.current = 1;
    this.pagination.total = 0;
    this.getList();
  }

  async init() {
    const { refs } = this.rootStore;
    const hashPart = window.location.hash.split("?")[1];
    let date = "";
    let comDate = "";
    let comDateStart = "";
    let comDateEnd = "";
    let taskOrg = "";
    let taskId = "";
    if (hashPart) {
      const params = new URLSearchParams(hashPart);
      date = params.get("date") || "";
      comDate = params.get("comDate") || "";
      comDateStart = params.get("comDateStart") || "";
      comDateEnd = params.get("comDateEnd") || "";
      taskId = params.get("taskId") || "";
      taskOrg = params.get("taskOrg") || "";
    }
    const initData: Partial<ISearchInfo> = {};
    if (date) {
      initData["endDate"] = [
        dayjs(`${date} 00:00:00`),
        dayjs(`${date} 23:59:59`),
      ];
    } else {
      initData["endDate"] = [dayjs().startOf("month"), dayjs().endOf("month")];
    }
    if (comDate) {
      initData["followedTime"] = [
        dayjs(`${comDate} 00:00:00`),
        dayjs(`${comDate} 23:59:59`),
      ];
    }
    if (comDateStart && comDateEnd) {
      initData["followedTime"] = [
        dayjs(`${comDateStart} 00:00:00`),
        dayjs(`${comDateEnd} 23:59:59`),
      ];
    }
    if (taskOrg) {
      const userIdList = await getCascaderItem([taskOrg], "TASK_OWNER", false);
      initData["userIdList"] = userIdList;
    }
    if (taskId) {
      initData["taskStrategyId"] = taskId;
    }

    if (Object.keys(initData).length) {
      refs.form.setFieldsValue(initData);
      this.formInfo = initData;
    }

    this.getList();
  }

  async getList() {
    const req: IReqBusinessV1CustomerFollowGetPage = {
      page: this.pagination.current,
      size: this.pagination.pageSize,
      customerKeyword: this.formInfo.customerKeyword,
    };

    if (this.formInfo.taskStrategyId) {
      req.taskStrategyIdList = [this.formInfo.taskStrategyId];
    }

    if (this.formInfo.ownerUserId) {
      req.ownerUserIdList = [this.formInfo.ownerUserId];
    }
    if (this.formInfo.collabUserId) {
      req.collabUserIdList = [this.formInfo.collabUserId];
    }

    if (this.formInfo.userIdList) {
      req.userIdList = this.formInfo.userIdList;
    }
    if (this.formInfo.followStatusEnumList) {
      req.statusEnumList = this.formInfo.followStatusEnumList;
    }

    if (this.formInfo.startDate?.[0] && this.formInfo.startDate?.[1]) {
      req.startDateStart = dayjs(this.formInfo.startDate[0]).format(
        "YYYY-MM-DD"
      );
      req.startDateEnd = dayjs(this.formInfo.startDate[1]).format("YYYY-MM-DD");
    }

    if (this.formInfo.endDate?.[0] && this.formInfo.endDate?.[1]) {
      req.endDateStart = dayjs(this.formInfo.endDate[0]).format("YYYY-MM-DD");
      req.endDateEnd = dayjs(this.formInfo.endDate[1]).format("YYYY-MM-DD");
    }

    if (this.formInfo.followedTime?.[0] && this.formInfo.followedTime?.[1]) {
      req.followedTimeStart = dayjs(this.formInfo.followedTime[0]).format(
        "YYYY-MM-DD 00:00:00"
      );
      req.followedTimeEnd = dayjs(this.formInfo.followedTime[1]).format(
        "YYYY-MM-DD 23:59:59"
      );
    }

    const [err, res] = await to(customer_follow_get_page(req));
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.dataSource = (res.data?.records || []).map((r) => {
        const collabList: string[] = [];

        for (let info of r?.customerDTO?.collabDTOList || []) {
          if (info.userId !== r?.customerDTO?.ownerUserId) {
            collabList.push(info.userName);
          }
        }

        return {
          ...r,
          ownerName: r?.customerDTO?.ownerName,
          hasCrossStoreRecord: handleJudgeCustomerIdSmallThanTwoH(
            r.customerId || r.id
          ),
          collabList,
          phoneNumber: r?.customerDTO?.phoneNumber,
          wechatNumber: r?.customerDTO?.wechatNumber,
          wechatStatus: r?.customerDTO?.wechatStatus,
          customerStatus: r?.customerDTO?.customerStatus,
        };
      });
      this.pagination.total = +(res.data?.total || 0);
    });
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
  }

  async deleteRecord(record: ITaskList) {
    const [err, res] = await to(
      customer_follow_delete({ idList: [record.id] })
    );
    if (err || !res) {
      showErrorInfo({
        err,
        res,
        msg: "取消失败",
      });
      return;
    }
    runInAction(() => {
      message.success("操作成功");
      this.getList();
    });
  }

  onAction(action: TAction, record: ITaskList) {
    const { refs } = this.rootStore;
    switch (action) {
      case "DETAIL":
        {
          refs.customerRef.current?.openDrawer({
            customerId: record.customerId,
          });
        }
        break;
      case "CANNEL":
        {
          Modal.confirm({
            title: "取消任务",
            icon: cancelSvg,
            width: 500,
            closable: true,
            content: (
              <div className="p-4 text-center">
                <div className="font-bold my-2">是否确定取消该任务？</div>
                <div>取消后，该任务将无需完成，也不会纳入数据统计。</div>
              </div>
            ),
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
              this.deleteRecord(record);
            },
          });
        }
        break;
    }
  }
}
