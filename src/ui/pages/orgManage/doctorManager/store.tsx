import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import { useMethods } from "@quarkunlimit/react-hooks";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useColumns } from "./columns";
import {
  delete_doctor,
  get_doctor_detail,
  get_doctor_page,
  save_doctor,
  update_doctor,
} from "./service";
import { get_dict_value } from "@/pages/basic/dictionary/service";
import {
  get_org_tree,
  get_project_tree,
} from "@/pages/customerManage/myCustomer/service";
import dayjs from "dayjs";
import { toUpload } from "@/utils/upload";

function DoctorStore() {
  const form = Form.useForm()[0];

  const [state, setState] = useImmer({
    dataSource: [] as any[],
    dictValue: [] as any[],
    projectTree: [] as any[],
    orgTree: [] as any[],
    total: 0,
    current: 1,
    pageSize: 20,
    editModalVisible: false,
    isCreate: false,
    updateModalId: "",
    uploadLoading: false,
  });

  const runGetData = useImmerApi(get_doctor_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.dataSource = data?.data?.records ?? [];
        x.total = data?.data?.total ?? 0;
      });
    },
  });

  const runGetDictValue = useImmerApi(get_dict_value, {
    onSuccess(value) {
      setState((x) => {
        x.dictValue = value?.data?.data ?? [];
      });
    },
  });

  const runGetProjectTree = useImmerApi(get_project_tree, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.projectTree = data?.data ?? [];
      });
    },
  });

  const runGetOrgTree = useImmerApi(get_org_tree, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.orgTree = data?.data ?? [];
      });
    },
  });

  const runSaveDoctor = useImmerApi(save_doctor, {
    onSuccess(value) {
      const { data } = value;
      if (data?.code === 200) {
        // 重置列表
        logic.reset();
        // 关闭弹窗
        logic.closeEditModal();
        // 提示
        message.success("新增成功");
      } else {
        message.error(data?.msg ?? "新增失败");
      }
      setState((o) => {
        o.uploadLoading = false;
      });
    },
    onError() {
      setState((o) => {
        o.uploadLoading = false;
      });
    },
  });

  const runUpdateDoctor = useImmerApi(update_doctor, {
    onSuccess(value) {
      const { data } = value;
      if (data?.code === 200) {
        // 重置列表
        logic.reset();
        // 关闭弹窗
        logic.closeEditModal();
        // 提示
        message.success("编辑成功");
      } else {
        message.error(data?.msg ?? "编辑失败");
      }
      setState((o) => {
        o.uploadLoading = false;
      });
    },
    onError() {
      setState((o) => {
        o.uploadLoading = false;
      });
    },
  });

  const runDeleteDoctor = useImmerApi(delete_doctor, {
    onSuccess(value) {
      const { data } = value;
      if (data?.code === 200) {
        // 重置列表
        logic.reset();
        // 提示
        message.success("删除成功");
      } else {
        message.error(data?.msg ?? "删除失败");
      }
    },
  });

  const runGetDoctorDetail = useImmerApi(get_doctor_detail, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200 && data.data) {
        const res = {
          ...data.data,
          hireDate: data.data.hireDate ? dayjs(data.data.hireDate) : undefined,
          relationOrgIdList: data.data.orgInfoList?.map((x: any) => x.id) ?? [],
        };
        editForm.setFieldsValue(res);
      } else {
        message.error(data.msg);
      }
    },
  });

  const logic = useMethods({
    getData() {
      runGetData.run({
        size: state.pageSize,
        page: state.current,
      });
    },
    getDictValue() {
      runGetDictValue.run({
        dictCode: "diploma",
      });
    },
    getProjectTree() {
      runGetProjectTree.run({
        enableFlag: true,
      });
    },
    getOrgTree() {
      runGetOrgTree.run({ maxLevel: 2, enableFlag: true });
    },
    getDoctorDetail() {
      runGetDoctorDetail.run({ id: state.updateModalId });
    },
    deleteDoctor(idList: string[]) {
      runDeleteDoctor.run({ idList });
    },
    reset() {
      form.resetFields();
      const request = {
        size: state.pageSize,
        page: 1,
      };
      runGetData.run(request, true);
    },
    handleSearch() {
      const values = form.getFieldsValue();
      runGetData.run(
        {
          size: state.pageSize,
          page: state.current,
          doctorName: values.doctorName,
          licenseNo: values.licenseNo,
          orgIdList: values.orgIdList,
        },
        true
      );
    },
    onChangePageSize(page: number, pageSize: number) {
      const values = form.getFieldsValue();
      setState((d) => {
        d.pageSize = pageSize;
        d.current = page;
      });
      const request: { [key: string]: any } = {
        size: pageSize,
        page: page,
        doctorName: values.doctorName,
        licenseNo: values.licenseNo,
        orgIdList: values.orgIdList,
      };
      // 移除空值
      Object.keys(request).forEach(
        (key) =>
          (request[key] === undefined || request[key] === "") &&
          delete request[key]
      );
      runGetData.run(request);
    },
    async getFormData() {
      const res = await editForm.validateFields();
      setState((o) => {
        o.uploadLoading = true;
      });
      const doctorImg = await toUpload(res.doctorImg);

      if (!doctorImg) {
        setState((o) => {
          o.uploadLoading = false;
        });
        return;
      }
      const licenseImg = await toUpload(res.licenseImg);
      if (!licenseImg) {
        setState((o) => {
          o.uploadLoading = false;
        });
        return;
      }
      const professionalTitleImg = await toUpload(res.professionalTitleImg);
      if (!professionalTitleImg) {
        setState((o) => {
          o.uploadLoading = false;
        });
        return;
      }
      const qualificationImg = await toUpload(res.qualificationImg);
      if (!qualificationImg) {
        setState((o) => {
          o.uploadLoading = false;
        });
        return;
      }

      return {
        ...res,
        hireDate: dayjs(res.hireDate).toISOString(),
        doctorImg,
        licenseImg,
        professionalTitleImg,
        qualificationImg,
      };
    },

    async addModalSubmit() {
      const res = await logic.getFormData();

      runSaveDoctor.run({
        ...res,
      });
    },
    async updateModalSubmit() {
      const data = await logic.getFormData();
      runUpdateDoctor.run({
        ...data,
        id: state.updateModalId,
      });
    },
    openEditModalCreate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = true;
      });
    },
    closeEditModal() {
      setState((d) => {
        d.editModalVisible = false;
      });
    },
    openEditModalUpdate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = false;
      });
    },
    setUpdateModalId(id: string) {
      setState((d) => {
        d.updateModalId = id;
      });
    },
  });
  const columns = useColumns({ logic, runDeleteDoctor } as any);
  const editForm = Form.useForm()[0];
  return {
    state,
    form,
    logic,
    api: {
      runGetData,
      runSaveDoctor,
      runUpdateDoctor,
      runGetDoctorDetail,
    },
    columns,
    editForm,
  };
}

export const { useSelector, Provider } = createStore(DoctorStore);
