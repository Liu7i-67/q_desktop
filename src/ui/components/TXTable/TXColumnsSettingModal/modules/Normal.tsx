import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { KeyRow } from "./KeyRow";

export const Normal = observer(function Normal_() {
  const root = useStore();
  const { logic } = root;
  return <KeyRow list={logic.renderList} title="不固定" />;
});
