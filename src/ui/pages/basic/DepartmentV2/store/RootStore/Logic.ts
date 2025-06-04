import { showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { get_department_detail } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  deptType: string;
  deptDetailInfo: any;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.deptType = "";
    this.deptDetailInfo = {};
    this.getDepartmentDetail = withRequest(
      this.getDepartmentDetail,
      "getDepartmentDetail"
    );
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getDepartmentDetail() {
    if (!this.deptType) {
      this.deptDetailInfo = {};
      return;
    }
    const [err, res] = await to(
      get_department_detail({
        id: this.deptType,
      })
    );
    if (err || !res) {
      showErrorInfo({
        err,
        res,
      });
      return;
    }
    runInAction(() => {
      this.deptDetailInfo = res.data ?? {};
    });
  }

  onSelectTreeNode(selectedKeys: string[]) {
    this.deptType = selectedKeys.length ? selectedKeys[0] : "";
    this.getDepartmentDetail();
  }
}
