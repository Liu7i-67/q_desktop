import { Form, Input, Select, Tag, TimePicker, ColorPicker } from "antd";
import { useSelector } from "./store";
import { useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Modal } from "@/components/TXModal";
import { TXTag } from "@/components/TXTag";

const EditModal: React.FC = () => {
  const { runUpdateShift, runSaveShift } = useSelector((x) => x.api);
  const { isCreate, editModalVisible, updateModalData } = useSelector(
    (x) => x.state
  );
  const editForm = useSelector((x) => x.editForm);
  const { closeEditModal, addModalSubmit, updateModalSubmit } = useSelector(
    (x) => x.logic
  );

  let isSame = false;
  let isCross = false;

  useEffect(() => {
    if (editModalVisible) {
      if (!isCreate) {
        editForm.setFieldsValue({
          shiftName: updateModalData?.shiftName,
          frontendExtension: updateModalData?.frontendExtension,
          scheduleType:
            updateModalData?.scheduleType === 0 && "LITTLE_RED_BOOK",
          timeSlot: [
            dayjs(updateModalData?.startTime, "HH:mm:ss"),
            dayjs(updateModalData?.endTime, "HH:mm:ss"),
          ],
        });
      }
    } else {
      editForm.resetFields();
    }
  }, [editModalVisible]);

  const frontendExtension = Form.useWatch("frontendExtension", editForm);
  const shiftName: string = Form.useWatch("shiftName", editForm) || "";
  const timeSlot: Dayjs[] = Form.useWatch("timeSlot", editForm) || [];

  if (timeSlot[0] && timeSlot[1]) {
    isCross = timeSlot[1].isBefore(timeSlot[0]);
    isSame = timeSlot[1].isSame(timeSlot[0]);
  }

  return (
    <Modal
      title={isCreate ? "新增班次" : "编辑班次"}
      open={editModalVisible}
      onCancel={closeEditModal}
      onOk={isCreate ? addModalSubmit : updateModalSubmit}
      width={500}
      destroyOnClose
      confirmLoading={isCreate ? runSaveShift.loading : runUpdateShift.loading}
    >
      <Form
        className={"p-8 max-h-[60vh] overflow-y-auto"}
        layout="vertical"
        form={editForm}
        initialValues={{ frontendExtension: "#3d7ce2" }}
      >
        <Form.Item
          label="班次名称"
          name="shiftName"
          rules={[{ required: true, message: "请输入班次名称" }]}
        >
          <Input placeholder="请输入班次名称" />
        </Form.Item>

        <Form.Item
          label="排班类型"
          name="scheduleType"
          rules={[{ required: true, message: "请选择排班类型" }]}
        >
          <Select
            placeholder="请选择排班类型"
            options={[{ label: "小红书排班", value: "LITTLE_RED_BOOK" }]}
          />
        </Form.Item>

        <Form.Item
          label="时间段"
          name="timeSlot"
          rules={[{ required: true, message: "请选择时间段" }]}
        >
          <TimePicker.RangePicker
            format="HH:mm:ss"
            placeholder={["开始时间", "结束时间"]}
            style={{ width: "100%" }}
            order={false}
          />
        </Form.Item>
        {isSame && (
          <div className="text-red-400 -mt-[16px] mb-4">
            开始时间和结束时间不能相同
          </div>
        )}
        {isCross && (
          <div className="text-[orangered] -mt-[16px] mb-4">
            当前班次为跨天班次
          </div>
        )}
        {frontendExtension && shiftName && (
          <Form.Item label="班次预览">
            <TXTag
              color={
                typeof frontendExtension === "string"
                  ? frontendExtension
                  : `#${frontendExtension?.toHex?.()}`
              }
              text={shiftName}
            />
          </Form.Item>
        )}
        <Form.Item
          label="配色"
          name="frontendExtension"
          rules={[{ required: true, message: "请选择配色" }]}
        >
          <ColorPicker
            presets={[
              {
                label: "常用",
                colors: [
                  "#3d7ce2",
                  "#389e0d",
                  "#ff4d4f",
                  "#faad14",
                  "#c41d7f",
                  "#08979c",
                ],
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
