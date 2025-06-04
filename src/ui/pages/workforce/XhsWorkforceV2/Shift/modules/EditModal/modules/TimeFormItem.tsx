import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, TimePicker } from "antd";
import { useWatch } from "antd/es/form/Form";
import dayjs from "dayjs";

const TimeFormItem = observer(() => {
  const root = useStore();
  const { refs } = root;

  const timeSlot: dayjs.Dayjs[] = useWatch("timeSlot", refs.editForm) || [];

  const isCross =
    timeSlot[0] && timeSlot[1] && timeSlot[1].isBefore(timeSlot[0]);

  return (
    <>
      <Form.Item
        label="时间段"
        name="timeSlot"
        rules={[
          { required: true, message: "请选择时间段" },
          {
            validator: (_, value) => {
              if (!value || value.length !== 2) return Promise.resolve();
              const [start, end] = value;
              if (start.isSame(end)) {
                return Promise.reject(new Error("开始时间和结束时间不能相同"));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <TimePicker.RangePicker
          format="HH:mm:ss"
          placeholder={["开始时间", "结束时间"]}
          style={{ width: "100%" }}
          order={false}
        />
      </Form.Item>
      {isCross && (
        <div className="text-[orangered] -mt-[16px] mb-4">
          当前班次为跨天班次
        </div>
      )}
    </>
  );
});

export default TimeFormItem;
