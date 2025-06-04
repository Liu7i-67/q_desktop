import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import { useMethods } from "@quarkunlimit/react-hooks";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import {
  get_department_detail,
  get_department_type_tree,
  save_department_type,
  update_department_type,
} from "./service";

function ChannelManagerStore() {
  const [state, setState] = useImmer({
    /**
     * @projectTypeTree 部门分类树
     */
    projectTypeTree: [] as any[],
    /**
     * @updateClassifyModalData 记录部门分类树 当前项 record
     */
    updateClassifyModalData: {} as any,
    /**
     * @editClassifyModalVisible 打开新增、编辑部门分类弹窗
     */
    editClassifyModalVisible: false,
    /**
     * @isCreateClassify 是否是新增部门分类
     */
    isCreateClassify: false,
    /**
     * @currentDept 左侧部门分类对应的部门数据
     */
    currentDept: {} as any,
  });

  /**
   * @runGetDepartmentTypeTree 获取部门分类树
   */
  const runGetDepartmentTypeTree = useImmerApi(get_department_type_tree, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.projectTypeTree = data?.data ?? [];
      });
    },
  });
  /**
   * @runSaveDepartmentType 新增部门分类
   */
  const runSaveDepartmentType = useImmerApi(save_department_type, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditClassifyModal();
        logic.getDepartmentTypeTree();
        message.success("新增成功");
      } else {
        message.error(data?.msg ?? "新增失败");
      }
    },
  });
  /**
   * @runUpdateDepartmentType 修改部门分类
   */
  const runUpdateDepartmentType = useImmerApi(update_department_type, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditClassifyModal();
        logic.getDepartmentTypeTree();
        message.success("修改成功");
      } else {
        message.error(data?.msg ?? "修改失败");
      }
    },
  });
  /**
   * @runGetDepartmentDetail 获取部门详情
   */
  const runGetDepartmentDetail = useImmerApi(get_department_detail, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        setState((x) => {
          x.currentDept = data.data;
        });
      }
    },
  });

  const logic = useMethods({
    /**
     * @getDataByTypeKey 根据左侧部门分类，获取对应部门数据
     */
    getDataByTypeKey(key: string) {
      runGetDepartmentDetail.run({ id: key });
    },
    /**
     * @getDepartmentTypeTree 获取部门分类树
     */
    getDepartmentTypeTree() {
      runGetDepartmentTypeTree.run({
        ignorePermission: true,
      });
    },
    /**
     * @saveDepartmentType 新增部门分类
     */
    saveDepartmentType() {
      const values = editClassifyForm.getFieldsValue();
      runSaveDepartmentType.run(values);
    },
    /**
     * @updateDepartmentType 编辑部门分类
     */
    updateDepartmentType() {
      const values = editClassifyForm.getFieldsValue();
      const request = {
        ...values,
        id: state.updateClassifyModalData.key,
      };
      runUpdateDepartmentType.run(request);
    },
    /**
     * @getDepartmentDetail 获取部门详情
     */
    getDepartmentDetail() {
      runGetDepartmentDetail.run({ id: state.updateClassifyModalData.key });
    },
    /**
     * @setUpdateClassifyModalData 记录部门分类树 当前项 record
     */
    setUpdateClassifyModalData(data: any) {
      setState((d) => {
        d.updateClassifyModalData = data;
      });
    },
    /**
     * @openEditClassifyModalCreate 打开新增部门分类弹窗
     */
    openEditClassifyModalCreate() {
      setState((d) => {
        d.editClassifyModalVisible = true;
        d.isCreateClassify = true;
      });
    },
    /**
     * @openEditClassifyModalCreateSon 打开新增子部门分类节点弹窗
     */
    openEditClassifyModalCreateSon(node: any) {
      console.log(node);
      setState((d) => {
        d.editClassifyModalVisible = true;
        d.isCreateClassify = true;
        d.updateClassifyModalData = { key: node };
      });
    },
    /**
     * @openEditClassifyModalUpdate 打开编辑子部门分类节点弹窗
     */
    openEditClassifyModalUpdate(node: any) {
      console.log(node);
      setState((d) => {
        d.editClassifyModalVisible = true;
        d.isCreateClassify = false;
        d.updateClassifyModalData = node;
      });
    },
    /**
     * @closeEditClassifyModal 关闭新增、编辑部门分类弹窗
     */
    closeEditClassifyModal() {
      setState((d) => {
        d.editClassifyModalVisible = false;
      });
    },
    /**
     * @setCurrentDept 记录左侧选中的部门分类项 对应的详情数据
     */
    setCurrentDept(data: any) {
      setState((d) => {
        d.currentDept = data;
      });
    },
  });
  const editClassifyForm = Form.useForm()[0];
  return {
    state,
    logic,
    api: {
      runSaveDepartmentType,
      runUpdateDepartmentType,
      runGetDepartmentDetail,
    },
    editClassifyForm,
  };
}

export const { useSelector, Provider } = createStore(ChannelManagerStore);
