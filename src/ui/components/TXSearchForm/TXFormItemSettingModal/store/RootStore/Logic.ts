import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, ITepItem, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IEditBaseFormItem, IInitData } from "../../interface";
import { cloneDeep } from "lodash";
import { getData, ILocalFormData, saveData, TFormData } from "@/utils/DataBase";
import { DragEndEvent } from "@dnd-kit/core";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  renderList: string[] = [];
  columnMap: Map<string, IEditBaseFormItem> = new Map();
  searchVal = "";

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.onSubmit = withRequest(this.onSubmit, "onSubmit");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeSearchVal(val?: string) {
    this.searchVal = val || "";
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    this.toInit();
  }

  async toInit(isReset?: boolean) {
    if (!this.initData?.columns || !this.initData.formKey) {
      return;
    }

    let data: Partial<TFormData> = {};

    if (!isReset) {
      data = (await getData("SEARCH")) || {};
    }
    const history: ILocalFormData | undefined = data[this.initData.formKey];

    runInAction(() => {
      const renderList: ITepItem[] = [];

      for (let c_ of this.initData!.columns) {
        let c: IEditBaseFormItem = { ...c_, index: -1, hidden: false };

        const oldItem = history?.columns[c_.name];
        if (oldItem) {
          c.hidden = oldItem.hidden;
          c.index = oldItem.index ?? -1;
        }

        this.columnMap.set(c_.name, c);
        if (c.hidden) {
          continue;
        }

        renderList.push({
          key: c_.name,
          index: c.index ?? -1,
        });
      }
      renderList.sort((a, b) => a.index - b.index);
      this.renderList = renderList.map((t) => t.key);
    });
  }

  closeModal() {
    this.open = false;
    this.initData = null;
    this.renderList = [];
    this.columnMap.clear();
  }

  changeHidden(key: string) {
    const record = this.columnMap.get(key);

    if (!record) {
      return;
    }
    record.hidden = !record.hidden;

    this.columnMap.set(key, record);

    if (record.hidden) {
      this.renderList = this.renderList.filter((item) => item !== key);
      return;
    }

    this.renderList.push(key);
  }

  multipleChoices(checked: boolean) {
    if (checked) {
      for (let [key, cell] of this.columnMap) {
        if (cell.hidden) {
          cell.hidden = false;
          this.columnMap.set(key, cell);
          this.renderList.push(key);
        }
      }
      return;
    }
    this.renderList = [];

    for (let [key, cell] of this.columnMap) {
      cell.hidden = true;
      this.columnMap.set(key, cell);
    }
  }

  async onSubmit() {
    const { propsStore } = this.rootStore;
    if (!this.initData?.formKey) {
      return;
    }
    const output: ILocalFormData = {
      columns: {},
    };

    const replyMap = cloneDeep(this.columnMap);

    for (let index = 0; index < this.renderList.length; index++) {
      const key = this.renderList[index];
      const record = this.columnMap.get(key);
      if (!record) {
        continue;
      }
      replyMap.delete(key);
      output.columns[key] = {
        hidden: record.hidden,
        index,
      };
    }

    let index = 0;
    for (let [key, record] of replyMap) {
      output.columns[key] = {
        hidden: true,
        index,
      };
      index++;
    }
    const data: Partial<TFormData> = (await getData("TABLE")) || {};

    runInAction(() => {
      data[this.initData!.formKey] = output;
    });
    await saveData("SEARCH", data);
    runInAction(() => {
      this.closeModal();
      propsStore.props.afterSave?.(output);
    });
  }

  onDragEnd(event: DragEndEvent) {
    if (!event.active || !event.over || event.active?.id === event.over?.id) {
      return;
    }

    const record = this.columnMap.get(event.active.id as string);
    if (!record) {
      return;
    }

    const newList: string[] = [];

    if (event.over.id === "_tx_") {
      newList.push(event.active.id as string);
    }

    for (let k of this.renderList) {
      if (k === event.over.id) {
        newList.push(event.over.id);
        newList.push(event.active.id as string);
        continue;
      }
      if (k === event.active.id) {
        continue;
      }
      newList.push(k);
    }
    this.renderList = newList;
  }

  resetAll() {
    this.toInit(true);
  }
}
