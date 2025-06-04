import { IResBaseV1PlatformProjectTypeTreeAndChild } from "@/service/base/v1/project-type/tree-and-child";
import { IResBusinessV1CustomerDispatchAvailableOrg } from "@/service/business/v1/customer-dispatch/available-org";
import { ITreeItem } from "@/utils/interface";
import { usePartialBoolean } from "@/utils/tools";

/** @function 处理组织 */
export const getOrgTreeItem = (
  item: IResBusinessV1CustomerDispatchAvailableOrg,
  extra?: ITreeExtra
) => {
  let children: ITreeItem[] = [];

  for (let org of item.dataList) {
    children.push({
      title: org.orgName,
      value: org.id,
      checkable: true,
    });
  }

  for (let c of item.childList || []) {
    children.push(getOrgTreeItem(c, extra));
  }

  const output: ITreeItem = {
    title: item.areaName,
    value: `area_${item.id}`,
    disabled: usePartialBoolean(extra?.disabled, false),
    checkable: usePartialBoolean(extra?.checkable, true),
    children: children.length ? children : undefined,
  };
  return output;
};

/** @function 处理组织树 */
export const getOrgTree = (
  data: IResBusinessV1CustomerDispatchAvailableOrg[],
  extra?: ITreeExtra
) => {
  const output: ITreeItem[] = [];

  for (let item of data) {
    output.push(getOrgTreeItem(item, extra));
  }
  return output;
};

/** @function 处理项目分类 */
export const getProjectTreeItem = (
  item: IResBaseV1PlatformProjectTypeTreeAndChild,
  extra?: ITreeExtra
) => {
  let child: ITreeItem[] = [];

  for (let p of item.projectDTOList || []) {
    child.push({
      title: p.projectName,
      value: p.id,
      checkable: true,
    });
  }

  for (let c of item.childList || []) {
    child.push(getProjectTreeItem(c, extra));
  }

  let output: ITreeItem = {
    title: item.typeName,
    value: `type_${item.id}`,
    disabled: usePartialBoolean(extra?.disabled, false),
    checkable: usePartialBoolean(extra?.checkable, true),
    children: child.length ? child : undefined,
  };
  return output;
};

/** @function 处理项目分类树 */
export const getProjectTree = (
  data: IResBaseV1PlatformProjectTypeTreeAndChild[],
  extra?: ITreeExtra
) => {
  const output: ITreeItem[] = [];

  for (let item of data) {
    output.push(getProjectTreeItem(item, extra));
  }
  return output;
};

export interface ITreeExtra {
  /** @param 分类是否禁用 */
  disabled?: boolean;
  /** @param 分类是否可勾选 */
  checkable?: boolean;
}
