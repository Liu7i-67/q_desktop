import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button } from "antd";
import { EditOutlined, LockOutlined } from "@ant-design/icons";

export const OptionRow = observer(function OptionRow_() {
  const root = useStore();
  const { refs } = root;
  return (
    <div className="flex justify-center gap-8 mt-8">
      <Button
        type="default"
        icon={<EditOutlined />}
        onClick={() => {
          refs.nickRef.current?.openModal();
        }}
      >
        修改别名
      </Button>
      <Button
        type="default"
        icon={<LockOutlined />}
        onClick={() => {
          refs.passwordRef.current?.openModal();
        }}
      >
        修改密码
      </Button>
    </div>
  );
});
