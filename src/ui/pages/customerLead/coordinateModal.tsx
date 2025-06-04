import { Modal } from "@/components/TXModal";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { JudgeEnableFlag } from "@/utils/tools";
import { Form } from "antd";
import { useState } from "react";
import { useSelector } from "./store";

const CoordinateModal: React.FC = () => {
  const FormItem = Form.Item;
  const { runAssign, runGetUserPage } = useSelector((x) => x.api);
  const {
    consultantTotal,
    consultantCurrent,
    consultantList,
    coordinateModalVisible,
  } = useSelector((x) => x.state);
  const coordinateForm = useSelector((x) => x.coordinateForm);
  const {
    closeCoordinateModal,
    coordinateModalSubmit,
    getUserPage,
    onConsultantScroll,
    setConsultantList,
    setConsultantCurrent,
    handleConsultantSearch,
  } = useSelector((x) => x.logic);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const consultantProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/sys-user/get-page",
    request: {
      userType: "CONSULTANT",
      numberOfCustomerAssignedTodayFlag: true,
    },
    searchParamKey: "userName",
    transformOptions: (data) =>
      data.map((item) => ({
        label: `${item.userName}  【今日分配的客户数量
                ${item.numberOfCustomerAssignedToday}】`,
        value: item.id,
        disabled: JudgeEnableFlag(item),
      })),
    refreshFetch: coordinateModalVisible,
    initFetch: false,
  });

  // 处理员工搜索
  const debouncedConsultantSearch = (value: string) => {
    setConsultantList([]);
    setConsultantCurrent(1);

    if (timer) {
      clearTimeout(timer);
    }
    if (!value.trim()) {
      return;
    }
    const newTimer = setTimeout(() => {
      handleConsultantSearch(value);
    }, 500);
    setTimer(newTimer);
  };

  // 处理滚动加载
  const onConsultantPopupScroll = (e: any) => {
    const { target } = e;
    if (
      !runGetUserPage.loading &&
      consultantTotal > consultantList.length &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      // 先更新页码，再加载数据
      const nextPage = consultantCurrent + 1;
      setConsultantCurrent(nextPage);
      onConsultantScroll(nextPage);
    }
  };

  // 监听弹窗显示状态
  // useEffect(() => {
  //   if (coordinateModalVisible) {
  //     // 打开弹窗时加载第一页
  //     setConsultantCurrent(1);
  //     getUserPage();
  //   } else {
  //     // 关闭弹窗时清空数据
  //     setConsultantList([]);
  //     coordinateForm.resetFields();
  //   }
  // }, [coordinateModalVisible]);

  return (
    <Modal
      title={"线索分配"}
      open={coordinateModalVisible}
      onCancel={closeCoordinateModal}
      onOk={coordinateModalSubmit}
      confirmLoading={runAssign.loading}
      destroyOnClose
    >
      <Form className={"p-8"} layout={"vertical"} form={coordinateForm}>
        <FormItem
          name="userId"
          label="今日可排咨询师"
          rules={[{ required: true, message: "请选择咨询师" }]}
        >
          <TXSearchSelect {...consultantProps} placeholder="请选择咨询师" />
          {/* <Select
            placeholder="请选择咨询师"
            showSearch
            allowClear
            optionFilterProp="children"
            defaultActiveFirstOption={false}
            filterOption={false}
            onClear={() => {
              setConsultantList([]);
              setConsultantCurrent(1);
            }}
            notFoundContent={
              runGetUserPage.loading ? (
                <Spin size="small" />
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    color: "#999",
                    padding: "8px 0",
                  }}
                >
                  暂无数据
                </div>
              )
            }
            onPopupScroll={onConsultantPopupScroll}
            onDropdownVisibleChange={(open) => {
              if (open) {
                getUserPage();
                setConsultantList([]);
              } else {
                setConsultantCurrent(1);
              }
            }}
            onSearch={(value) => {
              if (!value.trim()) {
                setConsultantList([]);
                setConsultantCurrent(1);
                getUserPage();
              } else {
                debouncedConsultantSearch(value);
              }
            }}
          >
            {consultantList?.map((item) => (
              <Select.Option
                disabled={JudgeEnableFlag(item)}
                key={item.id}
                value={item.id}
              >
                {item.userName} 【今日分配的客户数量
                {item.numberOfCustomerAssignedToday}】
              </Select.Option>
            ))}
          </Select> */}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CoordinateModal;
