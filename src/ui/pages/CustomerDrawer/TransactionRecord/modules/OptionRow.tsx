import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { TXButton } from "@/components/TXButton";

export const OptionRow = observer(function OptionRow_() {
  const root = useStore();
  const { logic, refs, propsStore, computed } = root;
  return (
    <div className="flex pb-2">
      <TXButton
        disabled={computed.isInvalid}
        disabledTips="无效客户不支持成交"
        type="primary"
        onClick={() => {
          refs.dealRef.current?.openModal?.({
            customerId: propsStore.props.detail?.id as string,
          });
        }}
      >
        <PlusOutlined />
        成交
      </TXButton>
      <Button type="default" className="ml-2" onClick={logic.getList}>
        <ReloadOutlined />
        刷新
      </Button>
    </div>
  );
});
