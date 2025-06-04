import { Modal } from "@/components/TXModal";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { useState } from "react";
import { useSelector } from "../store";

const TranstionCustomerModal = () => {
  const [channelTimer, setChannelTimer] = useState<NodeJS.Timeout | null>(null);
  const {
    transtionCustomerConfirmModalVisible,
    transtionCustomerSelectedRows,
    transtionScrollDataSourceTotal,
    transtionScrollDataSource,
    transtionScrollDataSourceCurrent,
  } = useSelector((x) => x.state);

  const {
    closeTranstionCustomerConfigModal,
    handleConfirmTrastionCustomer,
    getScrollTranstionData,
    getTranstionScrollSeleData,
    handleSetTransferUserId,
    setTranstionList,
    setTranstionCurrent,
    handleTranstionSearch,
  } = useSelector((x) => x.logic);
  const { runTranstionCustomer, runGetScrollUserPage } = useSelector(
    (x) => x.api
  );
  const consultantProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/sys-user/get-page",
    searchParamKey: "userName",
    request: {
      userType: "CONSULTANT",
    },
    transformOptions: (data) =>
      data.map((item) => ({
        label: item.userName,
        value: item.id,
        disabled: item.enableFlag === false,
      })),
    initFetch: false,
    refreshFetch: transtionCustomerConfirmModalVisible,
  });

  // 处理客户滚动加载
  const onSelectPopupScroll = (e: any) => {
    const { target } = e;
    if (
      !runGetScrollUserPage.loading &&
      transtionScrollDataSourceTotal > transtionScrollDataSource.length &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      const nextCurrent = transtionScrollDataSourceCurrent + 1;
      getScrollTranstionData(nextCurrent);
    }
  };

  // 处理客户搜索
  const debouncedTranstionSearch = (value: string) => {
    setTranstionList([]);
    setTranstionCurrent(1);

    if (channelTimer) {
      clearTimeout(channelTimer);
    }
    if (!value.trim()) {
      return;
    }
    const newTimer = setTimeout(() => {
      handleTranstionSearch(value);
    }, 500);
    setChannelTimer(newTimer);
  };

  // useEffect(() => {
  //   if (transtionCustomerConfirmModalVisible) {
  //     getTranstionScrollSeleData();
  //   }
  // }, [transtionCustomerConfirmModalVisible]);

  return (
    <Modal
      title="转移客户"
      open={transtionCustomerConfirmModalVisible}
      onCancel={closeTranstionCustomerConfigModal}
      onOk={handleConfirmTrastionCustomer}
      okButtonProps={{
        loading: runTranstionCustomer.loading,
      }}
    >
      <div className="my-3">
        已选择{transtionCustomerSelectedRows.length}个客户
      </div>
      <TXSearchSelect
        className="w-full"
        onChange={(value) => {
          handleSetTransferUserId(value);
        }}
        {...consultantProps}
        placeholder="请选择转移给谁"
      />
      {/* <Select
        allowClear
        showSearch
        optionFilterProp="children"
        defaultActiveFirstOption={false}
        filterOption={false}
        className="w-full mt-3"
        placeholder="请选择转移给谁"
        onPopupScroll={onSelectPopupScroll}
        onChange={(value) => {
          handleSetTransferUserId(value);
        }}
        options={transtionScrollDataSource.map((item: any) => ({
          label: item.userName,
          value: item.id,
          disabled: item.enableFlag === false,
        }))}
        onSearch={(value) => {
          if (!value.trim()) {
            setTranstionList([]);
            setTranstionCurrent(1);
            getTranstionScrollSeleData();
          } else {
            debouncedTranstionSearch(value);
          }
        }}
        onDropdownVisibleChange={(open) => {
          setTranstionCurrent(1);
          if (open) {
            getTranstionScrollSeleData();
            setTranstionList([]);
          }
        }}
        onClear={() => {
          setTranstionList([]);
          setTranstionCurrent(1);
        }}
      /> */}
    </Modal>
  );
};

export default TranstionCustomerModal;
