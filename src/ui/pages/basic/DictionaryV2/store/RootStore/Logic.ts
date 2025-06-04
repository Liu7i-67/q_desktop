import { Modal } from "@/components/TXModal";
import { IResBaseV1SysDictGetPage } from "@/service/base/v1/sys-dict/get-page";
import { IPagination, TAction } from "@/utils/interface";
import { to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { IDictionaryV2 } from "../../interface";
import { get_dictionary_page } from "../../service";
import { RootStore } from "./";
import { ILogic, TLoadingStore } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IDictionaryV2[] = [];
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
    const { refs } = this.rootStore;
    const searchValue = refs.form.getFieldsValue();
    const [err, res] = await to(
      get_dictionary_page({
        ...searchValue,
        page: this.pagination.current,
        size: this.pagination.pageSize,
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.dataSource = res.data?.records || [];
      this.pagination.total = +(res.data?.total || 0);
    });
  }

  onSearch() {
    this.pagination.current = 1;
    this.getList();
  }

  onReset() {
    const { refs } = this.rootStore;
    refs.form.resetFields();
    this.pagination.current = 1;
    this.getList();
  }

  onPageChange(pagination: IPagination) {
    this.pagination.pageSize = pagination.pageSize || this.pagination.pageSize;
    this.pagination.current = pagination.current || 1;
    this.getList();
  }

  onAction(action: TAction, record: IDictionaryV2) {
    console.log(action);
    switch (action) {
      case "EDIT":
        this.onOpenAddOrEditDictModal(record);
        break;
      case "DETAIL":
        this.openDictConfigDrawer(record.dictCode, record.dictName);
        break;
      case "DELETE":
        {
          Modal.confirm({
            title: "确认删除",
            content: "确认删除该渠道分组？",
            okText: "确认",
            cancelText: "取消",
            onOk: () => {},
          });
        }
        break;
    }
  }

  onOpenAddOrEditDictModal(record?: IResBaseV1SysDictGetPage) {
    const { refs } = this.rootStore;
    const initValue = record
      ? {
          id: record.id,
          dictCode: record.dictCode,
          dictName: record.dictName,
          enableFlag: record.enableFlag,
          memo: record.memo,
        }
      : undefined;
    refs.addOrEditDictModalRef.current?.openModal(initValue);
  }

  openDictConfigDrawer(dictCode: string, dictName: string) {
    this.rootStore.refs.dictionaryConfigDrawerRef.current?.openDrawer({
      dictCode,
      dictName,
    });
  }
}
