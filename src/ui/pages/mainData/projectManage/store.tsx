import { deleteEmptyKey } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import { useColumns } from "./columns";
import {
  get_project_detail,
  get_project_page,
  get_project_type_tree,
  save_project,
  save_project_type,
  update_project,
  update_project_type,
} from "./service";

function ChannelManagerStore() {
  /**
   * @form 医美项目管理 条件搜索 form
   */
  const form = Form.useForm()[0];

  const [state, setState] = useImmer({
    /**
     * @dataSource 医美项目管理 table 数据源
     */
    dataSource: [] as any[],
    /**
     * @total 医美项目管理 table 分页总数
     */
    total: 0,
    /**
     * @current 医美项目管理 table current
     */
    current: 1,
    /**
     * @pageSize 医美项目管理 table pageSize
     */
    pageSize: 20,
    /**
     * @projectTypeTree 医美项目分类树
     */
    projectTypeTree: [] as any[],
    /**
     * @editModalVisible 新增、编辑医美项目弹窗显示隐藏
     */
    editModalVisible: false,
    /**
     * @isCreate 是否是新增医美项目
     */
    isCreate: false,
    /**
     * @updateModalData 记录医美项目管理 table 当前项 record
     */
    updateModalData: {} as any,
    /**
     * @updateClassifyModalData 记录医美项目分类树 当前项 record
     */
    updateClassifyModalData: {} as any,
    /**
     * @editClassifyModalVisible 新增、编辑医美项目分类弹窗显示隐藏
     */
    editClassifyModalVisible: false,
    /**
     * @isCreateClassify 是否是新增医美项目分类
     */
    isCreateClassify: false,
    /**@param sidebar当前选择的项 */
    typeId: "",
  });
  /**
   * @runGetData 获取项目列表
   */
  const runGetData = useImmerApi(get_project_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.dataSource = data?.data?.records ?? [];
        x.total = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runGetProjectTypeTree 获取项目分类树
   */
  const runGetProjectTypeTree = useImmerApi(get_project_type_tree, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.projectTypeTree = data?.data ?? [];
      });
    },
  });
  /**
   * @runSaveProjectType 新增项目分类
   */
  const runSaveProjectType = useImmerApi(save_project_type, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditClassifyModal();
        logic.getProjectTypeTree();
        message.success("新增成功");
      } else {
        message.error(data?.msg ?? "新增失败");
      }
    },
  });
  /**
   * @runUpdateProjectType 修改项目分类
   */
  const runUpdateProjectType = useImmerApi(update_project_type, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditClassifyModal();
        logic.getProjectTypeTree();
        message.success("修改成功");
      } else {
        message.error(data?.msg ?? "修改失败");
      }
    },
  });
  /**
   * @runSaveProject 新增项目
   */
  const runSaveProject = useImmerApi(save_project, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditModal();
        logic.getData();
        message.success("新增成功");
      } else {
        message.error(data?.msg ?? "新增失败");
      }
    },
  });
  /**
   * @runUpdateProject 修改项目
   */
  const runUpdateProject = useImmerApi(update_project, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditModal();
        logic.getData();
        message.success("修改成功");
      } else {
        message.error(data?.msg ?? "修改失败");
      }
    },
  });
  /**
   * @runGetProjectDetail 获取项目详情
   */
  const runGetProjectDetail = useImmerApi(get_project_detail, {
    onSuccess(value) {
      const { data } = value;

      editForm.setFieldsValue(data.data);
    },
  });

  const logic = useMethods({
    /**
     * @getData 获取医美项目 table 数据
     */
    getData() {
      runGetData.run({
        size: state.pageSize,
        page: state.current,
      });
    },
    /**
     * @getDataByTypeKey 根据左侧医美项目分类项，获取医美项目 table 数据
     */
    getDataByTypeKey(key: string) {
      setState((d) => {
        d.typeId = key ?? "";
      });
      runGetData.run({
        size: state.pageSize,
        page: state.current,
        typeId: key,
      });
    },
    /**
     * @getProjectTypeTree 根据左侧医美项目分类树
     */
    getProjectTypeTree() {
      runGetProjectTypeTree.run();
    },
    /**
     * @saveProjectType 新增医美项目分类
     */
    saveProjectType() {
      const values = editClassifyForm.getFieldsValue();
      runSaveProjectType.run(values);
    },
    /**
     * @updateProjectType 编辑医美项目分类
     */
    updateProjectType() {
      const values = editClassifyForm.getFieldsValue();
      const request = {
        ...values,
        id: state.updateClassifyModalData.key,
      };
      runUpdateProjectType.run(request);
    },
    /**
     * @getProjectDetail 获取医美项目详情
     */
    getProjectDetail() {
      runGetProjectDetail.run({ id: state.updateModalData.id });
    },
    /**
     * @reset 重置条件搜索
     */
    reset() {
      form.resetFields();
      setState((d) => {
        d.current = 1;
      });
      const request = {
        size: state.pageSize,
        page: 1,
      };
      runGetData.run(request, true);
    },
    /**
     * @onSearch 条件搜索
     */
    onSearch() {
      setState((d) => {
        d.current = 1;
      });
      logic.handleGetChangeAndSearchData(1);
    },
    /**
     * @handleGetChangeAndSearchData 医美项目管理 条件搜索、table分页改变统一回调逻辑
     */
    handleGetChangeAndSearchData(page?: number, pageSize?: number) {
      const values = form.getFieldsValue();
      runGetData.run(
        deleteEmptyKey({
          size: pageSize ?? state.pageSize,
          page: page ?? state.current,
          ...values,
        }),
        true
      );
    },
    /**
     * @onChangePageSize 医美项目管理 table 分页改变
     */
    onChangePageSize(page: number, pageSize: number) {
      setState((d) => {
        d.pageSize = pageSize;
        d.current = page;
      });
      logic.handleGetChangeAndSearchData(page, pageSize);
    },
    /**
     * @addModalSubmit 新增医美项目
     */
    addModalSubmit() {
      editForm.validateFields().then((res) => {
        runSaveProject.run(res);
      });
    },
    /**
     * @updateModalSubmit 编辑医美项目
     */
    updateModalSubmit() {
      editForm.validateFields().then((res) => {
        const request = {
          ...res,
          id: state.updateModalData.id,
        };
        runUpdateProject.run(request);
      });
    },
    /**
     * @openEditModalCreate 打开新增医美项目弹窗
     */
    openEditModalCreate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = true;
      });
      editForm.setFieldsValue({
        enableFlag: true,
        ...(state.typeId ? { typeId: state.typeId } : {}),
      });
    },
    /**
     * @closeEditModal 关闭新增医美项目弹窗
     */
    closeEditModal() {
      setState((d) => {
        d.editModalVisible = false;
      });
    },
    /**
     * @openEditModalUpdate 打开编辑医美项目弹窗
     */
    openEditModalUpdate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = false;
      });
    },
    /**
     * @setUpdateModalData 记录医美项目管理 table 当前项 record
     */
    setUpdateModalData(data: any) {
      setState((d) => {
        d.updateModalData = data;
      });
    },
    /**
     * @setUpdateClassifyModalData 记录医美项目分类树 当前项 record
     */
    setUpdateClassifyModalData(data: any) {
      setState((d) => {
        d.updateClassifyModalData = data;
      });
    },
    /**
     * @openEditClassifyModalCreate 打开新增分类弹窗
     */
    openEditClassifyModalCreate() {
      setState((d) => {
        d.editClassifyModalVisible = true;
        d.isCreateClassify = true;
      });
    },
    /**
     * @openEditClassifyModalCreateSon 打开新增子分类弹窗
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
     * @openEditClassifyModalUpdate 打开编辑子分类弹窗
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
     * @closeEditClassifyModal 关闭新增、编辑分类弹窗
     */
    closeEditClassifyModal() {
      setState((d) => {
        d.editClassifyModalVisible = false;
      });
    },
  });
  /**
   * @columns 医美项目管理 table columns
   */
  const columns = useColumns({ logic } as any);
  /**
   * @editForm 新增、编辑医美项目弹窗 form
   */
  const editForm = Form.useForm()[0];
  /**
   * @editForm 新增、编辑医美项目分类弹窗 form
   */
  const editClassifyForm = Form.useForm()[0];
  return {
    state,
    form,
    logic,
    api: {
      runGetData,
      runSaveProjectType,
      runUpdateProjectType,
      runSaveProject,
      runUpdateProject,
      runGetProjectDetail,
    },
    columns,
    editForm,
    editClassifyForm,
  };
}

export const { useSelector, Provider } = createStore(ChannelManagerStore);
