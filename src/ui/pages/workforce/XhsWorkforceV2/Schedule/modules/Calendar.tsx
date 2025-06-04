import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Calendar as AntCalendar, Button } from "antd";
import CalendarCell from "./CalendarCell";
import { ReloadOutlined } from "@ant-design/icons";

const Calendar = observer(() => {
  const root = useStore();
  const { logic, refs } = root;

  return (
    <div className="h-[calc(100vh-250px)] flex flex-col">
      <div className="flex-1 overflow-auto relative">
        <Button
          className="ml-2 absolute top-[12px] right-[290px]"
          icon={<ReloadOutlined />}
          onClick={logic.getScheduleData}
        >
          刷新
        </Button>
        <AntCalendar
          className={"px-4"}
          mode="month"
          fullscreen={true}
          cellRender={(date) => <CalendarCell date={date} />}
          onSelect={(date, { source }: { source: string }) => {
            if (source === "date") {
              refs.drawerRef.current?.openDrawer({ date });
            }
          }}
          onPanelChange={(date) => logic.changeMonth(date)}
        />
      </div>
    </div>
  );
});

export default Calendar;
