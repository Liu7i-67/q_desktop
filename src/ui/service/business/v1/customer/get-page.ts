import { TCustomerType } from "@/utils/enum/modules/customerType";
import { IResDetail } from "@/utils/interface";

export type IReqBusinessV1CustomerGetPage = Partial<{
  /**@param 是否来自指派任务界面 */
  fromAssignFlag: boolean;
  /**@param 客户所在城市 */
  areaCode: string;
  /**@param 指派结束时间 */
  assignTimeEnd: string;
  /**@param 指派开始时间 */
  assignTimeStart: string;
  /**@param 是否已指派（true：已指派） */
  assignedFlag: boolean;
  /**@param 渠道id */
  channelIdList: string[];
  /**@param 创建结束时间 */
  createTimeEnd: string;
  /**@param 创建开始时间 */
  createTimeStart: string;
  /**@param 线索来源：个人报备，线索分配,可用值:PERSONAL_REPORT,CLUE_ASSIGNMENT, CUSTOMER_ASSIGNED, PERSONAL_CREATED */
  createdSource: string;
  /**@param 客户姓名 */
  customerName: string;
  /**@param 	客户状态,可用值:EMPTY,IN_PROGRESS,DEAL,REPEAT_PURCHASE */
  customerStatus: string;
  /**@param 客户类型 */
  customerTypes: any[];
  /**@param 成交结束日期 */
  dealDateEnd: string;
  /**@param 成交开始日期 */
  dealDateStart: string;
  /**@param 员工部门 */
  deptIds: any[];
  /**@param 派单机构id集合 */
  dispatchOrgIdList: any[];
  /**@param 是否派过单，true:是 */
  dispatchedFlag: boolean;
  /**@param 客户id集合 */
  ids: any[];
  /**@param 意向项目 */
  intentionalDataIdList: any[];
  /**@param 关键字 */
  keyword: string;
  /**@param 客户标签	 */
  labelRelationLabelValue: any[];
  /**@param 主播id	 */
  liveStreamerIdList: any[];
  /**@param 只看和我有关的客户	 */
  mineCustomerFlag: boolean;
  /**@param 是否只看我的协作客户（客户所属者不是我，协作有我）	 */
  onlyCollabFlag: boolean;
  /**@param 	只看对应协作类型的客户,可用值:OFFICIAL,COLLABORATION */
  onlyCollabType: string;
  /**@param 	用户所属人id */
  ownerUserId: number;
  /**@param 客户电话 */
  phoneNumber: string;
  /**@param 平台id */
  platformIdList: any[];
  /**@param 目前客户id集合 */
  targetCustomerIds: any[];
  /**@param 客户转移的所属人id（员工id） */
  transferUserId: number;
  /**@param 微信号 */
  wechatNumber: string;
  /**@param 微信通过状态,可用值:UN_PASSED,PASSED,UN_DEFINED */
  wechatStatus: string;
}>;
export interface IResBusinessV1CustomerGetPage {
  /**@param 线索类型,可用值:PLACE,ECOMMERCE */
  leadsType: string;
  /**@param 平台名称 */
  platformName: string;
  /**@param 平台id */
  platformId: string;
  /**@param 主播名称 */
  liveStreamerName: string;
  /**@parm 主播id */
  liveStreamerId: string;
  /**@param 客户所在城市 */
  areaCode: string;
  /**@param 渠道id */
  channelId?: string;
  /**@param 渠道名称 */
  channelName?: string;
  /**@param 客户协作关系对象DTO */
  collabDTOList: ICollabListDTO[];
  /**@param 创建人id */
  createBy?: string;
  /**@param 创建时间 */
  createTime: string;
  /**@param 客户线索对象DTO */
  customerLeadsDTO?: ICustomerLeadsDTO;
  /**@param 客户姓名 */
  customerName: string;
  /**@param 客户状态,可用值:EMPTY,IN_PROGRESS,DEAL,REPEAT_PURCHASE */
  customerStatus: string;
  /**@param 客户类型,可用值:EMPTY,OLD_WITH_NEW,LEVEL_A,LEVEL_B,LEVEL_C,LEVEL_D,INVALID_CUSTOMER */
  customerType: TCustomerType;
  /**@param 数据id */
  id: string;
  /**@param 客户意向项目对象DTO */
  intentionalProjectDTOList: IIntentionalProjectListDTO[];
  /**@param 客户_标签关联关系对象DTO */
  labelRelationDTOList: IResDetail<ILabelRelationListDTO[]>;
  /**@param 客户派单信息对象DTO */
  lastDispatchDTO?: LastDispatchDTO;
  /**@param 客户跟进信息对象DTO */
  lastFollow?: ILastFollowDTO;
  /**@param 备注 */
  memo?: any;
  /**@param 数据所有者名称 */
  ownerName: string;
  /**@param 数据所有者id */
  ownerUserId: string;
  /**@param 电话 */
  phoneNumber: string[];
  /**@param 最后修改时间 */
  updateTime: string;
  /**@param 微信号 */
  wechatNumber: string[];
  /**@param 微信通过时间 */
  wechatPassTime?: any;
  /**@param 	微信通过状态,可用值:UN_PASSED,PASSED,UN_DEFINED */
  wechatStatus: string;
}

