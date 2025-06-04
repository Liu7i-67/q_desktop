import { IResBusinessV1Customer } from "@/service/business/v1/customer";
import { Tag } from "antd";

export const CustomerLabel = function CustomerLabel_(props: {
  /** @param 客户详情信息 */
  detail: IResBusinessV1Customer | null;
}) {
  const { detail } = props;

  if (!detail?.labelRelationDTOList?.length) {
    return "-";
  }

  return (
    <div className="flex flex-wrap gap-1">
      {detail.labelRelationDTOList.map((p, pIndex) => {
        return (
          <Tag color="blue" key={pIndex}>
            {p.labelName}
          </Tag>
        );
      })}
    </div>
  );
};
