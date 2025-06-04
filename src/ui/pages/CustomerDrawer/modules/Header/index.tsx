import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../../store/RootStore";
import { UserInfo } from "./UserInfo";
import { Button } from "antd";
import EditModal from "@/pages/customerManage/MyCustomerV2/modules/EditModal";

export const Header = observer(function Header_() {
  const root = useStore();
  const { logic, refs } = root;
  return (
    <div className="h-[60px] flex">
      <div className="h-full px-[24px] flex items-center">客户详情</div>
      <UserInfo />
      <div className="flex-1 flex items-center justify-end">
        <Button
          className="m-2"
          type="primary"
          onClick={() =>
            refs.editRef.current?.openModal({ id: logic.detail?.id || "" })
          }
        >
          编辑信息
        </Button>
      </div>
      {/* 编辑弹窗 */}
      <EditModal ref={refs.editRef} afterClose={logic.getCustomerDetail} />
    </div>
  );
});
