import { Service } from "@/utils/Axios";

/**
 * @get_shift_page 分页查询班次
 */
export const get_shift_page = (params: any) => {
  return Service.get("/api/base/v1/working-shift/get-list", {
    params,
  });
};

/**
 * @save_shift 新增班次
 */
export const save_shift = (data: any) => {
  return Service.post("/api/base/v1/working-shift/save", { data });
};

/**
 * @update_shift 修改班次
 */
export const update_shift = (data: any) => {
  return Service.put("/api/base/v1/working-shift/update", { data });
};
/**
 * @delete_shift 批量删除班次
 */
export const delete_shift = (data: { idList: string[] }) => {
  return Service.delete("/api/base/v1/working-shift/delete", {
    data: data.idList,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
