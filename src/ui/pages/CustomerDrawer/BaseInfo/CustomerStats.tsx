import {
  IResBusinessV1Customer,
  wechatStatusInfo,
} from "@/service/business/v1/customer";
import { Tag } from "antd";

export const CustomerStats = function CustomerStats_(props: {
  /** @param 客户详情信息 */
  detail: IResBusinessV1Customer | null;
}) {
  const { detail } = props;

  const info = wechatStatusInfo[detail?.wechatStatus || "PENDING"];

  return <Tag color={info.color}>{info.label}</Tag>;
};
