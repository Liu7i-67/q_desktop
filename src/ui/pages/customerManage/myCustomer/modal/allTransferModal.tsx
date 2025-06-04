import { Modal } from "@/components/TXModal";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { Alert } from "antd";
import { useState } from "react";
import { useSelector } from "../store";

const AllTransferModal = () => {
  const [channelTimer, setChannelTimer] = useState<NodeJS.Timeout | null>(null);
  const {
    allTransformVisible,
    transtionScrollDataSourceTotal,
    transtionScrollDataSource,
    transtionScrollDataSourceCurrent,
    transferUserId,
  } = useSelector((x) => x.state);
  const { runTranstionCustomer, runGetScrollUserPage } = useSelector(
    (x) => x.api
  );
  const {
    handleToggleAllTransformModalVisible,
    handleAllTrastionCustomer,
    getScrollTranstionData,
    getTranstionScrollSeleData,
    handleSetTransferUserId,
    setTranstionList,
    setTranstionCurrent,
    handleTranstionSearch,
  } = useSelector((x) => x.logic);
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
    refreshFetch: allTransformVisible,
  });

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
  //   if (allTransformVisible) {
  //     getTranstionScrollSeleData();
  //   }
  // }, [allTransformVisible]);

  return (
    <Modal
      title="全量转移"
      open={allTransformVisible}
      onOk={handleAllTrastionCustomer}
      okButtonProps={{
        loading: runTranstionCustomer.loading,
      }}
      onCancel={() => {
        handleToggleAllTransformModalVisible();
      }}
    >
      <Alert message="你确定全量转移已筛选的客户吗？" type="warning" />
      <TXSearchSelect
        {...consultantProps}
        className="w-full mt-3"
        onChange={(value) => {
          handleSetTransferUserId(value);
        }}
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
        value={transferUserId}
        options={transtionScrollDataSource.map((item: any) => ({
          label: item.userName,
          value: item.id,
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

export default AllTransferModal;
