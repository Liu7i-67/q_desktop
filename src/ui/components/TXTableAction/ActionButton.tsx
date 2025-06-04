import { Button, Popconfirm } from "antd";
import { TXButton } from "../TXButton";
import { ITableAction, ITXTableActionProps } from "./interface";

export const ActionButton = function ActionButton_(props: {
  action: ITableAction;
  onAction: ITXTableActionProps["onAction"];
}) {
  const { action, onAction } = props;
  const { type, label, popconfirm, onClick, icon, ...rest } = action;
  if (popconfirm) {
    return (
      <Popconfirm {...popconfirm}>
        <Button type={"link"} size={"small"}>
          {label}
        </Button>
      </Popconfirm>
    );
  }
  return (
    <TXButton
      type="link"
      size="small"
      icon={icon}
      onClick={() => {
        if (type && onAction) {
          onAction(type);
        }
        if (onClick) {
          onClick();
        }
      }}
      {...rest}
    >
      {label}
    </TXButton>
  );
};
