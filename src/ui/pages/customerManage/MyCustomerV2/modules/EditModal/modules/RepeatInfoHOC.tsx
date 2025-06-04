import { cn } from "@/utils/tools";
import { observer } from "@quarkunlimit/qu-mobx";
import { Form, Input } from "antd";
import { ChangeEvent } from "react";
import { useStore } from "../store/RootStore";
import RemovePhone from "./RemovePhone";
import { IRepeatInfoProps } from "./RepeatInfo";

export interface IRepeatInfoHocProps
  extends Pick<IRepeatInfoProps, "type" | "index" | "remove"> {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RepeatInfoHoc = observer(function RepeatInfoHoc_(
  props: IRepeatInfoHocProps
) {
  const { index, remove, type, ...rest } = props;
  const root = useStore();
  const { logic, refs } = root;
  const formValue = Form.useWatch((values) => values, refs.editForm);

  const handleJudgeRepeat = () => {
    const formData =
      type === "phone"
        ? (formValue?.phoneNumber ?? [])
        : (formValue?.wechatNumber ?? []);

    const repeatList = logic.repeatList.reduce(
      (prev: { index: number; ownerName: string }[], item, idx) => {
        if (item.value.includes(formData[index])) {
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
      <Input
        {...rest}
        placeholder="请输入客户电话"
        suffix={<RemovePhone index={index} remove={remove} />}
      />
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

export default RepeatInfoHoc;