export interface ICustomerLeadsDTO {
  /**@param 客户所在城市 */
  areaCode: string;
  /**@param 分配时间 */
  assignTime: string;
  /**@param 分配给的用户id */
  assignUserId: string;
  /**@param 分配人名称 */
  assignUserName: string;
  /**@param 渠道id */
  channelId: string;
  /**@param 渠道名称 */
  channelName: string;
  /**@param 创建时间 */
  createTime: string;
  /**@param 线索关联的客户id */
  customerId: string;
  /**@param 客户姓名 */
  customerName: string;
  /**@param 数据id */
  id: string;
  /**@param 线索类型,可用值:PLACE,ECOMMERCE */
  leadsType: string;
  /**@param 关联主播id */
  liveStreamerId: string;
  /**@param 关联主播名称 */
  liveStreamerName: string;
  /**@param 线索备注 */
  memo: string;
  /**@param 客户电话（线索电话） */
  phoneNumber: Array<string>;
  /**@param 平台id */
  platformId: string;
  /**@param	平台名称  */
  platformName: string;
  /**@param	退款状态,可用值:UN_REFUNDED,REFUNDED */
  refundStatus: string;
  /**@param 最后修改时间 */
  updateTime: string;
  /**@param 微信号 */
  wechatNumber: Array<string>;
  /**@param 微信二维码 */
  wechatQrCode: IWechatQrCodeDTO;
}

export interface IIntentionalProjectListDTO {
  /**@param 客户id */
  customerId: string;
  /**@param 数据id */
  dataId: string;
  /**@param 数据名称 */
  dataName: string;
  /**@param 数据类型,可用值:PROJECT,PROJECT_TYPE */
  dataType: string;
}

export interface IWechatQrCodeDTO {
  /**@param 文件名称 */
  fileName?: string;
  /**@param 文件完整路径 */
  fullPath?: string;
  /**@param 缩略图完整路径 */
  fullThumbnailPath?: string;
  /**@param 文件相对路径 */
  path?: string;
  /**@param 缩略图相对路径 */
  thumbnailPath?: string;
}

export interface ILastFollowDTO {
  /**@param 创建时间 */
  createTime: string;
  /**@param 创建人名称 */
  createUserName?: string;
  /**@param 完整的客户信息 */
  customerDTO?: any;
  /**@param 客户id */
  customerId: string;
  /**@param 客户姓名 */
  customerName?: string;
  /**@param 数据id */
  id?: any;
  /**@param 上次跟进时间 */
  lastCreateTime?: string;
  /**@param 	上次跟进内容 */
  lastMemo?: string;
  /**@param 跟进内容 */
  memo: string;
  /**@param 下次跟进日期 */
  nextDate: string;
  /**@param 客户所有者id */
  ownerUserId?: any;
  /**@param 客户电话 */
  phoneNumber: string[];
  /**@param 最后修改时间 */
  updateTime?: any;
  /**@param 微信号 */
  wechatNumber: string[];
}

export interface LastDispatchDTO {
  /**@param 客户所在地区code */
  areaCode?: any;
  /**@param 创建人 */
  createBy: string;
  /**@param 创建时间 */
  createTime: string;
  /**@param 创建人名称 */
  createUserName?: any;
  /**@param 客户id */
  customerId: string;
  /**@param 派单项名称 */
  dataName?: any;
  /**@param 派单项名称 */
  dataNames: string;
  /**@param 派单项内容ID集合 */
  dispatchDataIdList: string[];
  /**@param 数据id集合 */
  dispatchItemIdList: string[];
  /**@param 派单项状态,可用值:DISPATCHED,REPEAT,NO_REPEAT,CHECK_DUPLICATE_FAIL */
  dispatchStatus: string;
  /**@param 旧系统历史派单信息 */
  historyDispatchInfoDTO?: any;
  /**@param 数据id */
  id?: any;
  /**@param 派单留言 */
  memo: string;
  /**@param 派单机构id */
  orgId: string;
  /**@param 派单机构名称 */
  orgName?: any;
  /**@param 派单号码 */
  phoneNumber: string;
  /**@param 租户id */
  tenantId: string;
  /**@param 最后修改时间 */
  updateTime?: any;
  /**@param 派单微信 */
  wechatNumber: string;
}

export interface ILabelRelationListDTO {
  /**@param 创建时间 */
  createTime?: any;
  /**@param 客户id */
  customerId: string;
  /**@param 数据id */
  id?: any;
  /**@param 标签名称 */
  labelName: string;
  /**@param 标签的字典code */
  labelValue: string;
  /**@param 	最后修改时间 */
  updateTime?: any;
}

export interface ICollabListDTO {
  /**@param 协作类型,可用值:OFFICIAL,COLLABORATION */
  collabType: string;
  /**@param 客户id */
  customerId: string;
  /**@param 协作数据id */
  dataId?: any;
  /**@param 协作分类,可用值:CUSTOMER,DEAL */
  dataType: string;
  /**@param 数据id */
  id: string;
  /**@param 是否是主导人 */
  leaderFlag: boolean;
  /**@param 	协作比例 */
  ratio: number;
  /**@param 协作者id */
  userId: string;
  /**@param 	协作者姓名 */
  userName: string;
}
