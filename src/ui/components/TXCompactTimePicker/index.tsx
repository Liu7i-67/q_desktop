import { Space, TimePicker } from "antd";
import { Dayjs } from "dayjs";

export interface ITXCompactTimePickerProps {
  placeholderList?: [string | undefined, string | undefined];
  value?: [Dayjs | null, Dayjs | null];
  onChange?: (value: [Dayjs | null, Dayjs | null]) => void;
}

export const TXCompactTimePicker = function TXCompactTimePicker_(
  props: ITXCompactTimePickerProps
) {
  const { value, placeholderList = ["开始时间", "结束时间"], onChange } = props;
  const [start, end] = value || [null, null];
  const [startPlaceholder, endPlaceholder] = placeholderList;

  return (
    <Space.Compact>
      <TimePicker
        style={{ width: "50%" }}
        value={start}
        placeholder={startPlaceholder}
        onChange={(e) => {
          onChange?.([e, end]);
        }}
      />
      <TimePicker
        style={{ width: "50%" }}
        value={end}
        placeholder={endPlaceholder}
        onChange={(e) => {
          onChange?.([start, e]);
        }}
      />
    </Space.Compact>
  );
};
