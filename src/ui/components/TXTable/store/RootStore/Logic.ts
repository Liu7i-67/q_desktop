import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { getData, ILocalData } from "@/utils/DataBase";
import { TTableKey } from "../../tableKey";
import { ITXColumnType } from "../../interface";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  haveInit: boolean = false;
  localSetting: ILocalData = {
    columns: {},
    tableSize: undefined,
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getLocalSetting = withRequest(this.getLocalSetting, "getLocalSetting");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openSetting() {
    const { refs, propsStore } = this.rootStore;
    if (!propsStore.props.tableKey || !propsStore.props.columns) {
      return;
    }
    refs.settingRef.current?.openModal({
      tableKey: propsStore.props.tableKey,
      columns: propsStore.props.columns as ITXColumnType[],
      tableSize: propsStore.props.size,
      columnSpan: propsStore.props.columnSpan,
    });
  }

  async getLocalSetting(tableKey?: TTableKey) {
    this.haveInit = false;
    if (!tableKey) {
      this.haveInit = true;
      return;
    }
    const data = (await getData("TABLE")) || {};
    const oldData: ILocalData | undefined = data[tableKey];
    if (!oldData) {
      runInAction(() => {
        this.haveInit = true;
      });
      return;
    }
    runInAction(() => {
      this.localSetting = oldData;
      this.haveInit = true;
    });
  }

  afterChange(setting: ILocalData) {
    this.localSetting = setting;
  }
}
