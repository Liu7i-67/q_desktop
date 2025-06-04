import { DatePicker, Form, Input } from "antd";
import { Modal } from "@/components/TXModal";
import { useSelector } from "./store";
import { useEffect } from "react";
import Description from "./components/description";
import dayjs from "dayjs";

const HandleModal = () => {
  const { handleModalVisible, isDeal } = useSelector((x) => x.state);
  const { runGetTransactionDetail, runConfirmDeal, runCancelDeal } =
    useSelector((x) => x.api);
  const handleForm = useSelector((x) => x.handleForm);
  const { closeHandleModal, getTransactionDetail, confirmDeal, cancelDeal } =
    useSelector((x) => x.logic);

  useEffect(() => {
    if (handleModalVisible) {
      getTransactionDetail();
    } else {
      handleForm.resetFields();
    }
  }, [handleModalVisible]);

  return (
    <Modal
      title={isDeal ? "确认处理" : "作废处理"}
      open={handleModalVisible}
      onCancel={closeHandleModal}
      onOk={isDeal ? confirmDeal : cancelDeal}
      confirmLoading={isDeal ? runConfirmDeal.loading : runCancelDeal.loading}
      destroyOnClose
      width={1000}
      loading={runGetTransactionDetail.loading}
    >
      <div className="max-h-[70vh] overflow-y-auto">
        <Description />
        <Form
          className={"p-8"}
          layout={"horizontal"}
          form={handleForm}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <div className="grid grid-cols-2 gap-4">
            {isDeal ? (
              <Form.Item
                label="确认时间"
                name="confirmDate"
                rules={[{ required: true, message: "请选择确认时间" }]}
              >
                <DatePicker
                  className="w-full"
                  placeholder="请选择确认时间"
                  disabledDate={(current) => {
                    return current && current < dayjs().startOf("day");
                  }}
                />
              </Form.Item>
            ) : null}
            <Form.Item
              label={isDeal ? "确认备注" : "作废备注"}
              name="operateMemo"
              rules={[{ required: !isDeal, message: "请输入备注" }]}
            >
              <Input.TextArea
                placeholder={isDeal ? "请输入确认备注" : "请输入作废备注"}
                rows={1}
                maxLength={100}
                showCount
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default HandleModal;
