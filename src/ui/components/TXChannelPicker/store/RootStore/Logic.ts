import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { showErrorInfo, to } from "@/utils/tools";
import { channel_get_page, get_channel_tree } from "../../service";
import { ITreeItem } from "@/utils/interface";
import { getChannelTreeData } from "../tools";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  treeData: ITreeItem[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getData = withRequest(this.getData, "getData");
    this.getChannelByUser = withRequest(
      this.getChannelByUser,
      "getChannelByUser"
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getData() {
    const { propsStore } = this.rootStore;
    const [err, res] = await to(
      get_channel_tree({
        enableFlag: true,
      })
    );
    if (err || !res?.data) {
      return;
    }
    runInAction(() => {
      this.treeData = getChannelTreeData(res.data || [], {
        onlyDir: propsStore.props.onlyDir,
      });
    });
  }

  async getChannelByUser(users?: string[]) {
    const { propsStore, refs } = this.rootStore;
    const [err, res] = await to(
      channel_get_page({
        page: 1,
        size: 1000,
        managerUserIdList: users?.join(","),
        enableFlag: true,
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
      refs.userRef.current?.closeModal();
      if (!res.data?.records?.length) {
        return;
      }
      const value = propsStore.props.value || [];
      let newValue: string[] = [];

      if (propsStore.props.onlyDir) {
        newValue = [
          ...new Set([
            ...value,
            ...res.data.records.map((r) => r.channelTypeId),
          ]),
        ];
      } else {
        newValue = [
          ...new Set([...value, ...res.data.records.map((r) => r.id)]),
        ];
      }

      // @ts-ignore
      propsStore.props.onChange?.(newValue, [], {});
    });
  }
}
