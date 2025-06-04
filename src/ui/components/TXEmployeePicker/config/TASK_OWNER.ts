import { get_dept_tree_and_user } from "../service";
import { IResBaseV1SysUserdeptTreeAndUser } from "@/service/base/v1/sys-user/dept-tree-and-user";
import { IConfig } from ".";
import { IDept, IDeptEmployee, ITXDept } from "../interface";

export const getDeptTree = (
  data: IDept[],
  info: {
    prefix: string[];
    dataMap: Map<string, string[]>;
    orgMap: Map<string, string[]>;
    infoMap: Map<string, ITXDept>;
  }
) => {
  const output: ITXDept[] = [];
  const { infoMap } = info;

  for (let d of data) {
    const child: ITXDept[] = [];

    const nextInfo = {
      ...info,
      prefix: [...info.prefix, d.id || ""],
    };

    child.push(
      ...getEmployeeTree(d.userDTOList, nextInfo),
      ...getDeptTree(d.childList, nextInfo)
    );

    if (!child.length) {
      continue;
    }

    const item: ITXDept = {
      ...d,
      title: d.deptName || "",
      value: d.id || "",
      children: child,
      isDept: true,
      checkable: true,
    };
    infoMap.set(d.id || "", item);
    output.push(item);
  }

  return output;
};

export const getEmployeeTree = (
  data: IDeptEmployee[],
  info: {
    prefix: string[];
    dataMap: Map<string, string[]>;
    orgMap: Map<string, string[]>;
    infoMap: Map<string, ITXDept>;
  }
) => {
  const { prefix, orgMap, dataMap, infoMap } = info;
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
      checkable: true,
    };
    infoMap.set(d.id, item);
    output.push(item);
  }
  return output;
};

const config: IConfig<IResBaseV1SysUserdeptTreeAndUser> = {
  api: get_dept_tree_and_user,
  formatRes: (res) => {
    const dataMap = new Map<string, string[]>();
    const orgMap = new Map<string, string[]>();
    const infoMap = new Map<string, ITXDept>();

    const list = getDeptTree(res.data || [], {
      prefix: [],
      dataMap,
      orgMap,
      infoMap,
    });

    return {
      list,
      map: dataMap,
      orgMap,
      infoMap,
    };
  },
  extraProps: {
    treeCheckable: true,
  },
};

export default config;
