import dayjs, { Dayjs } from "dayjs";

export const getWeekRange = (date?: Dayjs) => {
  const currentDate = dayjs(date);
  // 获取当前日期是周几，0 代表周日，1 - 6 代表周一到周六
  const dayOfWeek = currentDate.day();

  // 计算周一的日期
  const monday =
    dayOfWeek === 0
      ? currentDate.subtract(6, "day")
      : currentDate.subtract(dayOfWeek - 1, "day");

  return [
    monday.format("YYYY-MM-DD"),
    monday.add(1, "day").format("YYYY-MM-DD"),
    monday.add(2, "day").format("YYYY-MM-DD"),
    monday.add(3, "day").format("YYYY-MM-DD"),
    monday.add(4, "day").format("YYYY-MM-DD"),
    monday.add(5, "day").format("YYYY-MM-DD"),
    monday.add(6, "day").format("YYYY-MM-DD"),
  ];
};

export const weekDays = [
  "周一",
  "周二",
  "周三",
  "周四",
  "周五",
  "周六",
  "周日",
];
