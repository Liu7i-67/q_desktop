import { Form, Select } from "antd";
import { IOption } from "@/utils/interface";
import { useEffect, useMemo } from "react";
import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { customerTypeOptions } from "@/utils/enum/modules/customerType";

const INVALID_LABELS = ["未成年", "无医美意向"];

function isLocked(labels?: IOption[]): boolean {
  return labels?.some((item) => INVALID_LABELS.includes(item.label)) ?? false;
}

const CustomerTypeField = observer(() => {
  const { refs } = useStore();
  const labelValueList = Form.useWatch("labelValueList", refs.editForm) as
    | IOption[]
    | undefined;

  const lock = useMemo(() => isLocked(labelValueList), [labelValueList]);

  useEffect(() => {
    if (lock) {
      refs.editForm.setFieldValue("customerType", "INVALID_CUSTOMER");
    }
  }, [lock]);

  return (
    <div>
      <Form.Item name="customerType" label="客户类型">
        <Select
          placeholder="请选择客户类型"
          options={customerTypeOptions}
          disabled={lock}
          allowClear
        />
      </Form.Item>
      {lock && (
        <div className="text-red-400 -mt-[20px]">无效客户不支持修改</div>
      )}
    </div>
  );
});

export default CustomerTypeField;
