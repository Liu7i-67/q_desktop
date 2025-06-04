import { Tooltip } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

const RemovePhone = (props: {
  index: number;
  remove: (index: number) => void;
}) => {
  return (
    props.index > 0 && (
      <Tooltip placement={"top"} title={"移除"}>
        <MinusCircleOutlined
          className={
            "text-red-200 hover:text-red-500 hover:cursor-pointer ease-in-out duration-300"
          }
          onClick={() => props.remove(props.index)}
        />
      </Tooltip>
    )
  );
};

export default RemovePhone;
