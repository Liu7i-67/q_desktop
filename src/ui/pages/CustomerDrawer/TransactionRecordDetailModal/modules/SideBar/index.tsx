import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../../store/RootStore";
import { Header } from "./Header";
import { TabContent } from "./TabContent";
import { FormContent } from "./FormContent";

export const SideBar = observer(function SideBar_() {
  const root = useStore();
  const { logic } = root;
  if (!logic.initData?.tabKey) {
    return null;
  }
  return (
    <div className="absolute w-[300px] bg-white -right-[312px] h-full rounded-lg shadow-md top-0 py-[20px] px-[12px]">
      <Header />
      <TabContent />
      <FormContent />
    </div>
  );
});
