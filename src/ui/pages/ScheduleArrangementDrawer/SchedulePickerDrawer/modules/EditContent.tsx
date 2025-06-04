import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Empty } from "antd";
import { EditRow } from "./EditRow";

export const EditContent = observer(function EditContent_() {
  const root = useStore();
  const { logic } = root;

  if (!logic.scheduleRelationDTOList.length) {
    return <Empty description="请从下方添加班次" />;
  }

  return (
    <div>
      {logic.scheduleRelationDTOList.map((w) => {
        return <EditRow key={w.workingShiftDTO.id} record={w} />;
      })}
    </div>
  );
});
