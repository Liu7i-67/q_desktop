import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { KeyRow } from "./KeyRow";

export const LeftFixed = observer(function LeftFixed_() {
  const root = useStore();
  const { logic } = root;
  return <KeyRow list={logic.leftList} title="固定在左侧" />;
});
