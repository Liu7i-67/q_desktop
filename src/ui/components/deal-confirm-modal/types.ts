import { ECustomerStatus } from "@/components/TXCustStatus/types";

/**
 * @EDataType 成交项目类型
 */
export enum EDataType {
  /**
   * @PROJECT 项目
   */
  PROJECT = "PROJECT",
  /**
   * @PROJECT_TYPE 项目类型
   */
  PROJECT_TYPE = "PROJECT_TYPE",
}

/**
 * @EDealStatus 成交状态
 */
export enum EDealStatus {
  /**
   * @UN_CONFIRMED 待确认
   */
  UN_CONFIRMED = "UN_CONFIRMED",
  /**
   * @CONFIRMED 确认
   */
  CONFIRMED = "CONFIRMED",
  /**
   * @CANCELED 取消
   */
  CANCELED = "CANCELED",
}

/**
 * @IDealInfo 成交信息
 */
export interface IDealInfo {
  /**
   * @amount 成交金额
   */
  amount: number;
  /**
   * @channelName 渠道名称
   */
  channelName?: string;
  /**
   * @confirmAmount 确认金额
   */
  confirmAmount: number;
  /**
   * @confirmDate 确认日期
   */
  confirmDate?: string;
  /**
   * @confirmUserId 确认用户id
   */
  confirmUserId?: string;
  /**
   * @createBy 创建人id
   */
  createBy: string;
  /**
   * @createTime 创建时间
   */
  createTime: string;
  /**
   * @createUserName 创建人名
   */
  createUserName: string;
  /**
   * @customerCreateTime 客户建档时间
   */
  customerCreateTime: string;
  /**
   * @customerId 客户id
   */
  customerId: string;
  /**
   * @customerName 客户名称
   */
  customerName: string;
  /**
   * @customerStatus 客户状态
   */
  customerStatus: ECustomerStatus;
  /**
   * @dealCycle 成交周期
   */
  dealCycle: number;
  /**
   * @dealDate 成交日期
   */
  dealDate: string;
  /**
   * @dealStatus 成交类型
   */
  dealStatus: EDealStatus;
  /**
   * @id
   */
  id: string;
  /**
   * @memo 备注
   */
  memo?: string;
  /**
   * @operateMemo 处理备注
   */
  operateMemo?: string;
  /**
   * @operateTime 处理日期
   */
  operateTime: string;
  /**
   * @orgId 成交机构
   */
  orgId: string;
  /**
   * @orgName 机构名称
   */
  orgName: string;
  /**
   * @phoneNumber 客户电话
   */
  phoneNumber?: string[];
  /**
   * @reviewStatus 审查状态
   */
  reviewStatus: boolean;
  /**
   * @wechatNumber 微信
   */
  wechatNumber: string;
}

/**
 * @IDealItem 成交项目数据
 */
export interface IDealItem {
  /**
   * @amount 成交金额
   */
  amount: number;
  /**
   * @confirmAmount 确认金额
   */
  confirmAmount?: number;
  /**
   * @confirmDate 确认日期
   */
  confirmDate?: string;
  /**
   * @confirmUserId 确认人id
   */
  confirmUserId?: string;
  /**
   * @createTime 创建时间
   */
  createTime: string;
  /**
   * @createUserName 创建人
   */
  createUserName?: string;
  /**
   * @customerId 客户id
   */
  customerId: string;
  /**
   * @dataId 项目id
   */
  dataId: string;
  /**
   * @dataName 项目名称
   */
  dataName: string;
  /**
   * @dataType 数据类型
   */
  dataType: EDataType;
  /**
   * @dealDate 成交日期
   */
  dealDate: string;
  /**
   * @dealId 成交id
   */
  dealId: string;
  /**
   * @dealStatus 成交状态
   */
  dealStatus: EDealStatus;
  /**
   * @id
   */
  id: string;
  /**
   * @orgId 成交机构id
   */
  orgId: string;
  /**
   * @updateTime 更新时间
   */
  updateTime?: string;
}

export enum EModalType {
  /**
   * @Info 查看成交信息
   */
  Info = "0",
  /**
   * @Review 审查成交
   */
  Review = "1",
  /**
   * @Confirm 确认成交
   */
  Confirm = "2",
  /**
   * @Cancel 取消成交
   */
  Cancel = "3",
}

export enum DataType {
  PROJECT = "PROJECT",
  PROJECT_TYPE = "PROJECT_TYPE",
}

export interface DealItemPostDTO {
  /**
   * @amount 成交金额
   */
  amount: number;
  /**
   * @dataId 成交项id
   */
  dataId: number;
  /**
   * @dataType 成交项类型
   */
  dataType: DataType;
}

export enum CollabType {
  OFFICIAL = "OFFICIAL",
  COLLABORATION = "COLLABORATION",
}

export interface CollabPostDTO {
  /**
   * @collabType 协作类型
   */
  collabType: CollabType;
  /**
   * @leaderFlag 是否是主导人
   */
  leaderFlag: boolean;
  /**
   * @ratio 协作比例
   */
  ratio: number;
  /**
   * @userId 协作者id
   */
  userId: number;
}
