import { Button, Menu, Tooltip } from "antd";
import { MenuCollapsed } from "@/layout/svg";
import { cn } from "@/utils/tools";
import { usePersistFn } from "@quarkunlimit/react-hooks";
import { useLocation, useNavigate } from "react-router";
import UserHelper from "@/utils/user-helper";
import { routerList } from "@/router/router-list";
import { useMemo } from "react";
import { ItemType, MenuItemType, SubMenuType } from "antd/es/menu/interface";

interface IProps {
  collapsed: boolean;
  changeSiderCollapsed: () => void;
}

const userHelper = UserHelper.getInstance();

const MyMenu = (props: IProps) => {
  const { changeSiderCollapsed, collapsed } = props;
  const location = useLocation();

  const MenuItem = Menu.Item;
  const SubMenu = Menu.SubMenu;
  const navigate = useNavigate();

  const onClick = usePersistFn((e) => {
    navigate(`${e.key}`);
  });

  const menuItems = useMemo(() => {
    const items: ItemType[] = [];

    for (let m of routerList) {
      const auth = userHelper.checkPermission(m.auth);
      if (!auth || m.title === "") {
        continue;
      }

      if (!m.children) {
        const item: MenuItemType = {
          key: m.key,
          label: (
            <div className={"flex items-center"}>
              <div className="flex-shrink-0">{m.icon}</div>
              {!collapsed && <div className={"ml-2"}>{m.title}</div>}
            </div>
          ),
          onClick,
          className: "!flex items-center",
          title: m.title,
        };
        items.push(item);
        continue;
      }

      const subItems: SubMenuType = {
        key: m.key,
        label: (
          <div className={"flex items-center"}>
            <div>{m.icon}</div>
            {!collapsed && <div className={"ml-2"}>{m.title}</div>}
          </div>
        ),
        children: [],
      };

      for (let mc of m.children) {
        const auth = userHelper.checkPermission(mc.auth);
        if (!auth || mc.title === "") {
          continue;
        }
        const item: MenuItemType = {
          key: mc.key,
          label: (
            <div className={"flex items-center"}>
              <div>{mc.icon || <div className="w-4" />}</div>
              <div className={"ml-2"}>{mc.title}</div>
            </div>
          ),
          onClick,
          className: "!flex items-center",
          title: mc.title,
        };
        subItems.children.push(item);
      }
      items.push(subItems);
    }
    return items;
  }, [routerList, collapsed]);

  return (
    <div className={cn("relative w-full h-full", "py-4")}>
      <Menu
        className={cn("max-h-[calc(100vh-140px)] overflow-y-auto", "px-2")}
        selectedKeys={[location.pathname]}
        theme={"light"}
        mode={"inline"}
        inlineCollapsed={collapsed}
        items={menuItems}
      />
      <div
        className={cn(
          "w-full flex justify-center items-center",
          "absolute bottom-5"
        )}
      >
        {!collapsed ? (
          <Button type={"text"} onClick={changeSiderCollapsed}>
            <MenuCollapsed />
            收起侧边栏
          </Button>
        ) : (
          <Tooltip placement={"right"} title={"展开侧边栏"}>
            <Button type={"text"} onClick={changeSiderCollapsed}>
              <MenuCollapsed />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default MyMenu;
