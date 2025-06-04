import { DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import { useSelector } from "../store";

const Cancel = () => {
  const cancelForm = useSelector((x) => x.cancelForm);

  return (
    <div className={"px-4"}>
      <Form
        layout={"vertical"}
        initialValues={{
          confirmDate: dayjs(),
        }}
        form={cancelForm}
      >
        <Form.Item
          label={"作废备注"}
          name="operateMemo"
          rules={[{ required: true, message: "请输入备注" }]}
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
    </div>
  );
};

export default Cancel;
