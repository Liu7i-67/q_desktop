import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Timeline } from "antd";
import { RecordItem } from "./RecordItem";

export const List = observer(function List_() {
  const root = useStore();
  const { computed } = root;
  return computed.list.map((item, index) => {
    switch (item.type) {
      case "year": {
        return (
          <div
            key={`${item.type}_${index}`}
            className="bg-[#ebebeb] w-max tracking-[4px] px-2 text-[#999] text-[16px] font-bold rounded-md -ml-6"
          >
            {item.label}
          </div>
        );
      }
      case "day": {
        return (
          <div key={`${item.type}_${index}`} className="-ml-3 mb-1">
            {item.label}
          </div>
        );
      }
      case "timeline": {
        return (
          <Timeline
            key={`${item.type}_${index}`}
            items={item.records?.map((item, index) => ({
              color: "green",
              children: <RecordItem key={index} record={item} />,
            }))}
            pending
            pendingDot={<div></div>}
          />
        );
      }
      default:
        return "";
    }
  });
});
