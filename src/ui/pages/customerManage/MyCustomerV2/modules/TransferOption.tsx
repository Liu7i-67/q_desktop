import { MyCustomerAuth } from "@/pages/customerManage/myCustomer/auth";
import { Button } from "antd";
import { useStore } from "../store/RootStore";
import { observer } from "@quarkunlimit/qu-mobx";

const TransferOption = observer(() => {
  const root = useStore();
  const { logic, refs } = root;

  return (
    MyCustomerAuth.customerTransfer && (
      <div className="mb-2 ml-2">
        <Button
          type={"default"}
          className="ml-2"
          onClick={() => {
            logic.handleToggleTransferCustomer();
          }}
        >
          {logic.transferVisible ? "取消转移" : "转移客户"}
        </Button>
        {logic.transferVisible && (
          <Button
            type={"primary"}
            className="ml-2"
            onClick={() => {
              refs.transferRef.current?.openModal({
                targetCustomerIds: logic.selectedRowKeys as string[],
              });
            }}
          >
            确认转移
          </Button>
        )}
      </div>
    )
  );
});

export default TransferOption;
