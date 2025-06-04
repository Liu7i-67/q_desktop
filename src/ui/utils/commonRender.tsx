import { Tag } from "antd";
import { EUserType } from "./user-helper/interface";

/**@function 渲染客户类型 */
export const renderUserType = (userType: EUserType) => {
  switch (userType) {
    case EUserType.CONSULTANT:
      return <Tag color={"pink"}>咨询师</Tag>;
    case EUserType.ACCOUNTANT:
      return <Tag color={"red"}>财务</Tag>;
    case EUserType.BUSINESS:
      return <Tag color={"blue"}>商务</Tag>;
    case EUserType.CUSTOMER_SERVICE:
      return <Tag color={"orange"}>客服</Tag>;
    case EUserType.TRAFFIC:
      return <Tag color={"cyan"}>流量</Tag>;
    case EUserType.ORG:
      return <Tag>机构</Tag>;
  }
};

/**@function 渲染启用状态 */
export const renderEnableFlag = (flag: boolean) => {
  switch (flag) {
    case true:
      return <Tag color={"green"}>是</Tag>;
    case false:
      return <Tag color="red">否</Tag>;
  }
};
