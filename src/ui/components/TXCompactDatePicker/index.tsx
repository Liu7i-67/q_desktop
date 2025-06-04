import { DatePicker, Space } from "antd";
import { Dayjs } from "dayjs";

export interface ITXCompactDatePickerProps {
  placeholderList?: [string | undefined, string | undefined];
  value?: [Dayjs | null, Dayjs | null];
  onChange?: (value: [Dayjs | null, Dayjs | null]) => void;
  disabledStartDate?: (current: Dayjs) => boolean;
  disabledEndDate?: (current: Dayjs) => boolean;
}

export const TXCompactDatePicker = function TXCompactDatePicker_(
  props: ITXCompactDatePickerProps
) {
  const {
    value,
    placeholderList = ["开始日期", "结束日期"],
    onChange,
    disabledStartDate,
    disabledEndDate,
  } = props;
  const [start, end] = value || [null, null];
  const [startPlaceholder, endPlaceholder] = placeholderList;

  return (
    <Space.Compact>
      <DatePicker
        style={{ width: "50%" }}
        value={start}
        placeholder={startPlaceholder}
        onChange={(e) => {
          onChange?.([e, end]);
        }}
        disabledDate={disabledStartDate}
      />
      <DatePicker
        style={{ width: "50%" }}
        value={end}
        placeholder={endPlaceholder}
        onChange={(e) => {
          onChange?.([start, e]);
        }}
        disabledDate={disabledEndDate}
      />
    </Space.Compact>
  );
};
