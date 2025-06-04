import { showErrorInfo, to } from "@/utils/tools";
import { getConfig } from "./config";
import { TEmployeePicker } from "./useTXEmployeePicker";
import { TreeDataNode } from "antd";

export const getEmployeePickerValue = (val: string | string[]) => {
  if (!val) return undefined;

  if (Array.isArray(val)) {
    return val.map((t) => {
      const [prefix, id] = t.split("___");
      return id || prefix;
    });
  }

  if (typeof val === "string") {
    const [prefix, id] = val.split("___");
    return id || prefix;
  }

  return undefined;
};

/** @function 获取具体要回填的数据 */
export const getCascaderItem = async (
  val: string[],
  type: TEmployeePicker,
  checkDirFlag?: boolean
) => {
  if (!val?.length) {
    return [];
  }
  const type_ = type || "USER";
  const config = getConfig(type_);
  const [err, res] = await to(config.api(config.extraParams));
  if (err || !res) {
    showErrorInfo({
      err,
      res,
      msg: "数据源获取失败",
    });
    return [];
  }
  const info = config.formatRes(res);

  const defaultValue: string[] = [];

  for (let k of val) {
    const record = info.orgMap.get(k);
    if (!record) {
      defaultValue.push(k);
      continue;
    }
    defaultValue.push(...record);
  }

  return [...new Set(defaultValue)];
};

export const getParentKey = (
  key: React.Key,
  tree: TreeDataNode[]
): React.Key => {
  let parentKey: React.Key;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey!;
};
