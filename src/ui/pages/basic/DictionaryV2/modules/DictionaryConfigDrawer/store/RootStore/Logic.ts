import { IPagination } from "@/utils/interface";
import { showErrorInfo, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { IInitData } from "../../interface";
import { get_dict_value_page } from "../../service";
import { RootStore } from "./";
import { IDataSource, ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  dataSource: IDataSource[] = [];
  initData: IInitData = {
    dictCode: "",
    dictName: "",
  };
  pagination: IPagination = {
    pageSize: 20,
    current: 1,
    total: 0,
  };
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getList() {
    const [err, res] = await to(
      get_dict_value_page({
        dictCode: this.initData.dictCode,
        page: this.pagination.current,
        size: this.pagination.pageSize,
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
      this.dataSource = res.data || [];
      // 该接口为非分页接口，接口不会返回total
      // this.pagination.total = +(res.data?.total || 0);
    });
  }

  openDrawer(initData: IInitData) {
    this.open = true;
    this.initData = initData;
    this.getList();
  }

  closeDrawer() {
    this.open = false;
    this.initData = {
      dictCode: "",
      dictName: "",
    };
  }

  onOpenAddorEditDictionaryValueModal(record: Partial<IDataSource>) {
    this.rootStore.refs.addOrEditDictionaryValueModalRef.current?.openModal(
      record
    );
  }
}
