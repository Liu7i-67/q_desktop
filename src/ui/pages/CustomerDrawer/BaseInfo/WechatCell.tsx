import { IResBusinessV1Customer } from "@/service/business/v1/customer";

export const WechatCell = function WechatCell_(props: {
  /** @param 客户详情信息 */
  detail: IResBusinessV1Customer | null;
}) {
  const { detail } = props;

  if (!detail?.wechatNumber) {
    return "-";
  }

  return (
    <div className="flex flex-col gap-1 overflow-hidden">
      {detail.wechatNumber.map((p, pIndex) => {
        return (
          <div key={pIndex} className="whitespace-break-spaces">
            {p}
          </div>
        );
      })}
    </div>
  );
};
