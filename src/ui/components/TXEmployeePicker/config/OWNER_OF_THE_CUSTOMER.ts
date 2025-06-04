import { get_dept_tree_and_user } from "../service";
import { IResBaseV1SysUserdeptTreeAndUser } from "@/service/base/v1/sys-user/dept-tree-and-user";
import { IConfig } from ".";
import { IDept, IDeptEmployee, ITXDept } from "../interface";

export const getDeptTree = (
  data: IDept[],
  prefix: string[],
  dataMap: Map<string, string[]>,
  orgMap: Map<string, string[]>
) => {
  const output: ITXDept[] = [];

  for (let d of data) {
    const child: ITXDept[] = [];

    child.push(
      ...getEmployeeTree(
        d.userDTOList,
        [...prefix, d.id || ""],
        dataMap,
        orgMap
      ),
      ...getDeptTree(d.childList, [...prefix, d.id || ""], dataMap, orgMap)
    );

    if (!child.length) {
      continue;
    }

    const item: ITXDept = {
      ...d,
      title: d.deptName || "",
      value: d.id || "",
      disabled: true,
      children: child,
      isDept: true,
    };

    output.push(item);
  }

  return output;
};

export const getEmployeeTree = (
  data: IDeptEmployee[],
  prefix: string[],
  dataMap: Map<string, string[]>,
  orgMap: Map<string, string[]>
) => {
  const output: ITXDept[] = [];

  for (let d of data) {
    const value = `${prefix.join("")}___${d.id}`;

    for (let p of prefix) {
      const pList = orgMap.get(p) || [];
      pList.push(d.id);
      orgMap.set(p, pList);
    }

    const list = dataMap.get(d.id) || [];
    list.push(value);
    dataMap.set(d.id, list);

    const item: ITXDept = {
      ...d,
      title: d.userName,
      value,
      children: [],
    };
    output.push(item);
  }
  return output;
};

const config: IConfig<IResBaseV1SysUserdeptTreeAndUser> = {
  api: get_dept_tree_and_user,
  formatRes: (res) => {
    const userInfoMap = new Map<string, string[]>();
    const orgMap = new Map<string, string[]>();

    const list = getDeptTree(res.data || [], [], userInfoMap, orgMap);
    return {
      list,
      map: userInfoMap,
      orgMap,
    };
  },
  extraProps: {},
};

export default config;
