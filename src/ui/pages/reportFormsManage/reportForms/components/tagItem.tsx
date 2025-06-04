import { Tag } from "antd";

const TagItem = (props: {
  color: string;
  text: string;
  bordered: boolean;
  onClick: () => void;
}) => {
  const { color, text, bordered, onClick } = props;
  return (
    <Tag
      color={color}
      bordered={bordered}
      className="
            px-2 py-1 cursor-pointer text-base
            hover:opacity-70 transition-opacity
          "
      onClick={onClick}
    >
      {text}
    </Tag>
  );
};

export default TagItem;
