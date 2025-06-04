import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Timeline } from "antd";

export const MessageBox = observer(function MessageBox_() {
  const root = useStore();
  const { logic } = root;

  if (!logic.dataSource.length) {
    return (
      <div className="text-center text-gray-400 py-8">-- 还没有留言 --</div>
    );
  }

  return (
    <Timeline
      className="mt-4"
      items={logic.dataSource.map((item, index) => ({
        children: (
          <div key={index}>
            <div className="text-gray-400 text-sm">{item.createTime}</div>
            <div className="mt-1">{item.message}</div>
          </div>
        ),
      }))}
    />
  );
});
