import {
  makeAutoObservable,
  runInAction,
  toJS,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import {
  IWeekViewRecord,
  IWorkingShift,
} from "@/pages/ScheduleArrangementDrawer/interface";
import { to } from "@/utils/tools";
import { get_working_shift_list } from "@/pages/ScheduleArrangementDrawer/service";
import { message } from "antd";
import {
  IBaseScheduleRelationDTO,
  IResChannelRelationViewDTO,
} from "@/pages/ScheduleArrangementDrawer/service/interface";
import { IOption } from "@/utils/interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  workingShift: IWorkingShift[] = [];
  scheduleRelationDTOList: IBaseScheduleRelationDTO[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getWorkingShiftList = withRequest(
      this.getWorkingShiftList,
      "getWorkingShiftList"
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openDrawer(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    if (this.initData?.initData) {
      this.scheduleRelationDTOList = (
        this.initData?.initData?.scheduleRelationDTOList || []
      ).map((s) => {
        const webChannel: IOption[] = [];

        for (let g of s.channelRelationViewDTOList) {
          for (let c of g.channelDTOList) {
            webChannel.push({
              label: c.channelName,
              value: `${c.channelId}_${g.channelGroupId}_${g.channelGroupName}`,
            });
          }
        }

        return {
          ...s,
          webChannel,
        };
      });
    }
    this.getWorkingShiftList();
  }

  closeDrawer() {
    const { propsStore } = this.rootStore;
    this.initData = null;
    this.workingShift = [];
    this.scheduleRelationDTOList = [];
    this.open = false;
  }

  addShift(record: IWorkingShift) {
    if (
      this.scheduleRelationDTOList.find(
        (i) => i.workingShiftDTO.id === record.id
      )
    ) {
      message.warning("请勿重复添加");
      return;
    }
    this.scheduleRelationDTOList.push({
      workingShiftDTO: record,
      channelRelationViewDTOList: [],
      webChannel: [],
    });
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

  changeChannelInfo(options: IOption[], record: IBaseScheduleRelationDTO) {
    this.scheduleRelationDTOList = this.scheduleRelationDTOList.map((s) => {
      if (s.workingShiftDTO.id === record.workingShiftDTO.id) {
        return {
          ...s,
          webChannel: options,
        };
      }
      return s;
    });
  }

  deleteShift(record: IBaseScheduleRelationDTO) {
    this.scheduleRelationDTOList = this.scheduleRelationDTOList.filter(
      (s) => s.workingShiftDTO.id !== record.workingShiftDTO.id
    );
  }

  saveSelect() {
    const { propsStore } = this.rootStore;
    const outPut: IWeekViewRecord = {
      id: "",
      scheduleDate: "",
      userId: "",
      userName: "",
      userNameList: [],
      ...(this.initData?.initData || {}),
      scheduleRelationDTOList: [],
    };

    for (let s of this.scheduleRelationDTOList) {
      const channelRelationViewDTOList: IResChannelRelationViewDTO[] = [];

      if (!s.webChannel.length) {
        message.warning(`【${s.workingShiftDTO.shiftName}】未选择渠道信息`);
        return;
      }

      for (let c of s.webChannel) {
        const [channelId, channelGroupId, channelGroupName] =
          c.value.split("_");
        const index = channelRelationViewDTOList.findIndex(
          (i) => i.channelGroupId === channelGroupId
        );

        const item = {
          channelId,
          channelGroupId,
          channelName: c.label,
          channelGroupName,
          createTime: "",
          id: "",
          scheduleId: "",
          updateTime: "",
        };

        if (index === -1) {
          channelRelationViewDTOList.push({
            channelDTOList: [item],
            channelGroupId,
            channelGroupName,
          });
        } else {
          channelRelationViewDTOList[index].channelDTOList.push(item);
        }
      }

      outPut.scheduleRelationDTOList.push({
        workingShiftDTO: {
          createTime: "",
          endTime: "",
          scheduleType: 0,
          startTime: "",
          updateTime: "",
          ...s.workingShiftDTO,
        },
        channelRelationViewDTOList,
      });
    }
    propsStore.props.onSelect?.(outPut);
    this.closeDrawer();
  }
}
