import { observer, useWhen } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import Calendar from "./modules/Calendar";
import ScheduleArrangementDrawer from "@/pages/ScheduleArrangementDrawer";
import { cn } from "@/utils/tools";
import { useEffect } from "react";

const Schedule = observer(function Schedule_({
  visible,
}: {
  visible: boolean;
}) {
  const root = useStore();
  const { logic, refs } = root;

  useEffect(() => {
    if (visible) {
      logic.getScheduleData();
    }
  }, [visible]);

  return (
    <div className={cn("", visible ? "" : "hidden")}>
      <Calendar />
      <ScheduleArrangementDrawer
        ref={refs.drawerRef}
        afterClose={() => logic.getScheduleData()}
      />
    </div>
  );
});

export default observer(function SchedulePage(props: { visible: boolean }) {
  return (
    <Provider>
      <Schedule {...props} />
    </Provider>
  );
});
