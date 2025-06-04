import { observer } from "@quarkunlimit/qu-mobx";
import { CalendarMode, DatePicker } from "antd";
import { Dayjs } from "dayjs";
import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

export const HeaderRender = observer(function HeaderRender_(props: {
  value: Dayjs;
  type: CalendarMode;
  onChange: (date: Dayjs) => void;
  onTypeChange: (type: CalendarMode) => void;
}) {
  return (
    <div className="flex items-center justify-between text-lg h-[60px] px-[24px]">
      <div className="text-[#999999]">任务日历</div>
      <div className="flex items-center select-none">
        <div className="w-[20px] h-[20px] hover:shadow-md hover:bg-[#fafafa] flex items-center justify-center rounded-[4px]">
          <LeftOutlined
            className="text-[#999999] text-[16px] cursor-pointer "
            onClick={() => {
              props.onChange(props.value.add(-1, "month"));
            }}
          />
        </div>
        <div className="relative w-[150px]">
          <DatePicker
            className="opacity-0"
            picker="month"
            value={props.value}
            format={"M月"}
            allowClear={false}
            onChange={(e) => {
              props.onChange(e);
            }}
          />
          <div className="pointer-events-none absolute w-full flex items-center justify-center  top-0 left-0">
            <span className="mr-2">{props.value.month() + 1}月</span>
            <CalendarOutlined className="text-[#458cef]" />
          </div>
        </div>
        <div className="w-[20px] h-[20px] hover:shadow-md hover:bg-[#fafafa] flex items-center justify-center rounded-[4px]">
          <RightOutlined
            className="text-[#999999] text-[16px] cursor-pointer "
            onClick={() => {
              props.onChange(props.value.add(1, "month"));
            }}
          />
        </div>
      </div>
      <div>
        <DatePicker
          picker="year"
          value={props.value}
          format={"YYYY年"}
          allowClear={false}
          onChange={(e) => {
            props.onChange(e);
          }}
        />
      </div>
    </div>
  );
});
