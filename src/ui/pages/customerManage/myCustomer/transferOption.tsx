import { MyCustomerAuth } from "@/pages/customerManage/myCustomer/auth";
import { Button } from "antd";
import { useSelector } from "./store";
import { TransferType } from "./types";

const TransferOption = () => {
  const { transtionCustomerVisible } = useSelector((x) => x.state);
  const {
    handleToggleTranstionCustonerVisible,
    openTranstionCustomerConfigModal,
    handleSetTransferType,
    handleToggleAllTransformModalVisible,
  } = useSelector((x) => x.logic);

  return (
    MyCustomerAuth.customerTransfer && (
      <div className="mb-2 ml-2">
        <Button
          type={"default"}
          className="ml-2"
          onClick={() => {
            handleToggleTranstionCustonerVisible();
          }}
        >
          {transtionCustomerVisible ? "取消转移" : "转移客户"}
        </Button>
        {transtionCustomerVisible && (
          <Button
            type={"primary"}
            className="ml-2"
            onClick={() => {
              handleSetTransferType(TransferType.SOME);
              openTranstionCustomerConfigModal();
            }}
          >
            确认转移
          </Button>
        )}
      </div>
    )
  );
};

export default TransferOption;
