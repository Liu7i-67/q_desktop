import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Timeline } from "antd";
import { FeedBackItem } from "./FeedBackItem";
import { dispatchStatusInfo2 } from "@/service/business/v1/customer-dispatch/customer-dispatch-page";

export const FeedbackBox = observer(function FeedbackBox_() {
  const root = useStore();
  const { logic } = root;

  if (!logic.dataSource.length) {
    return (
      <div className="text-center text-gray-400 py-8">-- 暂无处理记录 --</div>
    );
  }

  return (
    <Timeline
      className="mt-4"
      items={logic.dataSource.map((item, index) => ({
        color: dispatchStatusInfo2[item.dispatchStatus || "EMPTY"].color,
        children: <FeedBackItem record={item} key={index} />,
      }))}
    />
  );
});
