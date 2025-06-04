import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button } from "antd";

export const Footer = observer(function Footer_(props: {
  OkBtn: React.FC;
  CancelBtn: React.FC;
}) {
  const root = useStore();
  const { logic } = root;
  const { OkBtn, CancelBtn } = props;
  return (
    <>
      <CancelBtn />
      <Button onClick={logic.resetAll}>重置</Button>
      <OkBtn />
    </>
  );
});
