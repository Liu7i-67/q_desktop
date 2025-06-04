import { createStore } from "@quarkunlimit/tiny";
import { useMethods } from "@quarkunlimit/react-hooks";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { Form } from "antd";
import { get_export_file_page } from "./service";
import { useColumns } from "./cloumn";

function DownloadStore() {
  const [state, setState] = useImmer({
    /**
     * @dataSource 下载中心 table 数据源
     */
    dataSource: [] as any[],
    /**
     * @total 下载中心 table 分页 total
     */
    total: 0,
    /**
     * @current 下载中心 table 分页 current
     */
    current: 1,
    /**
     * @pageSize 下载中心 table 分页 pageSize
     */
    pageSize: 20,
  });
  /**
   * @runGetData 分页查询下载中心数据
   */
  const runGetData = useImmerApi(get_export_file_page, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        setState((x) => {
          x.dataSource = data.data.records;
          x.total = data.data.total;
        });
      }
    },
  });

  const logic = useMethods({
    /**
     * @getData 获取下载中心 table 数据
     */
    getData() {
      runGetData.run({
        page: state.current,
        pageSize: state.pageSize,
      });
    },
    /**
     * @onChangePageSize 下载中心 table 分页改变
     */
    onChangePageSize(page: number, pageSize: number) {
      setState((d) => {
        d.pageSize = pageSize;
        d.current = page;
      });
      runGetData.run({
        page,
        pageSize,
      });
    },
    /**
     * @onSearch 条件查询
     */
    onSearch() {
      const value = form.getFieldsValue();
      const request = {
        page: state.current,
        pageSize: state.pageSize,
        ...value,
      };

      // 移除空值
      Object.keys(request).forEach((key) => {
        if (request[key] === undefined) {
          delete request[key];
        }
      });

      runGetData.run(request, true);
    },
    /**
     * @reset 重置条件查询
     */
    reset() {
      form.resetFields();
      runGetData.run(
        {
          page: 1,
          pageSize: state.pageSize,
        },
        true
      );
    },
  });
  /**
   * @columns 下载中心 table columns
   */
  const columns = useColumns();
  /**
   * @form 条件查询 form
   */
  const form = Form.useForm()[0];

  return {
    state,
    logic,
    form,
    api: {
      runGetData,
    },
    columns,
  };
}

export const { useSelector, Provider } = createStore(DownloadStore);
