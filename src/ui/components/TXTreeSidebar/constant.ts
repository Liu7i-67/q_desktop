/**@param 新增按钮文案 */
export const createButtonTextObj = {
  org: "新增分类",
  channel: "新增分类",
  mainData: "新增分类",
  dept: "新增部门",
};
/**@param 搜索框placeholder文案 */
export const placeholderTextObj = {
  org: "请输入机构分类名称",
  channel: "请输入渠道分类名称",
  mainData: "请输入项目分类名称",
  dept: "请输入部门分类名称",
};
/**@param 搜索框 key 名称 */
export const searchNameKeyObj = {
  org: "typeName",
  channel: "typeName",
  mainData: "typeName",
  dept: "deptName",
};
/**@param 源数据树的children名称 */
export const childListNameObj = {
  org: "childList",
  channel: "childList",
  mainData: "childList",
  dept: "childList",
};
/**@param 获取tree的接口名称 */
export const treeDataApiObj = {
  org: "/api/base/v1/organization-type/tree",
  channel: "/api/base/v1/channel-type/tree",
  mainData: "/api/base/v1/project-type/tree",
  dept: "/api/base/v1/sys-dept/tree",
};
/**@param 删除接口名称 */
export const deleteApiObj = {
  org: "/api/base/v1/organization-type/delete",
  channel: "",
  mainData: "",
  dept: "",
};
/**@param 获取tree的初始化参数 */
export const treeDataRequestObj = {
  org: {},
  channel: {},
  mainData: {},
  dept: {
    ignorePermission: true,
  },
};
