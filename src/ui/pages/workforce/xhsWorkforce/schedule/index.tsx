import { Provider, useSelector } from "./store";
import Calendar from "./calendar";
import Drawer from "./drawer";
import ScheduleArrangementDrawer from "@/pages/ScheduleArrangementDrawer";

const Schedule = () => {
  const drawerRef = useSelector((x) => x.drawerRef);
  const getMonthData = useSelector((x) => x.logic.getMonthData);
  const date = useSelector((x) => x.state.currentMonth);

  return (
    <>
      <Calendar />
      <Drawer />
      <ScheduleArrangementDrawer
        ref={drawerRef}
        afterClose={() => {
          getMonthData(date);
        }}
      />
    </>
  );
};

export default () => {
  return (
    <Provider>
      <Schedule />
    </Provider>
  );
};
