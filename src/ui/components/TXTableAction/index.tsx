import { Button, Dropdown } from "antd";
import { ITableAction, ITXTableActionProps } from "./interface";
import { ItemType } from "antd/es/menu/interface";
import { ActionButton } from "./ActionButton";

export const TXTableAction = function TXTableAction_(
  props: ITXTableActionProps
) {
  const { maxCount = 3, actions, className = "", onAction } = props;

  const showActions: ITableAction[] = [];
  const items: ItemType[] = [];

  for (let a of actions) {
    if (!a.auth) {
      continue;
    }
    if (showActions.length < maxCount) {
      showActions.push(a);
      continue;
    }
    items.push({
      key: items.length,
      label: <ActionButton action={a} onAction={onAction} />,
    });
  }

  if (items.length > 0) {
    const last = showActions.pop();
    if (last) {
      const { type, label, onClick, ...rest } = last;
      items.unshift({
        key: items.length,
        label: <ActionButton action={last} onAction={onAction} />,
      });
    }
  }

  return (
    <div className={`flex flex-wrap wes items-center ${className}`}>
      {showActions.map((action, index) => {
        return <ActionButton action={action} key={index} onAction={onAction} />;
      })}
      {!!items.length && (
        <Dropdown
          menu={{
            items,
          }}
          trigger={["hover"]}
        >
          <Button size={"small"} type={"link"}>
            更多
          </Button>
        </Dropdown>
      )}
    </div>
  );
};
