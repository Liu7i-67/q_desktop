import {
  makeAutoObservable,
  runInAction,
  toJS,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { to } from "@/utils/tools";
import { get_sys_user_data } from "../../service";
import { ITreeItem } from "@/utils/interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  searchVal = "";
  timer: NodeJS.Timeout | null = null;
  dataSource: ITreeItem[] = [];
  selectedKeys: string[] = [];
  selectRecords: ITreeItem[] = [];
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getSysUserData = withRequest(this.getSysUserData, "getSysUserData");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeSearchVal(val?: string) {
    this.searchVal = val || "";

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.timer = setTimeout(() => {
      this.getSysUserData();
    }, 500);
  }

  onEnterPress() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.getSysUserData();
  }

  openDrawer(initData?: IInitData) {
    const { refs } = this.rootStore;
    this.open = true;
    this.initData = initData || null;
    this.getSysUserData();

    if (this.initData?.defaultUser) {
      this.selectedKeys = [this.initData.defaultUser.key];
      this.selectRecords = [this.initData.defaultUser];
    }
    setTimeout(() => {
      refs.inputRef.current?.focus();
    }, 100);
  }

  closeDrawer() {
    this.initData = null;
    this.searchVal = "";
    this.dataSource = [];
    this.selectedKeys = [];
    this.selectRecords = [];
    this.open = false;
  }

  async getSysUserData() {
    const [err, res] = await to(
      get_sys_user_data({
        userName: this.searchVal || undefined,
        page: 1,
        size: 200,
      })
    );
    if (err || !res?.data) {
      return;
    }

    runInAction(() => {
      this.dataSource = res.data?.records?.map?.((r) => {
        return {
          title: r.userName,
          key: r.id,
          value: r.id,
          disabled: r.enableFlag === false,
        };
      });
    });
  }

  onSelect(record: ITreeItem) {
    const { propsStore } = this.rootStore;
    this.selectedKeys = [record.key];
    this.selectRecords = [record];
    propsStore.props.onSelect?.(toJS(record));
    this.closeDrawer();
  }
}
