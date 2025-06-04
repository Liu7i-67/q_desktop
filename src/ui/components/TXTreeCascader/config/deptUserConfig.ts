import { IConfig } from "../interface";

export const deptUserConfig: IConfig = {
  title: "选择人员",
  fetchApi: "/api/base/v1/sys-user/dept-tree-and-user",
  request: {},
  placeholder: "请输入人员/部门名称",
  selectedTitle: "已选人员",
  nodeConfig: [
    {
      childrenKey: "childList",
      searchFilterKey: "deptName",
      key: "id",
      parentKey: "parentId",
    },
    {
      childrenKey: "userDTOList",
      searchFilterKey: "userName",
      key: "id",
      parentKey: "parentId",
    },
  ],
};
