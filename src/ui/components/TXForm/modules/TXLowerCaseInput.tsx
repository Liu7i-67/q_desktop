import { Input, InputProps } from "antd";

export interface ITXLowerCaseInputProps extends InputProps {
  /** @param 是否需要trim */
  needTrim?: boolean;
}

export const TXLowerCaseInput = function TXLowerCaseInput_(
  props: ITXLowerCaseInputProps
) {
  const { onChange, needTrim, ...rest } = props;
  return (
    <Input
      {...rest}
      onChange={(e) => {
        let val = e.target.value;
        if (val) {
          val = val.toLocaleLowerCase();
        }
        if (val && needTrim) {
          val = val.trim();
        }
        onChange?.({
          ...e,
          target: {
            ...e.target,
            value: val,
          },
        });
      }}
    />
  );
};
