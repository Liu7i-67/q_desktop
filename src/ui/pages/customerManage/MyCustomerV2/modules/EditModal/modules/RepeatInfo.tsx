import { phoneValidator } from "@/utils/validator";
import { observer } from "@quarkunlimit/qu-mobx";
import { Form, FormListFieldData } from "antd";
import RepeatInfoHoc from "./RepeatInfoHOC";

export interface IRepeatInfoProps extends FormListFieldData {
  index: number;
  type: "phone" | "wechat";
  remove: (index: number | number[]) => void;
}

const RepeatFormItem = observer(function RepeatInfo_({
  index,
  type,
  remove,
  ...restField
}: IRepeatInfoProps) {
  return (
    <Form.Item
      {...restField}
      rules={
        type === "phone"
          ? [
              {
                validator: phoneValidator,
              },
            ]
          : []
      }
      noStyle
    >
      <RepeatInfoHoc type={type} remove={remove} index={index} />
    </Form.Item>
  );
});

export default RepeatFormItem;
