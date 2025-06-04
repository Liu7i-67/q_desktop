import { observer } from "@quarkunlimit/qu-mobx";
import {
  ITXDescriptionItem,
  TXDescriptions,
} from "@/components/TXDescriptions";
import UserHelper from "@/utils/user-helper";
import { userTypeTagObj } from "@/utils/enum/modules/userType";
import { Tag } from "antd";
import { useStore } from "../store/RootStore";

export const BaseInfo = observer(function BaseInfo_() {
  const root = useStore();
  const { logic } = root;
  const useType = userTypeTagObj[logic.userInfo.userType];

  const items: ITXDescriptionItem[] = [
    {
      label: "ID",
      labelSpan: 8,
      childrenSpan: 16,
      children: logic.userInfo.id || "-",
    },
    {
      label: "用户名",
      labelSpan: 8,
      childrenSpan: 16,
      children: logic.userInfo.userName || "-",
    },
    {
      label: "别名",
      labelSpan: 8,
      childrenSpan: 16,
      children: logic.userInfo.nickname || "-",
    },
    {
      label: "用户类型",
      labelSpan: 8,
      childrenSpan: 16,
      children: <Tag color={useType.color}>{useType.text}</Tag>,
    },
  ];
  return (
    <TXDescriptions
      labelClassName="justify-end"
      items={items}
      className="m-2"
    />
  );
});
