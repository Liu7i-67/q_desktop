import { useCol } from "@/pages/basic/dictionary/columns";
import { useCol as configCol } from "@/pages/basic/dictionary/components/dict-config-drawer/columns";
import {
  get_dict_value,
  get_page,
  save,
  save_dict_value,
  update,
  update_dict_value,
} from "@/pages/basic/dictionary/service";
import { deleteEmptyKey } from "@/utils/tools";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";

function DictionaryStore() {
  const form = Form.useForm()[0];

  const [state, setState] = useImmer({
    /**
     * @dataSource 字典配置 table 数据源
     */
    dataSource: [] as any[],
    /**
     * @total 字典配置 table 分页总数
     */
    total: 0,
    /**
     * @current 字典配置 table 分页current
     */
    current: 1,
    /**
     * @pageSize 字典配置 table 分页pageSize
     */
    pageSize: 20,
    /**
     * @addModalVisible 新增字典弹窗显隐控制
     */
    addModalVisible: false,
    /**
     * @editDictId 当前编辑的字典
     */
    editDictId: "",
    /**
     * @currentEditName 当前配置的字典名称
     */
    currentEditName: "",
    /**
     * @currentEditCode 当前配置的字典编码
     */
    currentEditCode: "",
    /**
     * @dictValuePage 字典配置页码
     */
    dictValuePage: 1,
    /**
     * @dictValueSize 字典配置展示数量
     */
    dictValueSize: 20,
    /**
     * @dictValueDrawerVisible 字典配置显隐
     */
    dictValueDrawerVisible: false,
    /**
     * @addDictValueModalVisible 新增字典值弹窗
     */
    addDictValueModalVisible: false,
    /**
     * @dictValueRecord 字典值表格
     */
    dictValueRecord: [] as any[],
    /**
     * @editDictValueId 编辑字典值id
     */
    editDictValueId: "",
  });

  /**
   * @runGetData 分页查询字典
   */
  const runGetData = useImmerApi(get_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.dataSource = data?.data?.records ?? [];
        x.total = data?.data?.total ?? 0;
      });
    },
  });

  /**
   * @runSave 保存字典
   */
  const runSave = useImmerApi(save, {
    onSuccess: (value) => {
      const { data } = value;
      if (data?.data !== true) {
        message.error("保存失败");
        return;
      }
      message.success("保存成功");
      logic.closeAddModal();
    },
  });

  /**
   * @runUpdateDictValue 更新字典值
   */
  const runUpdateDictValue = useImmerApi(update_dict_value, {
    onSuccess: (value) => {
      if (value?.data?.data !== true) {
        return;
      }
      message.success("保存成功");
      logic.closeDictValueModal();
    },
  });

  /**
   * @runSaveDictValue 保存字典值
   */
  const runSaveDictValue = useImmerApi(save_dict_value, {
    onSuccess(value) {
      const { data } = value;
      if (data?.data !== true) {
        message.error("保存字典值失败");
        return;
      }
      message.success("保存字典值成功");
      logic.closeDictValueModal();
    },
  });

  /**
   * @runGetDictValue 字典值集合
   */
  const runGetDictValue = useImmerApi(get_dict_value, {
    onSuccess(value) {
      console.log("value----: ", value?.data);

      setState((x) => {
        x.dictValueRecord = value?.data?.data ?? [];
      });
    },
  });

  /**
   * @runUpdate 编辑字典
   */
  const runUpdate = useImmerApi(update, {
    onSuccess: (value) => {
      const { data } = value;
      if (data?.data !== true) {
        message.error("保存失败");
        return;
      }
      message.success("保存成功");
      logic.closeAddModal();
    },
  });

  const logic = useMethods({
    /**
     * @getData 获取字典配置 table 数据
     */
    getData() {
      runGetData.run();
    },
    /**
     * @reset 重置条件查询
     */
    reset() {
      form.resetFields();
      const request = {
        size: state.pageSize,
        page: 1,
      };
      setState((d) => {
        (d.current = 1), (d.pageSize = 20);
      });
      runGetData.run(request, true);
    },
    /**
     * @handleSearch 执行搜索
     * @param page
     * @param pageSize
     */
    handleSearch() {
      setState((d) => {
        d.current = 1;
      });
      logic.handleGetChangeAndSearchData(1);
    },
    /**
     * @handleGetChangeAndSearchData 字典配置 条件搜索、table 分页改变统一回调逻辑
     */
    handleGetChangeAndSearchData(page?: number, pageSize?: number) {
      const { dictName, dictCode } = form.getFieldsValue();
      const request = {
        size: pageSize ?? state.pageSize,
        page: page ?? state.current,
        dictName: dictName,
        dictCode: dictCode,
      };
      // 发起请求
      runGetData.run(deleteEmptyKey(request));
    },
    /**
     * @onDictTableChange 字典配置表格分页改变
     */
    onDictTableChange(page: number, size: number) {
      setState((x) => {
        x.current = page;
        x.pageSize = size;
      });
      logic.handleGetChangeAndSearchData(page, size);
    },
    /**
     * @openAddModal 打开新增字典弹窗
     */
    openAddModal() {
      setState((d) => {
        d.addModalVisible = true;
      });
      addForm.setFieldValue("enableFlag", true);
    },
    /**
     * @openEditModal 打开编辑弹窗
     * @param editDictId
     * @param dictCode
     * @param dictName
     * @param memo
     */
    openEditModal(data: Record<string, any>) {
      const { editDictId, dictCode, dictName, memo = "", enableFlag } = data;
      setState((d) => {
        d.editDictId = editDictId;
        d.addModalVisible = true;
      });
      addForm.setFieldsValue({
        dictName,
        dictCode,
        enableFlag,
        memo,
      });
    },
    /**
     * @closeAddModal 关闭新增字典弹窗
     */
    closeAddModal() {
      addForm.resetFields();
      setState((d) => {
        d.addModalVisible = false;
        d.editDictId = "";
      });
    },
    /**
     * @addModalSubmit 提交新增字典
     */
    addModalSubmit() {
      if (state.editDictId !== "") {
        message.error("参数错误");
        return;
      }
      addForm.validateFields().then((res) => {
        runSave.run(res).then(() => {
          this.handleSearch();
        });
      });
    },
    /**
     * @editModalSubmit 编辑字典
     */
    editModalSubmit() {
      if (state.editDictId === "") {
        message.error("关联字典失败");
        return;
      }
      addForm.validateFields().then((res) => {
        const request = {
          id: state.editDictId,
          ...res,
        };
        runUpdate.run(request).then(() => {
          this.handleSearch();
        });
      });
    },
    /**
     * @getDictValue 查询字典配置表格
     * @param page
     * @param pageSize
     */
    getDictValue(page: number = 1, pageSize: number = state.pageSize) {
      if (state.currentEditCode === "") {
        message.warning("没有找到对应code");
        return;
      }
      setState((d) => {
        d.dictValuePage = page;
        d.dictValueSize = pageSize;
      });
      const request = {
        page: page,
        size: pageSize,
        dictCode: state.currentEditCode,
      };
      runGetDictValue.run(request);
    },
    /**
     * @openDictValueDrawer 打开字典配置
     * @param dictCode
     * @param dictName
     */
    openDictValueDrawer(dictCode: string, dictName: string) {
      setState((d) => {
        d.currentEditName = dictName;
        d.currentEditCode = dictCode;
        d.dictValueDrawerVisible = true;
      });
    },
    /**
     * @closeDictValueDrawer 关闭字典配置
     */
    closeDictValueDrawer() {
      setState((d) => {
        d.currentEditName = "";
        d.currentEditCode = "";
        d.dictValueDrawerVisible = false;
      });
    },
    /**
     * @openDictValueModal 打开新增字典配置
     */
    openDictValueModal() {
      setState((d) => {
        d.addDictValueModalVisible = true;
      });
      addDictValueForm.setFieldValue("enableFlag", true);
    },
    /**
     * @closeDictValueModal 关闭新增字典配置
     */
    closeDictValueModal() {
      addDictValueForm.resetFields();
      setState((d) => {
        d.editDictValueId = "";
        d.addDictValueModalVisible = false;
      });
    },
    /**
     * @addDictValue 新增字典值
     */
    addDictValue() {
      if (state.currentEditCode === "") {
        message.warning("关联字典异常");
        return;
      }
      addDictValueForm.validateFields().then((res) => {
        const request = {
          dictCode: state.currentEditCode,
          ...res,
        };
        runSaveDictValue.run(request).then(() => {
          this.getDictValue(state.dictValuePage, state.dictValueSize);
        });
      });
    },
    /**
     * @openEditDictValue 编辑字典值
     */
    openEditDictValue(data: Record<string, any>) {
      const { id, dictCode, dictName, dictValue, memo = "", enableFlag } = data;
      setState((d) => {
        d.editDictValueId = id;
        d.addDictValueModalVisible = true;
      });
      addDictValueForm.setFieldsValue({
        dictCode,
        dictName,
        dictValue,
        enableFlag,
        memo,
      });
    },
    /**
     * @editDictValue 编辑字典值
     */
    editDictValue() {
      if (state.editDictValueId === "") {
        message.warning("关联字典值失败");
        return;
      }
      addDictValueForm.validateFields().then((res) => {
        const request = {
          id: state.editDictValueId,
          dictCode: state.currentEditCode,
          ...res,
        };
        runUpdateDictValue.run(request).then(() => {
          this.getDictValue(state.dictValuePage, state.dictValueSize);
        });
      });
    },
  });
  /**
   * @columns 字典配置 table columns
   */
  const columns = useCol(logic);
  /**
   * @columns 新增、编辑字典弹窗 form
   */
  const addForm = Form.useForm()[0];
  /**
   * @configColumns 字典配置抽屉 table columns
   */
  const configColumns = configCol(logic);
  /**
   * @configColumns 字典配置抽屉新增、编辑字典 form
   */
  const addDictValueForm = Form.useForm()[0];
  return {
    state,
    form,
    addForm,
    logic,
    api: {
      runGetData,
      runSave,
      runUpdate,
      runGetDictValue,
      runUpdateDictValue,
      runSaveDictValue,
    },
    columns,
    configColumns,
    addDictValueForm,
  };
}

export const { useSelector, Provider } = createStore(DictionaryStore);
