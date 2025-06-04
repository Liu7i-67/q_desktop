import { DatePicker, DatePickerProps, Form } from "antd";
import { Dayjs } from "dayjs";

const getYearMonth = (date: Dayjs) => date.year() * 12 + date.month();

export const DateRow = function DateRow_() {
  const disabled40DaysDate: DatePickerProps["disabledDate"] = (
    current,
    { from, type }
  ) => {
    if (current.isAfter()) {
      return true;
    }

    if (from) {
      const minDate = from.add(-6, "days");
      const maxDate = from.add(6, "days");

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
          return Math.abs(current.diff(from, "days")) >= 40;
      }
    }

    return false;
  };

  return (
    <Form.Item
      label="日期"
      name="localDateTime"
      rules={[
        {
          required: true,
          message: "请选择日期",
        },
      ]}
    >
      <DatePicker.RangePicker disabledDate={disabled40DaysDate} />
    </Form.Item>
  );
};
