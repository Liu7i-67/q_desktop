import { IResBusinessV1Customer } from "@/service/business/v1/customer";
import { Image } from "antd";

export const WechatQrCode = function WechatQrCode_(props: {
  /** @param 客户详情信息 */
  detail: IResBusinessV1Customer | null;
}) {
  const { detail } = props;

  if (!detail?.wechatQrCode?.fullPath) {
    return "-";
  }

  return <Image src={detail?.wechatQrCode?.fullPath} width={64} height={64} />;
};
