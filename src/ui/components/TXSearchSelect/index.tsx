import { Select } from "antd";
import { FC } from "react";
import type { ITXSearchSelectProps } from "./interface";

const TXSearchSelect: FC<ITXSearchSelectProps> = (props) => {
  return (
    <Select
      defaultActiveFirstOption={false}
      filterOption={false}
      showSearch
      allowClear
      maxTagCount={1}
      maxTagTextLength={6}
      {...props}
    />
  );
};

export default TXSearchSelect;

export * from "./interface";

export * from "./hook";
