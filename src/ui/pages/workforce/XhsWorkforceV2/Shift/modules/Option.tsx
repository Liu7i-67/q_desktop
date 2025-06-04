import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button } from "antd";
import { RedBookSchedulingAuth } from "@/pages/workforce/auth";
import { ReloadOutlined } from "@ant-design/icons";
const Option = observer(() => {
  const root = useStore();
  const { refs, logic } = root;

  return (
    <div className="mb-4">
      {RedBookSchedulingAuth.redBookSchedulingShiftCreate && (
        <Button
          type="primary"
          onClick={() => refs.editRef.current?.openModal()}
        >
          新增班次
        </Button>
      )}
      <Button
        className="ml-2"
        icon={<ReloadOutlined />}
        onClick={logic.getList}
      >
        刷新
      </Button>
    </div>
  );
});

export default Option;
