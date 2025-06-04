import { ReportCode } from "@/pages/reportFormsManage/types";
import { useMount } from "@quarkunlimit/react-hooks";
import { useSelector } from "../store";
import PanelForm from "./option";
import Panel from "./panel";

const PersonalPanel = () => {
  const { getPanelData } = useSelector((x) => x.logic);

  useMount(() => {
    getPanelData(ReportCode.Personal_Performance_Schedule);
  });

  return (
    <>
      <PanelForm />
      <Panel />
    </>
  );
};

export default PersonalPanel;
