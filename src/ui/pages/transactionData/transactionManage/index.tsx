import TXAuthContainer from "@/components/TXAuthContainer";
import DealConfirmModal from "@/components/deal-confirm-modal";
import { DealManagementAuth } from "@/pages/transactionData/transactionManage/auth";
import Option from "./option";
import { Provider, useSelector } from "./store";
import Table from "./table";
import TransactionRecordDetailModal from "@/pages/CustomerDrawer/TransactionRecordDetailModal/Edit";

const Transaction = () => {
  const state = useSelector((x) => x.state);
  const detailRef = useSelector((x) => x.detailRef);

  const { closeHandleModal, getData } = useSelector((x) => x.logic);

  const { handleModalVisible, currentDealId, currentClickType } = state;

  return (
    <TXAuthContainer auth={DealManagementAuth.dealManagementView}>
      <>
        <Option />
        <Table />
        {/*<HandleModal />*/}
        <DealConfirmModal
          visible={handleModalVisible}
          dealId={currentDealId}
          onClose={closeHandleModal}
          type={currentClickType}
          onAfterSaveSuccess={() => {
            getData();
            closeHandleModal();
          }}
        />
        <TransactionRecordDetailModal ref={detailRef} afterClose={getData} />
      </>
    </TXAuthContainer>
  );
};

export default () => {
  return (
    <Provider>
      <Transaction />
    </Provider>
  );
};
