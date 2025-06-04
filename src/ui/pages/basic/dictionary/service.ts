import { Service } from "@/utils/Axios";

/**
 * @get_page 分页查询系统_字典
 * @param params
 */
export const get_page = (params: {
  /**
   * @dictCode 字典编码
   */
  dictCode?: string;
  /**
   * @dictName 字典名称
   */
  dictName?: string;
  page?: number;
  size: number;
}) => {
  return Service.get("/api/base/v1/sys-dict/get-page", {
    params,
  });
};

export interface IDictionary {
  /**
   * @dictCode 字典编码
   */
  dictCode?: string;
  /**
   * @dictName 字典名称
   */
  dictName?: string;
  /**
   * @id 主键id
   */
  id?: number;
  /**
   * @memo memo
   */
  memo: string;
}

/**
 * @save 新增系统_字典
 * @param data
 */
export const save = (data: IDictionary) => {
  return Service.post("/api/base/v1/sys-dict/save", { data });
};

/**
 * @update 修改系统_字典
 * @param data
 */
export const update = (data: IDictionary) => {
  return Service.put("/api/base/v1/sys-dict/update", {
    data,
  });
};

/**
 * @batchDelete 批量删除系统_字典
 * @param data
 */
export const batchDelete = (data: {
  /**
   * @idList
   */
  idList: string[];
}) => {
  return Service.put("/api/base/v1/sys-dict/delete", {
    data,
  });
};

/**
 * @save_dict_value 新增字典值
 * @param data
 */
export const save_dict_value = (data: {
  /**
   * @dictCode 字典编码
   */
  dictCode: string;
  /**
   * @dictName 字典名称
   */
  dictName: string;
  /**
   * @dictValue 字典值
   */
  dictValue: string;
  /**
   * @memo 备注
   */
  memo?: string;
}) => {
  return Service.post("/api/base/v1/sys-dict-value/save", {
    data,
  });
};

/**
 * @update_dict_value 修改字典值
 * @param data
 */
export const update_dict_value = (data: {
  /**
   * @dictCode 字典编码
   */
  dictCode: string;
  /**
   * @dictName 字典名称
   */
  dictName: string;
  /**
   * @dictValue 字典值
   */
  dictValue: string;
  /**
   * @memo 备注
   */
  memo?: string;
}) => {
  return Service.put("/api/base/v1/sys-dict-value/update", {
    data,
  });
};

/**
 * @get_dict_value 获取字典值集合
 * @param params
 */
export const get_dict_value = (params?: {
  /**
   * @dictCode 字典编码
   */
  dictCode?: string;
  /**
   * @dictCodeList 字典编码集合
   */
  dictCodeList?: string;
  /**
   * @dictName 字典名称
   */
  dictName?: string;
  /**
   * @dictValue 字典值
   */
  dictValue?: string;
  /**
   * @memo 备注
   */
  memo?: string;
}) => {
  return Service.get("/api/base/v1/sys-dict-value/dict-value", {
    params,
  });
};
