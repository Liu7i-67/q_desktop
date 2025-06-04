import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, InputNumber } from "antd";
import { BigNumber } from "@/utils/BigNumber";
import { useEffect } from "react";

export const AmountRow = observer(function AmountRow_() {
  const root = useStore();
  const { logic, refs } = root;

  const itemPostDTOList = Form.useWatch("itemPostDTOList", refs.form);

  console.log("itemPostDTOList:", itemPostDTOList);

  useEffect(() => {
    const total = new BigNumber(0);
    for (let item of itemPostDTOList || []) {
      if (typeof item?.amount !== "number") {
        continue;
      }
      total.plus(item.amount);
    }
    refs.form.setFieldsValue({ amount: total.getNumber() || undefined });
  }, [itemPostDTOList]);

  return (
    <Form.Item label="总成交金额" name="amount" className="flex-1">
      <InputNumber
        className="w-full"
        precision={2}
        readOnly
        addonBefore="￥"
        placeholder="请设置成交项目的成交金额"
      />
    </Form.Item>
  );
});
