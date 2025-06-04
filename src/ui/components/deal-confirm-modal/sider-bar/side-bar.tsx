import ReactDOM from "react-dom";
import { cn } from "@/utils/tools";
import Content from "@/components/deal-confirm-modal/sider-bar/content";

const Sidebar = () => {
  const getContainer = () => {
    const dom =
      window.document.getElementsByClassName("ant-modal-content")?.[0] ??
      document.createElement("div");
    return dom;
  };
  return ReactDOM.createPortal(
    <div
      className={cn(
        "absolute right-[calc(50%-712px)] h-full bg-white w-[300px] top-0",
        "rounded-lg"
      )}
    >
      {/*<div className={''}>*/}
      {/*</div>*/}
      <Content />
    </div>,
    getContainer()
  );
};

export default Sidebar;
