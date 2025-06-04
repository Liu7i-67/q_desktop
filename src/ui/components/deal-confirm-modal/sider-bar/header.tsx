import { useSelector } from "@/components/deal-confirm-modal/store";
import { EModalType } from "@/components/deal-confirm-modal/types";
import { cn } from "@/utils/tools";
import { CloseOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useMemo } from "react";

const items: TabsProps["items"] = [
  // {
  //   key: EModalType.Review,
  //   label: "成交审查",
  // },
  {
    key: EModalType.Confirm,
    label: "确认成交",
  },
  {
    key: EModalType.Cancel,
    label: "成交取消",
  },
];

const itemKeyTypeMap: { [key: string]: any } = {
  // [EModalType.Review]: "1",
  [EModalType.Confirm]: "2",
  [EModalType.Cancel]: "3",
};

const Header = () => {
  const state = useSelector((x) => x.state);

  const { currentType } = state;

  const { onChangeModalType } = useSelector((x) => x.logic);

  const renderHeader = useMemo(() => {
    switch (currentType) {
      case EModalType.Confirm:
        return "确认成交";
      case EModalType.Cancel:
        return "取消成交";
      // case EModalType.Review:
      //   return '成交审查';
      default:
        return null;
    }
  }, [currentType]);

  return (
    <div className={cn("w-full px-4 pt-3")}>
      <div className={cn("flex items-center justify-between", "select-none")}>
        <p className={"text-[16px] font-[600]"}>{renderHeader}</p>
        <div
          className={cn(
            "w-[32px] h-[32px] flex justify-center items-center rounded-md",
            "cursor-pointer",
            "p-2",
            "hover:bg-[rgba(0,0,0,0.08)] ease-in-out duration-300"
          )}
        >
          {/* <CloseOutlined /> */}
        </div>
      </div>
      <Tabs
        activeKey={currentType}
        items={items}
        onChange={(key: string) => {
          onChangeModalType(itemKeyTypeMap[key]);
        }}
      />
    </div>
  );
};

export default Header;
