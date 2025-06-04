import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import {
  DatePicker,
  DatePickerProps,
  TimeRangePickerProps,
  Tooltip,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const getYearMonth = (date: Dayjs) => date.year() * 12 + date.month();

export const RangeCell = observer(function RangeCell_() {
  const root = useStore();
  const { logic } = root;

  const disabled3MonthsDate: DatePickerProps["disabledDate"] = (
    current,
    { from, type }
  ) => {
    if (from) {
      const minDate = from.add(-3, "months");
      const maxDate = from.add(3, "months");

      switch (type) {
        case "year":
          return (
            current.year() < minDate.year() || current.year() > maxDate.year()
          );

        case "month":
          return (
            getYearMonth(current) < getYearMonth(minDate) ||
            getYearMonth(current) > getYearMonth(maxDate)
          );

        default:
          return Math.abs(current.diff(from, "months")) > 3;
      }
    }

    return false;
  };

  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "昨天", value: [dayjs().add(-1, "d"), dayjs()] },
    { label: "近一周", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "近两周", value: [dayjs().add(-14, "d"), dayjs()] },
    { label: "近一个月", value: [dayjs().add(-1, "months"), dayjs()] },
    { label: "近三个月", value: [dayjs().add(-3, "months"), dayjs()] },
  ];

  return (
    <div>
      <span>日期：</span>
      <DatePicker.RangePicker
        disabledDate={disabled3MonthsDate}
        presets={rangePresets}
      />
      <Tooltip title="当前仅支持查询不超过三个月的时间范围">
        <ExclamationCircleOutlined className="ml-2 cursor-pointer" />
      </Tooltip>
    </div>
  );
});
