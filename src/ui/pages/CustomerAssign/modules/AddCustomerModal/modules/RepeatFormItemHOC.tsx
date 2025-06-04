import { cn } from "@/utils/tools";
import { observer } from "@quarkunlimit/qu-mobx";
import { Form, Input } from "antd";
import { ChangeEvent } from "react";
import { useStore } from "../store/RootStore";

export interface IRepeatFormItemHOCProps {
  type: "phone" | "wechat";
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RepeatFormItemHOC = observer(function RepeatFormItemHOC_(
  props: IRepeatFormItemHOCProps
) {
  const { type, ...rest } = props;
  const root = useStore();
  const { logic, refs } = root;
  const formValue = Form.useWatch((values) => values, refs.addCustomerForm);
  const placeholder = type === "phone" ? "请输入客户电话" : "请输入客户微信";

  const handleJudgeRepeat = () => {
    const formData =
      type === "phone"
        ? (formValue?.phoneNumber ?? "")
        : (formValue?.wechatNumber ?? "");

    const repeatList = logic.repeatList.reduce(
      (prev: { index: number; ownerName: string }[], item, idx) => {
        if (item.value.includes(formData)) {
          return [
            ...prev,
            {
              ownerName: item.ownerName,
              index: idx,
            },
          ];
        }
        return [...prev];
      },
      []
    );

    return repeatList;
  };

  const repeatList = handleJudgeRepeat();

  return (
    <div>
      <Input {...rest} placeholder={placeholder} />
      {
        <span
          className={cn(
            "hidden",
            Boolean(repeatList.length) ? "text-red-500 inline" : ""
          )}
        >
          该联系方式重复,客户当前归属于{repeatList[0]?.ownerName}
        </span>
      }
    </div>
  );
});

export default RepeatFormItemHOC;
