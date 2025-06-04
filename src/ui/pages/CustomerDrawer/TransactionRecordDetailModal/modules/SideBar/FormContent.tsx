import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../../store/RootStore";
import { Form, Input, InputNumber } from "antd";

export const FormContent = observer(function FormContent_() {
  const root = useStore();
  const { logic, refs } = root;
  return (
    <Form layout={"vertical"} form={refs.form}>
      <Form.Item
        label="确认成交金额"
        name="confirmAmount"
        hidden={logic.activeKey === "CANCEL"}
        rules={[
          {
            required: logic.activeKey !== "CANCEL",
            message: "确认成交金额为必填项",
          },
        ]}
      >
        <InputNumber
          className="w-full"
          precision={2}
          addonBefore="￥"
          placeholder="请输入成交金额"
        />
      </Form.Item>
      <Form.Item
        label="确认备注"
        name="operateMemo"
        hidden={logic.activeKey === "CANCEL"}
      >
        <Input.TextArea
          placeholder="清输入确认备注"
          maxLength={100}
          showCount
          rows={4}
          style={{ resize: "none" }}
        />
      </Form.Item>
      <Form.Item
        label="作废备注"
        name="cancelMemo"
        hidden={logic.activeKey === "COMFIRM"}
        rules={[
          { required: logic.activeKey !== "COMFIRM", message: "请输入备注" },
        ]}
      >
        <Input.TextArea
          placeholder={"请输入作废备注"}
          maxLength={100}
          showCount
          rows={4}
          style={{ resize: "none" }}
        />
      </Form.Item>
    </Form>
  );
});
