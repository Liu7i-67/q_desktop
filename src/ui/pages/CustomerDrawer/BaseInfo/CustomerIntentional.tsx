import { IResBusinessV1Customer } from "@/service/business/v1/customer";
import { Tag } from "antd";

export const CustomerIntentional = function CustomerIntentional_(props: {
  /** @param 客户详情信息 */
  detail: IResBusinessV1Customer | null;
}) {
  const { detail } = props;

  if (!detail?.intentionalProjectDTOList?.length) {
    return "-";
  }

  return (
    <div className="flex flex-wrap gap-1">
      {detail.intentionalProjectDTOList.map((p, pIndex) => {
        return (
          <Tag color="blue" key={pIndex}>
            {p.dataName}
          </Tag>
        );
      })}
    </div>
  );
};
