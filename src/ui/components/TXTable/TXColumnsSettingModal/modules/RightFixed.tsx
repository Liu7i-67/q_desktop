import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { KeyRow } from "./KeyRow";

export const RightFixed = observer(function RightFixed_() {
  const root = useStore();
  const { logic } = root;
  return <KeyRow list={logic.rightList} title="固定在右侧" />;
});
