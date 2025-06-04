import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../../store/RootStore";
import { UserOutlined } from "@ant-design/icons";

export const UserInfo = observer(function UserInfo_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="flex flex-col h-full justify-center">
      <div>
        <UserOutlined /> {logic.detail?.customerName || "-"}
      </div>
    </div>
  );
});
