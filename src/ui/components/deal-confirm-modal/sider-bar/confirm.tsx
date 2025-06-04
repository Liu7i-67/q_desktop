import { Form, Input, InputNumber } from "antd";
import dayjs from "dayjs";
import { useSelector } from "../store";

const Confirm = () => {
  const FormItem = Form.Item;
  const confirmForm = useSelector((x) => x.confirmForm);

  return (
    <div className={"px-4"}>
      <Form
        layout={"vertical"}
        initialValues={{
          confirmDate: dayjs(),
        }}
        form={confirmForm}
      >
        {/* <FormItem
          label={'确认时间：'}
          name={'confirmDate'}
          key={'confirmDate'}
          rules={[
            {
              required: true,
              message: '确认时间为必填项',
            },
          ]}
        >
          <DatePicker className={'w-full'} />
        </FormItem> */}
        <FormItem
          label={"确认成交金额："}
          name={"confirmAmount"}
          key={"confirmAmount"}
          rules={[
            {
              required: true,
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
        </FormItem>
        <FormItem label={"确认备注："} name={"operateMemo"} key={"operateMemo"}>
          <Input.TextArea
            placeholder="清输入确认备注"
            maxLength={100}
            showCount
            rows={4}
            style={{ resize: "none" }}
          />
        </FormItem>
      </Form>
    </div>
  );
};

export default Confirm;
