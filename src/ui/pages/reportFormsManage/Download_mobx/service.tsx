import { Service } from "@/utils/Axios";

/**
 * @get_export_file_page 分页查询文件导出结果
 */
export const get_export_file_page = (params: {
  page?: number;
  size?: number;
}) => {
  return Service.get("/api/base/v1/export-file/get-page", {
    params,
  });
};
