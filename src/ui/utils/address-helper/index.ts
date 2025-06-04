import { get_region_tree } from "@/pages/CustomerAssign/service";
import { transformCityTree } from "@/pages/CustomerAssign/tool";
import { IResBaseV1RegionTree } from "@/service/base/v1/region/tree";
import { createSingleton } from "../Singleton";
import { showErrorInfo, to } from "../tools";
import { IAddressHelper, IBaseV1RegionTreeRecord } from "./interface";
import { filterTreeByLevel, pushAreaToMap } from "./tool";

export class AddressHelper extends createSingleton<IAddressHelper>() {
  treeData: IResBaseV1RegionTree[] = [];
  areaMap: Map<string, IBaseV1RegionTreeRecord> = new Map();
  loading = false;

  private constructor() {
    super();
  }

  async getRegionTree() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    const [err, res] = await to(get_region_tree({ maxLevel: 3 }));
    this.loading = false;
    if (err || !res?.data) {
      showErrorInfo({
        err,
        res,
        msg: "获取地区数据失败",
      });
      return;
    }
    this.treeData = res?.data || [];

    const map = new Map<string, IBaseV1RegionTreeRecord>();
    pushAreaToMap(map, this.treeData);
    this.areaMap = map;
  }

  getAreaLabel(areaCode: string) {
    if (!this.treeData.length) {
      this.getRegionTree();
      return areaCode;
    }
    return this.areaMap.get(areaCode)?.origin?.areaName || areaCode;
  }

  getAreaNamePath(areaCode: string) {
    if (!this.treeData.length) {
      this.getRegionTree();
      return [areaCode];
    }
    return this.areaMap.get(areaCode)?.areaNamePath || [areaCode];
  }

  async getTreeDataWithLevel(isTransform: boolean, level?: number) {
    if (!this.treeData.length) await this.getRegionTree();
    if (level !== 1 && level !== 2) return this.treeData;
    const tree = filterTreeByLevel(this.treeData, level);
    return isTransform ? transformCityTree(tree) : tree;
  }
}
