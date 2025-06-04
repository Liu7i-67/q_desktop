import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, ITepItem, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { IInitData } from "../../interface";
import { ITXColumnType } from "@/components/TXTable/interface";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { cloneDeep } from "lodash";
import { getData, ILocalData, saveData, TTableData } from "@/utils/DataBase";
import { DragEndEvent } from "@dnd-kit/core";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  renderList: string[] = [];
  leftList: string[] = [];
  rightList: string[] = [];
  columnMap: Map<string, ITXColumnType> = new Map();
  searchVal = "";
  tableSize: SizeType = "middle";
  fixedY = true;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.onSubmit = withRequest(this.onSubmit, "onSubmit");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeTableSize(val: SizeType) {
    this.tableSize = val;
  }

  changeFixedY(fixed: boolean) {
    this.fixedY = fixed;
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
    if (!this.initData?.columns || !this.initData.tableKey) {
      return;
    }

    let data: Partial<TTableData> = {};

    if (!isReset) {
      data = (await getData("TABLE")) || {};
    }
    const history: ILocalData | undefined = data[this.initData.tableKey];

    let fixedY = true;
    if (history && history?.fixedY !== undefined) {
      fixedY = history.fixedY;
    }

    runInAction(() => {
      this.tableSize =
        history?.tableSize || this.initData?.tableSize || "middle";
      this.fixedY = fixedY;

      const renderList: ITepItem[] = [];
      const leftList: ITepItem[] = [];
      const rightList: ITepItem[] = [];

      for (let c_ of this.initData!.columns) {
        let c = { ...c_, index: -1 };
        if (c.disabledSetting || (c.auth === false)) {
          continue;
        }

        if (typeof c.key !== "string") {
          continue;
        }

        const oldItem = history?.columns[c.key];
        if (oldItem) {
          c.hidden = oldItem.hidden;
          c.fixed = oldItem.fixed;
          c.index = oldItem.index || -1;
        }

        this.columnMap.set(c.key, c);
        if (c.hidden) {
          continue;
        }

        if (c.fixed === "left") {
          leftList.push({
            key: c.key,
            index: c.index,
          });
          continue;
        }
        if (c.fixed === "right") {
          rightList.push({
            key: c.key,
            index: c.index,
          });
          continue;
        }

        renderList.push({
          key: c.key,
          index: c.index,
        });
      }
      renderList.sort((a, b) => a.index - b.index);
      this.renderList = renderList.map((t) => t.key);
      leftList.sort((a, b) => a.index - b.index);
      this.leftList = leftList.map((t) => t.key);
      rightList.sort((a, b) => a.index - b.index);
      this.rightList = rightList.map((t) => t.key);
    });
  }

  closeModal() {
    this.open = false;
    this.initData = null;
    this.renderList = [];
    this.leftList = [];
    this.rightList = [];
    this.tableSize = "middle";
    this.columnMap.clear();
  }

  changeHidden(key: string) {
    const record = this.columnMap.get(key);

    if (!record) {
      return;
    }
    record.hidden = !record.hidden;

    this.columnMap.set(key, record);
    if (record.hidden && record.fixed === "left") {
      this.leftList = this.leftList.filter((item) => item !== key);
      return;
    }
    if (record.hidden && record.fixed === "right") {
      this.rightList = this.rightList.filter((item) => item !== key);
      return;
    }
    if (record.hidden) {
      this.renderList = this.renderList.filter((item) => item !== key);
      return;
    }
    if (record.fixed === "left") {
      this.leftList.push(key);
      return;
    }
    if (record.fixed === "right") {
      this.rightList.push(key);
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
          if (cell.fixed === "left") {
            this.leftList.push(key);
            continue;
          }
          if (cell.fixed === "right") {
            this.rightList.push(key);
            continue;
          }
          this.renderList.push(key);
        }
      }
      return;
    }
    this.renderList = [];
    this.leftList = [];
    this.rightList = [];
    for (let [key, cell] of this.columnMap) {
      cell.hidden = true;
      this.columnMap.set(key, cell);
    }
  }

  cancelFixed(key: string) {
    const record = this.columnMap.get(key);
    if (!record) {
      return;
    }

    const oldFix = record.fixed;

    record.fixed = undefined;
    this.columnMap.set(key, record);

    if (oldFix === "left") {
      this.leftList = this.leftList.filter((item) => item !== key);
      this.renderList.unshift(key);
      return;
    }
    if (oldFix === "right") {
      this.rightList = this.rightList.filter((item) => item !== key);
      this.renderList.push(key);
      return;
    }
  }

  fixedToLeft(key: string) {
    const record = this.columnMap.get(key);
    if (!record) {
      return;
    }
    record.fixed = "left";
    this.columnMap.set(key, record);
    this.leftList.push(key);
    this.renderList = this.renderList.filter((item) => item !== key);
  }

  fixedToRight(key: string) {
    const record = this.columnMap.get(key);
    if (!record) {
      return;
    }
    record.fixed = "right";
    this.columnMap.set(key, record);
    this.rightList.push(key);
    this.renderList = this.renderList.filter((item) => item !== key);
  }

  async onSubmit() {
    const { propsStore } = this.rootStore;
    if (!this.initData?.tableKey) {
      return;
    }
    const output: ILocalData = {
      columns: {},
      tableSize: this.tableSize,
      fixedY: this.fixedY,
    };

    const replyMap = cloneDeep(this.columnMap);

    for (let index = 0; index < this.leftList.length; index++) {
      const key = this.leftList[index];
      const record = this.columnMap.get(key);
      if (!record) {
        continue;
      }
      replyMap.delete(key);
      output.columns[key] = {
        fixed: "left",
        hidden: record.hidden,
        index,
      };
    }
    for (let index = 0; index < this.renderList.length; index++) {
      const key = this.renderList[index];
      const record = this.columnMap.get(key);
      if (!record) {
        continue;
      }
      replyMap.delete(key);
      output.columns[key] = {
        fixed: undefined,
        hidden: record.hidden,
        index,
      };
    }
    for (let index = 0; index < this.rightList.length; index++) {
      const key = this.rightList[index];
      const record = this.columnMap.get(key);
      if (!record) {
        continue;
      }
      replyMap.delete(key);
      output.columns[key] = {
        fixed: "right",
        hidden: record.hidden,
        index,
      };
    }

    let index = 0;
    for (let [key, record] of replyMap) {
      output.columns[key] = {
        fixed: record.fixed,
        hidden: true,
        index,
      };
      index++;
    }
    const data: Partial<TTableData> = (await getData("TABLE")) || {};

    runInAction(() => {
      data[this.initData!.tableKey] = output;
    });
    await saveData("TABLE", data);
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

    let key = "renderList" as "renderList" | "leftList" | "rightList";

    switch (record.fixed) {
      case "left":
        {
          key = "leftList";
        }
        break;
      case "right":
        {
          key = "rightList";
        }
        break;
    }

    const newList: string[] = [];

    if (event.over.id === "_tx_") {
      newList.push(event.active.id as string);
    }

    for (let k of this[key]) {
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
    this[key] = newList;
  }

  resetAll() {
    this.toInit(true);
  }
}
