import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button, DatePicker, Form, Input } from "antd";
import { DateSvg, MemoSvg } from "../svg";

export const LeftForm = observer(function LeftForm_() {
  const root = useStore();
  const { logic, refs, computed } = root;
  return (
    <Form layout="vertical" className="mt-2" form={refs.followUpForm}>
      <Form.Item
        label={
          <>
            {MemoSvg}
            <span className="ml-1">跟进内容</span>
          </>
        }
        name="memo"
        rules={[{ required: true, message: "请输入跟进内容" }]}
      >
        <Input.TextArea
          placeholder="请输入跟进内容"
          autoSize={{ minRows: 4, maxRows: 8 }}
          maxLength={200}
          showCount
          style={{ resize: "vertical" }}
        />
      </Form.Item>
      <Form.Item
        label={
          <>
            {DateSvg}
            <span className="ml-1">下次跟进时间</span>
          </>
        }
        name="nextDate"
      >
        <DatePicker
          disabledDate={(current) => {
            return current && current.startOf("day").valueOf() <= Date.now();
          }}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Button
        type="primary"
        block
        onClick={() => logic.onSubmit()}
        loading={computed.addLoding}
      >
        提交
      </Button>
    </Form>
  );
});
