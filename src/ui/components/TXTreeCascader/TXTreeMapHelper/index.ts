import { createSingleton } from "@/utils/Singleton";
import { TTXTreeCascaderType } from "../interface";
import { TTXTreeCascaderNode } from "../store/RootStore/interface";
import { deduplicateByKey } from "../tool";
import { ITXTreeMapHelper } from "./interface";

export class TXTreeMapHelper extends createSingleton<ITXTreeMapHelper>() {
  txtreeCascaderMap: Map<
    TTXTreeCascaderType,
    Map<string, TTXTreeCascaderNode[] | undefined>
  > = new Map();
  loading = false;

  private constructor() {
    super();
  }

  setTXTreeMapHelperMap(
    primaryKey: TTXTreeCascaderType,
    secondaryKey: string,
    value: TTXTreeCascaderNode
  ) {
    if (!this.txtreeCascaderMap.has(primaryKey)) {
      this.txtreeCascaderMap.set(primaryKey, new Map());
    }
    const preValue = this.txtreeCascaderMap.get(primaryKey)?.get(secondaryKey);
    if (preValue) {
      this.txtreeCascaderMap
        .get(primaryKey)
        ?.set(secondaryKey, deduplicateByKey([...preValue, value], "key"));
      return;
    }
    this.txtreeCascaderMap.get(primaryKey)?.set(secondaryKey, [value]);
  }

  getTXTreeHelperMapValues(
    primaryKey: TTXTreeCascaderType,
    secondaryKey: string
  ) {
    return this.txtreeCascaderMap.get(primaryKey)?.get(secondaryKey);
  }

  getTXTreeHelperMap(primaryKey: TTXTreeCascaderType) {
    return this.txtreeCascaderMap.get(primaryKey);
  }
}
