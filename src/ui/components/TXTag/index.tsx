import { cn } from "@/utils/tools";

export const TXTag = function TXTag_(props: {
  color?: string;
  text: string;
  border?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const {
    color = "#3d7ce2",
    text,
    border = false,
    className = "",
    ...restProps
  } = props;

  let color_ = color;
  if (["", null, false].includes(color)) {
    color_ = "#3d7ce2";
  }

  return (
    <div
      {...restProps}
      className={cn(
        "inline-block px-2 py-1 text-[12px] rounded-md",
        border ? "border-[1px]" : "",
        className
      )}
      style={{
        backgroundColor: `${color_}20`,
        color: color_,
        borderColor: color_,
      }}
    >
      {text}
    </div>
  );
};
