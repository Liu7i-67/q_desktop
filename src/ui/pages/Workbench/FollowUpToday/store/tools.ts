import { IDept } from "@/components/TXEmployeePicker";
import { IResBaseV1SysDeptTree } from "@/service/base/v1/sys-dept/tree";
import { ITreeItem } from "@/utils/interface";

export const getDeptTree = (data: IResBaseV1SysDeptTree[]) => {
  const output: ITreeItem[] = [];

  for (let d of data) {
    const child: ITreeItem[] = [];

    if (d.childList) {
      child.push(...getDeptTree(d.childList));
    }

    const item: ITreeItem = {
      ...d,
      title: d.deptName || "",
      value: d.id || "",
      key: d.id || "",
      children: child,
    };
    output.push(item);
  }

  return output;
};
