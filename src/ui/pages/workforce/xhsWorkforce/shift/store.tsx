import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import { useMethods } from "@quarkunlimit/react-hooks";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { IRecord, useColumns } from "./columns";
import {
  delete_shift,
  get_shift_page,
  save_shift,
  update_shift,
} from "./service";
import { timeQuantum2system } from "@/utils/tools";

function ShiftStore() {
  const [state, setState] = useImmer({
    /**
     * @dataSource 班次管理 table 数据源
     */
    dataSource: [] as any[],
    /**
     * @current 班次管理 table current
     */
    current: 1,
    /**
     * @pageSize 班次管理 table pageSize
     */
    pageSize: 50,
    /**
     * @editModalVisible 新增、编辑班次弹窗显示隐藏
     */
    editModalVisible: false,
    /**
     * @isCreate 是否是新增班次
     */
    isCreate: false,
    /**
     * @updateModalData 记录班次管理 table 当前项 record
     */
    updateModalData: {} as Partial<IRecord>,
  });

  /**
   * @runGetData 获取班次列表
   */
  const runGetData = useImmerApi(get_shift_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.dataSource = data?.data ?? [];
      });
    },
  });
  /**
   * @runSaveShift 新增班次
   */
  const runSaveShift = useImmerApi(save_shift, {
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
    },
  });
  /**
   * @runUpdateShift 修改班次
   */
  const runUpdateShift = useImmerApi(update_shift, {
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
    },
  });
  /**
   * @runDeleteShift 删除班次
   */
  const runDeleteShift = useImmerApi(delete_shift, {
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

  const logic = useMethods({
    /**
     * @getData 获取班次
     */
    getData() {
      runGetData.run({
        size: state.pageSize,
        page: state.current,
        scheduleType: "LITTLE_RED_BOOK",
      });
    },
    /**
     * @deleteShift 删除班次
     */
    deleteShift(idList: string[]) {
      runDeleteShift.run({ idList });
    },
    /**
     * @reset 重置条件搜索
     */
    reset() {
      const request = {
        size: state.pageSize,
        page: 1,
        scheduleType: "LITTLE_RED_BOOK",
      };
      runGetData.run(request, true);
    },
    /**
     * @addModalSubmit 新增班次
     */
    addModalSubmit() {
      editForm.validateFields().then((res) => {
        let startTime = res.timeSlot?.[0]?.format?.("HH:mm:ss");
        let endTime = res.timeSlot?.[1]?.format?.("HH:mm:ss");
        if (startTime === endTime) {
          message.error("开始时间和结束时间不能相同");
          return;
        }

        const request = {
          ...res,
          startTime,
          endTime,
          timeSlot: undefined,
          frontendExtension:
            typeof res.frontendExtension === "string"
              ? res.frontendExtension
              : `#${res.frontendExtension?.toHex?.()}`,
        };
        runSaveShift.run(request);
      });
    },
    /**
     * @updateModalSubmit 编辑班次
     */
    updateModalSubmit() {
      editForm.validateFields().then((res) => {
        let startTime = res.timeSlot?.[0]?.format?.("HH:mm:ss");
        let endTime = res.timeSlot?.[1]?.format?.("HH:mm:ss");
        if (startTime === endTime) {
          message.error("开始时间和结束时间不能相同");
          return;
        }
        const request = {
          ...res,
          startTime,
          endTime,
          timeSlot: undefined,
          id: state.updateModalData.id,
          frontendExtension:
            typeof res.frontendExtension === "string"
              ? res.frontendExtension
              : `#${res.frontendExtension?.toHex?.()}`,
        };
        runUpdateShift.run(request);
      });
    },
    /**
     * @openEditModalCreate 打开新增班次弹窗
     */
    openEditModalCreate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = true;
      });
    },
    /**
     * @closeEditModal 关闭新增、编辑班次弹窗
     */
    closeEditModal() {
      setState((d) => {
        d.editModalVisible = false;
      });
    },
    /**
     * @openEditModalUpdate 打开编辑班次弹窗
     */
    openEditModalUpdate() {
      setState((d) => {
        d.editModalVisible = true;
        d.isCreate = false;
      });
    },
    /**
     * @setUpdateModalData 记录班次管理 table 当前项 record
     */
    setUpdateModalData(data: any) {
      setState((d) => {
        d.updateModalData = data;
      });
    },
  });
  /**
   * @columns 班次管理 table columns
   */
  const columns = useColumns({ logic, runDeleteShift } as any);
  /**
   * @editForm 新增、编辑班次 form
   */
  const editForm = Form.useForm()[0];
  return {
    state,
    logic,
    api: {
      runGetData,
      runSaveShift,
      runUpdateShift,
      runDeleteShift,
    },
    columns,
    editForm,
  };
}

export const { useSelector, Provider } = createStore(ShiftStore);
