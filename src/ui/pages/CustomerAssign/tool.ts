import { IResBaseV1RegionTree } from "@/service/base/v1/region/tree";
import { IResBusinessV1CustomerGetPage } from "@/service/business/v1/customer/get-page";
import { TreeDataNode } from "antd";

/**@function 转换城市树 */
export const transformCityTree = (
  data: IResBaseV1RegionTree[]
): TreeDataNode[] => {
  return data?.map?.((item) => ({
    key: item.areaCode,
    title: item.areaName,
    value: item.areaCode,
    children: item.childList ? transformCityTree(item.childList) : undefined,
  }));
};

/**@function 查找城市树名称 */
export const findArea = (
  list: TreeDataNode[],
  record: IResBusinessV1CustomerGetPage
): string => {
  for (const item of list) {
    if (item.key === record.areaCode) {
      return item.title as string;
    }
    if (item.children?.length) {
      const found = findArea(item.children, record);
      if (found) return found ?? "";
    }
  }
  return "";
};
