import { IResBusinessV1Customer } from "@/service/business/v1/customer";

export const Collaborator = function CustomerStats_(props: {
  /** @param 客户详情信息 */
  detail: IResBusinessV1Customer | null;
}) {
  const { detail } = props;

  if (!detail?.collabDTOList?.length) {
    return "-";
  }

  let collaborators: string[] = [];

  for (let c of detail.collabDTOList) {
    if (c.leaderFlag) {
      continue;
    }
    collaborators.push(c.userName);
  }

  return collaborators.join("、");
};
