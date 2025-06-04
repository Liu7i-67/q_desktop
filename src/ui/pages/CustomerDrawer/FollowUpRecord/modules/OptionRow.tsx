import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";

export const OptionRow = observer(function OptionRow_() {
  const root = useStore();
  const { logic, refs, propsStore } = root;
  return (
    <div className="flex pb-2">
      <Button
        type="primary"
        onClick={() => {
          refs.followUpRef.current?.openModal?.({
            customerId: propsStore.props.detail?.id as string,
          });
        }}
      >
        <PlusOutlined />
        跟进
      </Button>
      <Button type="default" className="ml-2" onClick={logic.getList}>
        <ReloadOutlined />
        刷新
      </Button>
    </div>
  );
});
