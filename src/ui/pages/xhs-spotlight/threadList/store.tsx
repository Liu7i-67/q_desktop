import { createStore } from "@quarkunlimit/tiny";
import { Form, message } from "antd";
import { useMethods } from "@quarkunlimit/react-hooks";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useCol } from "./column";
import { export_xhs_leads, get_xhs_leads_page } from "./service";
import { get_channel_page } from "@/pages/customerLead/service";
import { deleteEmptyKey } from "@/utils/tools";

function ThreadListStore() {
  /**
   * @form 条件查询 form
   */
  const form = Form.useForm()[0];

  const [state, setState] = useImmer({
    /**
     * @dataSource 线索列表 table 数据源
     */
    dataSource: [] as any[],
    /**
     * @channel 私信接收人下拉框数据
     */
    channel: [] as any[],
    /**
     * @total 线索列表 table 分页 total
     */
    total: 0,
    /**
     * @current  线索列表 table 分页 current
     */
    current: 1,
    /**
     * @pageSize  线索列表 table 分页 pageSize
     */
    pageSize: 20,
    /**
     * @channelTotal  私信接收人下拉框 分页 total
     */
    channelTotal: 0,
    /**
     * @channelCurrent  私信接收人下拉框 分页 current
     */
    channelCurrent: 1,
    /**
     * @channelPageSize  私信接收人下拉框 分页 pageSize
     */
    channelPageSize: 20,
  });
  /**
   * @runGetData  获取线索列表数据
   */
  const runGetData = useImmerApi(get_xhs_leads_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        const pre = Date.now();
        x.dataSource = (data?.data?.records ?? []).map(
          (item: any, index: number) => {
            return {
              ...item,
              key: `${index}_${pre}`,
            };
          }
        );
        x.total = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runGetChannelData  获取私信接收人下拉框数据
   */
  const runGetChannelData = useImmerApi(get_channel_page, {
    onSuccess(value) {
      const { data } = value;
      setState((x) => {
        x.channel = [...x.channel, ...(data?.data?.records ?? [])];
        x.channelTotal = data?.data?.total ?? 0;
      });
    },
  });
  /**
   * @runExportXhsLeads  导出 excel
   */
  const runExportXhsLeads = useImmerApi(export_xhs_leads, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        if (data.data?.fileDTO?.fullPath) {
          const link = document.createElement("a");
          link.href = data.data.fileDTO.fullPath;
          link.download =
            data.data.fileDTO.fileName || "小红书聚光线索导出.xlsx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          message.success("导出成功");
        } else if (data.data.exportAsync) {
          message.warning("本次操作后台处理中，请稍后到下载中心下载");
        } else if (data.data.noDataFlag) {
          message.warning("暂无数据");
        } else {
          message.error(data.msg);
        }
      } else {
        message.error(data.msg);
      }
    },
  });

  const logic = useMethods({
    /**
     * @getData 获取线索列表 table 数据
     */
    getData() {
      runGetData.run();
    },
    /**
     * @getChannelData 获取私信接收人下拉框数据
     */
    getChannelData() {
      runGetChannelData.run(
        {
          size: state.channelPageSize,
          page: state.channelCurrent,
          enableFlag: true,
        },
        true
      );
    },
    /**
     * @exportXhsLeads 导出 excel
     */
    exportXhsLeads() {
      const values = form.getFieldsValue();
      const request: { [key: string]: any } = {
        ...values,
        leadsTagList: values.leadsTagList?.join(","),
        channelIdList: values.channelIdList?.join(","),
        timeStart: values.createTime?.[0]
          ?.startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        timeEnd: values.createTime?.[1]
          ?.endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
      };
      delete request.createTime;
      // 移除空值
      Object.keys(request).forEach(
        (key) =>
          (request[key] === undefined || request[key] === "") &&
          delete request[key]
      );
      runExportXhsLeads.run(request);
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
     * @handleGetChangeAndSearchData 条件搜索、线索列表table 分页改变统一回调逻辑
     */
    handleGetChangeAndSearchData(page: number, pageSize?: number) {
      const values = form.getFieldsValue();
      const request: { [key: string]: any } = {
        size: pageSize ?? state.pageSize,
        page: page ?? state.current,
        ...values,
        leadsTagList: values.leadsTagList?.join(","),
        channelIdList: values.channelIdList?.join(","),
        timeStart: values.createTime?.[0]
          ?.startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        timeEnd: values.createTime?.[1]
          ?.endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
      };
      delete request.createTime;
      runGetData.run(deleteEmptyKey(request), true);
    },
    /**
     * @onChannelScroll 私信接收人下拉框滚动加载
     */
    onChannelScroll(page: number) {
      setState((d) => {
        d.channelCurrent = page;
      });
      runGetChannelData.run({
        size: state.channelPageSize,
        page,
        enableFlag: true,
      });
    },
    /**
     * @handleChannelSearch 搜索私信接收人
     */
    handleChannelSearch(value: string) {
      setState((d) => {
        d.channelCurrent = 1;
      });
      runGetChannelData.run({
        size: state.channelPageSize,
        page: 1,
        channelName: value,
        enableFlag: true,
      });
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
    /**
     * @setChannelList 设置私信接收人
     */
    setChannelList(data: any[]) {
      setState((d) => {
        d.channel = data;
      });
    },
    /**
     * @setChannelCurrent 设置私信接收人下拉框分页 current
     */
    setChannelCurrent(data: number) {
      setState((d) => {
        d.channelCurrent = data;
      });
    },
  });
  /**
   * @columns 线索列表 table columns
   */
  const columns = useCol();
  return {
    state,
    form,
    logic,
    api: {
      runGetData,
      runGetChannelData,
      runExportXhsLeads,
    },
    columns,
  };
}

export const { useSelector, Provider } = createStore(ThreadListStore);
