export interface IReqBaseV1RegionTree {
  /** @param 最大层级 一般是传2 */
  maxLevel?: number;
}

export interface IResBaseV1RegionTree {
  /**@param 地区编码 */
  areaCode: string;
  /**@param 地区名 */
  areaName: string;
  /**@param 城市中心点（即：经纬度坐标）*/
  center?: string;
  /**@param 子地区集合*/
  childList: IResBaseV1RegionTree[];
  /**@param 城市编码，区号*/
  cityCode?: string;
  /**@param 数据集合*/
  dataList: any[];
  /**@param 数据id*/
  id: string;
  /**@param 地区级别（1:省份province,2:市city,3:区县district,4:街道street）*/
  level: number;
  /**@param 地区父节点*/
  parentCode: string;
}
