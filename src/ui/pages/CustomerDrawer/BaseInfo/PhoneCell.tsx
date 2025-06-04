import { IResBusinessV1Customer } from "@/service/business/v1/customer";

export const PhoneCell = function PhoneCell_(props: {
  /** @param 客户详情信息 */
  detail: IResBusinessV1Customer | null;
}) {
  const { detail } = props;

  if (!detail?.phoneNumber) {
    return "-";
  }

  return detail.phoneNumber.map((p, pIndex) => {
    return <div key={pIndex}>{p}</div>;
  });
};
