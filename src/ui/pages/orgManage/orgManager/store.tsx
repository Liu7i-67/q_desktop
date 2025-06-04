import { get_region_tree } from "@/pages/customerLead/service";
import { deleteEmptyKey } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import dayjs from "dayjs";
import { useColumns } from "./columns";
import {
  delete_org_type,
  get_org_detail,
  get_org_page,
  get_org_type_tree,
  save_org,
  save_org_type,
  update_org,
  update_org_type,
} from "./service";
import { toUpload } from "@/utils/upload";

function OrgManagerStore() {
  const [state, setState] = useImmer({
    /**
     * @dataSource 机构管理 table 数据源
     */
    dataSource: [] as any[],
    /**
     * @dataSource 机构管理 table total
     */
    total: 0,
    /**
     * @current 机构管理 table current
     */
    current: 1,
    /**
     * @pageSize 机构管理 table pageSize
     */
    pageSize: 20,
    /**
     * @orgTypeTree 机构分类 tree
     */
    orgTypeTree: [] as any[],
    /**
     * @regionTree 城市下拉框数据
     */
    regionTree: [] as any[],
    /**
     * @editModalVisible 新增、编辑机构弹窗显示隐藏
     */
    editModalVisible: false,
    /**
     * @isCreate 是否是新增机构
     */
    isCreate: false,
    /**
     * @updateModalData 记录机构管理 table 当前项 record
     */
    updateModalData: {} as any,
    /**
     * @updateClassifyModalData 记录机构分类 tree 当前项 record
     */
    updateClassifyModalData: {} as any,
    /**
     * @editClassifyModalVisible 新增、编辑机构分类弹窗显示隐藏
     */
    editClassifyModalVisible: false,
    /**
     * @isCreateClassify 是否是新增分类
     */
    isCreateClassify: false,
    /**
     * @orgType 机构分类
     */
    orgType: "",
    /** @param 图片上传loading */
    loading: false,
  });

  /**
   * @runGetData 获取机构列表
   */
  const runGetData = useImmerApi(get_org_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.dataSource = data?.data?.records ?? [];
        x.total = data?.data?.total ?? 0;
      });
    },
  });

  /**
   * @runGetOrgTypeTree 获取机构分类树
   */
  const runGetOrgTypeTree = useImmerApi(get_org_type_tree, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.orgTypeTree = data?.data ?? [];
      });
    },
  });

  /**
   * @runGetRegionTree 获取区域树
   */
  const runGetRegionTree = useImmerApi(get_region_tree, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.regionTree = data?.data ?? [];
      });
    },
  });

  /**
   * @runSaveOrgType 新增机构分类
   */
  const runSaveOrgType = useImmerApi(save_org_type, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditClassifyModal();
        logic.getOrgTypeTree();
        message.success("新增成功");
      } else {
        message.error(data?.msg ?? "新增失败");
      }
    },
  });

  /**
   * @runUpdateOrgType 修改机构分类
   */
  const runUpdateOrgType = useImmerApi(update_org_type, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditClassifyModal();
        logic.getOrgTypeTree();
        message.success("修改成功");
      } else {
        message.error(data?.msg ?? "修改失败");
      }
    },
  });
  /**
   * @runDeleteOrgType 删除机构分类
   */
  const runDeleteOrgType = useImmerApi(delete_org_type, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.getOrgTypeTree();
        message.success("删除成功");
      } else {
        message.error(data?.msg ?? "删除失败");
      }
    },
  });

  /**
   * @runSaveOrg 新增机构
   */
  const runSaveOrg = useImmerApi(save_org, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditModal();
        logic.getData();
        message.success("新增成功");
      } else {
        message.error(data?.msg ?? "新增失败");
      }
      setState((o) => {
        o.loading = false;
      });
    },
    onError() {
      setState((o) => {
        o.loading = false;
      });
    },
  });

  /**
   * @runUpdateOrg 修改机构
   */
  const runUpdateOrg = useImmerApi(update_org, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        logic.closeEditModal();
        logic.getData();
        message.success("修改成功");
      } else {
        message.error(data?.msg ?? "修改失败");
      }
      setState((o) => {
        o.loading = false;
      });
    },
    onError() {
      setState((o) => {
        o.loading = false;
      });
    },
  });
  /**
   * @runGetOrgDetail 获取机构详情
   */
  const runGetOrgDetail = useImmerApi(get_org_detail, {
    onSuccess(value) {
      const { data } = value;
      const res = {
        ...data.data,
        establishYear: data.data.establishYear
          ? dayjs().year(data.data.establishYear)
          : undefined,
        operatingDateStart: data.data.operatingDateStart
          ? dayjs(data.data.operatingDateStart)
          : undefined,
        operatingDateEnd: data.data.operatingDateEnd
          ? dayjs(data.data.operatingDateEnd)
          : undefined,
        operatingTimeStart: data.data.operatingTimeStart
          ? dayjs(data.data.operatingTimeStart, "HH:mm:ss")
          : undefined,
        operatingTimeEnd: data.data.operatingTimeEnd
          ? dayjs(data.data.operatingTimeEnd, "HH:mm:ss")
          : undefined,
      };
      editForm.setFieldsValue(res);
    },
  });

  const logic = useMethods({
    /**
     * @getData 获取机构列表
     */
    getData() {
      runGetData.run({
        size: state.pageSize,
        page: state.current,
        enableFlag: true,
      });
    },
    /**
     * @getDataByTypeKey 跟进左侧菜单分类，获取当前选中分类的机构列表
     */
    getDataByTypeKey(key: string) {
      runGetData.run({
        size: state.pageSize,
        page: state.current,
        orgType: key,
        enableFlag: true,
      });
      setState((d) => {
        d.orgType = key;
      });
    },
    /**
     * @getOrgTypeTree 获取机构分类树
     */
    getOrgTypeTree() {
      runGetOrgTypeTree.run();
    },
    /**
     * @getRegionTree 获取区域树
     */
    getRegionTree() {
      const request = {
        maxLevel: 2,
      };
      runGetRegionTree.run(request);
    },
    /**
     * @saveOrgType 新增机构分类
     */
    saveOrgType() {
      const values = editClassifyForm.getFieldsValue();
      runSaveOrgType.run(values);
    },
    /**
     * @updateOrgType 修改机构分类
     */
    updateOrgType() {
      const values = editClassifyForm.getFieldsValue();
      const request = {
        ...values,
        id: state.updateClassifyModalData.key,
      };
      runUpdateOrgType.run(request);
    },
    /**
     * @deleteOrgType 删除机构分类
     */
    runDeleteOrgType(node: any) {
      runDeleteOrgType.run({
        idList: [node.key],
      });
    },
    /**
     * @getOrgDetail 获取机构详情
     */
    getOrgDetail(id: number) {
      runGetOrgDetail.run({ id });
    },
    /**
     * @reset 重置条件搜索
     */
    reset() {
      form.resetFields();
      const request = {
        size: state.pageSize,
        page: 1,
        enableFlag: true,
        orgType: state.orgType,
      };
      setState((d) => {
        d.current = 1;
      });
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
     * @handleGetChangeAndSearchData 条件搜索、table 分页改变统一回调
     */
    handleGetChangeAndSearchData(page?: number, pageSize?: number) {
      const values = form.getFieldsValue();
      const request: { [key: string]: any } = {
        size: pageSize ?? state.pageSize,
        page: page ?? state.current,
        enableFlag: true,
        orgType: state.orgType,
        ...values,
      };
      runGetData.run(deleteEmptyKey(request), true);
    },
    /**
     * @onChangePageSize table 分页改变
     */
    onChangePageSize(page: number, pageSize: number) {
      setState((d) => {
        d.pageSize = pageSize;
        d.current = page;
      });
      logic.handleGetChangeAndSearchData(page, pageSize);
    },
    /** @function 获取表单数据 */
    async getFormData() {
      const res = await editForm.validateFields();
      setState((o) => {
        o.loading = true;
      });
      const logoImg = await toUpload(res.logoImg);

      if (!logoImg) {
        setState((o) => {
          o.loading = false;
        });
        return;
      }
      const businessLicenseImg = await toUpload(res.businessLicenseImg);
      if (!businessLicenseImg) {
        setState((o) => {
          o.loading = false;
        });
        return;
      }
      const authCertificateImg = await toUpload(res.authCertificateImg);
      if (!authCertificateImg) {
        setState((o) => {
          o.loading = false;
        });
        return;
      }
      const honorCertificateImg = await toUpload(res.honorCertificateImg);
      if (!honorCertificateImg) {
        setState((o) => {
          o.loading = false;
        });
        return;
      }
      const medicalLicenseImg = await toUpload(res.medicalLicenseImg);
      if (!medicalLicenseImg) {
        setState((o) => {
          o.loading = false;
        });
        return;
      }
      const environmentImg = await toUpload(res.environmentImg);
      if (!environmentImg) {
        setState((o) => {
          o.loading = false;
        });
        return;
      }

      return {
        ...res,
        establishYear: dayjs(res.establishYear).format("YYYY"),
        operatingDateStart: dayjs(res.operatingDateStart).format("YYYY-MM-DD"),
        operatingDateEnd: dayjs(res.operatingDateEnd).format("YYYY-MM-DD"),
        operatingTimeStart: dayjs(res.operatingTimeStart).format("HH:mm:ss"),
        operatingTimeEnd: dayjs(res.operatingTimeEnd).format("HH:mm:ss"),
        logoImg,
        businessLicenseImg,
        authCertificateImg,
        honorCertificateImg,
        medicalLicenseImg,
        environmentImg,
      };
    },
    /**
     * @addModalSubmit 新增机构
     */
    async addModalSubmit() {
      const res = await logic.getFormData();
      runSaveOrg.run(res);
    },
    /**
     * @updateModalSubmit 修改机构
     */
    async updateModalSubmit() {
      const res = await logic.getFormData();
      runUpdateOrg.run({
        ...res,
        id: state.updateModalData.id,
      });
    },
    /**
     * @openEditModalCreate 打开新增机构弹窗
     */
    openEditModalCreate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = true;
      });
      editForm.setFieldsValue({
        enableFlag: true,
        ...(state.orgType
          ? {
              orgType: state.orgType,
            }
          : {}),
      });
    },
    /**
     * @openEditModalCreate 关闭新增、编辑机构弹窗
     */
    closeEditModal() {
      setState((d) => {
        d.editModalVisible = false;
      });
    },
    /**
     * @openEditModalUpdate 打开编辑机构弹窗
     */
    openEditModalUpdate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = false;
      });
    },
    /**
     * @setUpdateModalData 记录 table 当前项 record
     */
    setUpdateModalData(data: any) {
      setState((d) => {
        d.updateModalData = data;
      });
    },
    /**
     * @setUpdateClassifyModalData 记录分类树当前项 record
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
     * @openEditClassifyModalUpdate 关闭新增、编辑分类弹窗
     */
    closeEditClassifyModal() {
      setState((d) => {
        d.editClassifyModalVisible = false;
      });
    },
  });
  /**
   * @columns 机构管理 table columns
   */
  const columns = useColumns({ logic } as any);
  /**
   * @form 机构管理 table 条件搜索 form
   */
  const form = Form.useForm()[0];
  /**
   * @editForm 新增、编辑机构弹窗 form
   */
  const editForm = Form.useForm()[0];
  /**
   * @editClassifyForm 新增、编辑分类弹窗 form
   */
  const editClassifyForm = Form.useForm()[0];
  return {
    state,
    form,
    logic,
    api: {
      runGetData,
      runSaveOrgType,
      runUpdateOrgType,
      runSaveOrg,
      runUpdateOrg,
      runGetOrgDetail,
    },
    columns,
    editForm,
    editClassifyForm,
  };
}

export const { useSelector, Provider } = createStore(OrgManagerStore);
