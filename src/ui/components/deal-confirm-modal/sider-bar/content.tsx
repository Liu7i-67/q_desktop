import Header from "@/components/deal-confirm-modal/sider-bar/header";
import Confirm from "@/components/deal-confirm-modal/sider-bar/confirm";
import Cancel from "@/components/deal-confirm-modal/sider-bar/cancel";
import { useSelector } from "@/components/deal-confirm-modal/store";
import { EModalType } from "@/components/deal-confirm-modal/types";

const Content = () => {
  const state = useSelector((x) => x.state);
  const { currentType } = state;

  return (
    <div className={"w-full h-full"}>
      <Header />
      {currentType === EModalType.Confirm && <Confirm />}
      {currentType === EModalType.Cancel && <Cancel />}
    </div>
  );
};

export default Content;
