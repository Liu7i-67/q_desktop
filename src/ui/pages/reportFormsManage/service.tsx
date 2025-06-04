import { Service } from "@/utils/Axios";

/**
 * @get_panel_data 获取仪表盘数据
 */
export const get_panel_data = async (params: any) => {
  return Service.post(`/api/report/v1/report/${params.code}/meter-data`, {
    data: params.request,
  });
};

/**
 * @get_report_pagination 获取报表分页数据
 */
export const get_report_pagination = async (params: any) => {
  return Service.post(`/api/report/v1/report/${params.code}/pagination`, {
    data: params.request,
  });
};

/**
 * @get_panel_data 导出报表
 */
export const get_export = (params: { code: string; data: any }) => {
  return Service.post(`/api/report/v1/report/${params.code}/export`, {
    data: params.data,
  });
};
/**
 * @get_channel_group 获取渠道分组分页数据
 */
export const get_channel_group = (params: any) => {
  return Service.get(`/api/base/v1/channel-group/get-page`, {
    params,
  });
};
