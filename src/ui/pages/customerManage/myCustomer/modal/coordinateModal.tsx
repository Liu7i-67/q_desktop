import { Modal } from "@/components/TXModal";
import { useSelector } from "../store";
import { useEffect } from "react";
import CoordinateTable from "../components/coordinateTable";

const CoordinateModal = () => {
  const { runGetCollabDetail, runUpdateCollab } = useSelector((x) => x.api);
  const { coordinateModalVisible, coordinateDataSource } = useSelector(
    (x) => x.state
  );
  const {
    closeCoordinateModal,
    coordinateModalSubmit,
    // getUserPage,
    getCollabDetail,
    setCoordinateDataSource,
  } = useSelector((x) => x.logic);

  useEffect(() => {
    if (coordinateModalVisible) {
      // getUserPage();
      getCollabDetail();
    }
  }, [coordinateModalVisible]);

  return (
    <Modal
      title={"客户协作"}
      open={coordinateModalVisible}
      onCancel={closeCoordinateModal}
      onOk={coordinateModalSubmit}
      destroyOnClose
      width={680}
      loading={runGetCollabDetail.loading}
      confirmLoading={runUpdateCollab.loading}
    >
      <CoordinateTable
        dataSource={coordinateDataSource}
        // consultantList={consultantList}
        onChange={setCoordinateDataSource}
      />
    </Modal>
  );
};

export default CoordinateModal;
