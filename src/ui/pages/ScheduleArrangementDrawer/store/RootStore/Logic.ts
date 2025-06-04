import {
  makeAutoObservable,
  runInAction,
  toJS,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import {
  IEditScheduleRecord,
  ILogic,
  IScheduleRecord,
  TAction,
  TLoadingStore,
} from "./interface";
import { RootStore } from "./";
import { IInitData, IWeekViewRecord, IWorkingShift } from "../../interface";
import { getWeekRange } from "../tools";
import { showErrorInfo, system2timeQuantum, to } from "@/utils/tools";
import {
  get_week_view_data,
  get_working_shift_list,
  update_user_schedule,
} from "../../service";
import { ITreeItem } from "@/utils/interface";
import { message } from "antd";
import dayjs from "dayjs";
import {
  IReqPostDTO,
  IReqScheduleRelationPostDTO,
  IReqUpdateUserSchedule,
} from "../../service/interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  rangeDate: string[] = [];
  scheduleMap: Map<string, IWeekViewRecord> = new Map();
  dataSource: IScheduleRecord[] = [];
  workingShift: IWorkingShift[] = [];
  record: IEditScheduleRecord | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getWeekData = withRequest(this.getWeekData, "getWeekData");
    this.getWorkingShiftList = withRequest(
      this.getWorkingShiftList,
      "getWorkingShiftList"
    );
    this.saveView = withRequest(this.saveView, "saveView");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openDrawer(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    const range = getWeekRange(this.initData?.date);
    this.rangeDate = range;
    this.getWeekData();
    this.getWorkingShiftList();
  }

  closeDrawer() {
    const { propsStore } = this.rootStore;
    this.open = false;
    this.initData = null;
    this.rangeDate = [];
    this.scheduleMap.clear();
    this.dataSource = [];
    propsStore.props.afterClose?.();
  }

  async getWorkingShiftList() {
    const [err, res] = await to(
      get_working_shift_list({
        page: 1,
        size: 50,
        scheduleType: "LITTLE_RED_BOOK",
      })
    );
    if (err || !res?.data) {
      return;
    }
    runInAction(() => {
      this.workingShift = res.data || [];
    });
  }

  async getWeekData() {
    const [err, res] = await to(
      get_week_view_data({
        scheduleDateStart: this.rangeDate[0],
        scheduleDateEnd: this.rangeDate[6],
        scheduleType: "LITTLE_RED_BOOK",
      })
    );
    if (err || !res) {
      showErrorInfo({
        err,
        res,
        msg: "排班数据获取失败",
      });
      return;
    }
    runInAction(() => {
      const map = new Map<string, IWeekViewRecord>();
      const userSet = new Set<string>();
      const dataSource: IScheduleRecord[] = [];
      for (let record of res.data || []) {
        map.set(`${record.userId}_${record.scheduleDate}`, record);

        if (userSet.has(record.userId)) {
          continue;
        }

        userSet.add(record.userId);

        let listRecord: IScheduleRecord = {
          userId: record.userId,
          userName: record.userName,
        };

        for (let i = 0; i < this.rangeDate.length; i++) {
          listRecord[`${this.rangeDate[i]}`] =
            `${record.userId}_${this.rangeDate[i]}`;
        }

        dataSource.push(listRecord);
      }
      this.dataSource = dataSource;
      this.scheduleMap = map;
    });
  }

  addRecordRow() {
    if (this.dataSource?.[this.dataSource.length - 1]?.userId === "test") {
      return;
    }
    let listRecord: IScheduleRecord = {
      userId: "test",
      userName: "",
    };

    for (let i = 0; i < this.rangeDate.length; i++) {
      listRecord[`${this.rangeDate[i]}`] = `test_${this.rangeDate[i]}`;
    }
    this.dataSource = this.dataSource.concat(listRecord);
  }

  onCellClick(dataKey: string) {
    const [userId] = dataKey.split("_");
    if (userId === "test") {
      message.info("请先选择员工");
      return;
    }
    const record = this.dataSource.find((r) => r.userId === userId);
    if (!record) {
      message.info("请先选择员工");
      return;
    }
    this.optionAction(record, "picker", dataKey);
  }

  optionAction(record: IScheduleRecord, action: TAction, date?: string) {
    const { refs } = this.rootStore;
    switch (action) {
      case "user":
        {
          this.record = record;
          let defaultUser: ITreeItem | undefined = undefined;
          if (record.userId !== "test") {
            defaultUser = {
              value: record.userId,
              key: record.userId,
              title: record.userName,
            };
          }
          refs.userRef.current?.openDrawer({
            defaultUser,
          });
        }
        break;
      case "picker":
        {
          this.record = {
            ...record,
            date,
          };
          refs.scheduleRef.current?.openDrawer({
            initData: this.scheduleMap.get(date || ""),
          });
        }
        break;
      case "delete":
        {
          this.dataSource = this.dataSource.filter(
            (r) => r.userId !== record.userId
          );

          for (let key of this.rangeDate) {
            this.scheduleMap.delete(record[key] || "");
          }
        }
        break;
    }
  }

  onUserSelect(record: ITreeItem) {
    if (!this.record) {
      return;
    }
    if (this.dataSource.find((r) => r.userId === record.key)) {
      message.warning(`${record.title} 已存在排班信息`);
      return;
    }
    this.dataSource = this.dataSource.map((oldRecord) => {
      if (oldRecord.userId !== this.record?.userId) {
        return oldRecord;
      }

      const newRecord: IScheduleRecord = {
        userId: record.key,
        userName: record.title,
      };
      for (let i = 0; i < this.rangeDate.length; i++) {
        const newKey = `${record.key}_${this.rangeDate[i]}`;
        newRecord[`${this.rangeDate[i]}`] = newKey;
        const item = this.scheduleMap.get(oldRecord[this.rangeDate[i]] || "");
        if (item) {
          this.scheduleMap.set(newKey, item);
          this.scheduleMap.delete(oldRecord[this.rangeDate[i]] as string);
        }
      }
      return newRecord;
    });
    this.record = null;
  }

  onScheduleSelect(record: IWeekViewRecord) {
    if (!this.record) {
      return;
    }

    this.scheduleMap.set(this.record.date || "", record);
  }

  async saveView() {
    const req: IReqUpdateUserSchedule = {
      scheduleType: "LITTLE_RED_BOOK",
      scheduleDateStart: this.rangeDate[0],
      scheduleDateEnd: this.rangeDate[6],
      postDTOList: [],
    };

    for (let u of this.dataSource) {
      if (u.userId === "test") {
        continue;
      }
      for (let d of this.rangeDate) {
        const view = this.scheduleMap.get(u[d] || "");
        if (!view) {
          continue;
        }

        const item: IReqPostDTO = {
          userId: u.userId,
          scheduleDate: d,
          scheduleRelationPostDTOList: [],
        };

        for (let s of view.scheduleRelationDTOList) {
          const sItem: IReqScheduleRelationPostDTO = {
            shiftId: s.workingShiftDTO.id,
            channelRelationPostDTOList: s.channelRelationViewDTOList.map(
              (g) => {
                return {
                  channelGroupId: g.channelGroupId,
                  channelIdList: g.channelDTOList.map((c) => c.channelId),
                };
              }
            ),
          };
          item.scheduleRelationPostDTOList.push(sItem);
        }
        req.postDTOList.push(item);
      }
    }

    if (!req.postDTOList.length) {
      message.warning("请先选择排班信息");
      return;
    }

    const [err, res] = await to(update_user_schedule(req));
    if (err || res?.code !== 200) {
      showErrorInfo({ err, res, msg: "修改失败" });
      return;
    }
    runInAction(() => {
      message.success("修改成功");
      this.getWeekData();
    });
  }
}
