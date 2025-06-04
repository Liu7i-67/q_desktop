export interface ICollabDTO {
  /** @param 协作类型 */
  collabType: string;
  customerId: string;
  dataId: string | null;
  dataType: string;
  id: string;
  leaderFlag: boolean;
  /** @param 协作比例 */
  ratio: number;
  /** @param 协作人id */
  userId: string;
  /** @param 协作人名字 */
  userName: string;
}

export interface ILastFollow {
  customerId: string;
  /** @param 跟进内容*/
  memo: string;
  /** @param 下次跟进事件*/
  nextDate: string;
}

export interface IIntentionalProjectDTOList {
  /** @param 项目名字 */
  dataName: string;
  /** @param 项目id */
  dataId: string;
}

export interface ILastDispatchDTO {
  /** @param 项目名字 */
  dataNames: string;
  /** @param 创建时间 */
  createTime: string;
}

export interface ILabelRelationDTOList {
  labelValue: string;
  labelName: string;
}

export interface IResBusinessV1CustomerDetail {
  /** @param 所在城市code */
  areaCode?: string;
  /** @param 协作人列表 */
  collabDTOList?: ICollabDTO[];
  /** @param 报备时间*/
  createTime?: string;
  /** @param 客户状态 */
  customerStatus?: string;
  id: string;
  memo?: string | null;
  /** @param 归属人 */
  ownerName?: string;
  /** @param 归属人Id */
  ownerUserId?: string;
  /** @param 电话 */
  phoneNumber?: string[];
  updateTime?: string;
  /** @param 微信 */
  wechatNumber?: string[];
  /** @param 微信通过时间 */
  wechatPassTime?: string | null;
  /** @param 微信通过状态 */
  wechatStatus?: string;
  /** @param 最近跟进信息 */
  lastFollow?: ILastFollow;
  /** @param 首次咨询项目 */
  intentionalProjectDTOList?: IIntentionalProjectDTOList[];
  /** @param 最新派单项目 */
  lastDispatchDTO?: ILastDispatchDTO;
  /** @param 客户标签 */
  labelRelationDTOList?: ILabelRelationDTOList[];
}
