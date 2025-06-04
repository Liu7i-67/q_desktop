import { IResBaseV1RegionTree } from "@/service/base/v1/region/tree";
import { IBaseV1RegionTreeRecord } from "./interface";

export const pushAreaToMap = (
  map: Map<string, IBaseV1RegionTreeRecord>,
  list: IResBaseV1RegionTree[],
  path: string[] = []
) => {
  for (let item of list) {
    map.set(item.areaCode, {
      origin: item,
      areaNamePath: [...path, item.areaName],
    });
    if (item.childList?.length) {
      pushAreaToMap(map, item.childList, [...path, item.areaName]);
    }
  }
};

export const filterTreeByLevel = (
  data: IResBaseV1RegionTree[],
  targetLevel: number
): IResBaseV1RegionTree[] => {
  return data
    .map((node) => {
      const filteredChildren = filterTreeByLevel(
        node.childList || [],
        targetLevel
      );
      if (node.level <= targetLevel || filteredChildren.length > 0) {
        return {
          ...node,
          childList: filteredChildren,
        };
      }
      return null;
    })
    .filter((node) => node !== null);
};
