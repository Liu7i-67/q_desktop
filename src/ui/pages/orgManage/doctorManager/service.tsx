import { Service } from "@/utils/Axios";

/**
 * @get_doctor_page 分页查询医生
 */
export const get_doctor_page = (params: {
  /**
   * @doctorName 医生姓名
   */
  doctorName?: string;
  /**
   * @doctorType 医生类型 DOCTOR,ANESTHETIST
   */
  doctorType?: string;
  /**
   * @licenseNo 医师执业资格证编号
   */
  licenseNo?: string;
  /**
   * @orgIdList 任职机构id集合
   */
  orgIdList?: number[];
  /**
   * @page 页码
   */
  page?: number;
  /**
   * @size 每页条数
   */
  size?: number;
}) => {
  return Service.get("/api/base/v1/doctor/get-page", {
    params,
  });
};

/**
 * @save_doctor 新增医生
 */
export const save_doctor = (data: any) => {
  return Service.post("/api/base/v1/doctor/save", { data });
};

/**
 * @update_doctor 修改医生
 */
export const update_doctor = (data: any) => {
  return Service.put("/api/base/v1/doctor/update", { data });
};

/**
 * @get_doctor_detail 获取医生详情
 */
export const get_doctor_detail = (data: { id: string }) => {
  return Service.get(`/api/base/v1/doctor/${data.id}`);
};

/**
 * @delete_doctor 批量删除医生
 */
export const delete_doctor = (data: { idList: string[] }) => {
  return Service.delete("/api/base/v1/doctor/delete", {
    data: data.idList,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
