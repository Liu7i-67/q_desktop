import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button } from "antd";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import { TXButton } from "@/components/TXButton";

export const OptionRow = observer(function OptionRow_() {
  const root = useStore();
  const { logic, refs, propsStore, computed } = root;
  return (
    <div className="flex pb-2">
      <TXButton
        type="primary"
        disabled={computed.isInvalid}
        disabledTips="无效客户不支持派单"
        onClick={() => {
          refs.editRef.current?.openModal?.({
            customerId: propsStore.props.detail?.id as string,
            phoneNumber: propsStore.props.detail?.phoneNumber as string[],
          });
        }}
      >
        <PlusOutlined />
        派单
      </TXButton>
      <Button
        type="default"
        className="ml-2"
        onClick={() =>
          refs.historyRecordRef.current?.openModal?.({
            phoneNumber: propsStore.props.detail?.phoneNumber as string[],
          })
        }
      >
        历史派单
      </Button>
      <Button
        type="default"
        className="ml-2"
        onClick={logic.getCustomerDispatchPage}
      >
        <ReloadOutlined />
        刷新
      </Button>
    </div>
  );
});
