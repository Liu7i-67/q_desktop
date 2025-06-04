import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../../store/RootStore";

export const Header = observer(function Header_() {
  const root = useStore();
  const { computed } = root;

  return <div className="text-[16px] font-bold">{computed.subTitle}</div>;
});
