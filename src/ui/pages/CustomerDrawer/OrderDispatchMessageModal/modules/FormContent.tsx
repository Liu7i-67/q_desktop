import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, Input } from "antd";

export const FormContent = observer(function FormContent_() {
  const root = useStore();
  const { refs } = root;
  return (
    <Form className="mt-4" form={refs.form}>
      <Form.Item
        name="message"
        rules={[
          { required: true, message: "请输入留言内容", whitespace: true },
        ]}
      >
        <Input.TextArea
          placeholder="请输入留言内容"
          autoSize={false}
          rows={3}
          maxLength={500}
          showCount
        />
      </Form.Item>
    </Form>
  );
});
