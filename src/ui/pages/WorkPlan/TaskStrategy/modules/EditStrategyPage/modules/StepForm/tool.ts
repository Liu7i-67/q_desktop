import { TTXTreeCascaderNode } from "@/components/TXTreeCascader/store/RootStore/interface";
import {
  ICaretakerDTO,
  IDepartmentListDTO,
  IExecutorDTO,
  IUserListDTO,
} from "@/service/business/v1/task-strategy/get-page";

/**@function 构造执行人、管理人 */
export const generateExecutorAndCaretaker = (
  data: ICaretakerDTO | IExecutorDTO
): TTXTreeCascaderNode[] => {
  const dataSource = [
    ...(data?.departmentList ?? []),
    ...(data?.userList ?? []),
  ];
  return dataSource
    .filter((item) => item !== null)
    .map((item) => ({
      data: item,
      highLight: false,
      key: item.id,
      isDept: item.hasOwnProperty("userType") ? false : true,
      title:
        (item as IDepartmentListDTO).deptName ||
        (item as IUserListDTO).userName,
    }));
};

/**@function 打开弹窗前，去重默认选择的管理人 */
export const uniqueCaretakerByKey = (arr: TTXTreeCascaderNode[]) => {
  return [...new Map(arr.map((item) => [item.key, item])).values()];
};

/**@function 调用接口时，去重管理人 */
export const uniqueCaretakerById = (arr: { id: string }[]) => {
  return [...new Map(arr.map((item) => [item.id, item])).values()];
};
