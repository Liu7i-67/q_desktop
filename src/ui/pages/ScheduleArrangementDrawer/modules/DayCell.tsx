import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { TXTag } from "@/components/TXTag";
import { Popover, Tag } from "antd";

export const DayCell = observer(function DayCell_(props: { dateKey: string }) {
  const root = useStore();
  const { dateKey } = props;
  const { logic } = root;

  const record = logic.scheduleMap.get(dateKey);

  return (
    <div
      className="w-[120px] min-h-[22px] wes flex flex-wrap gap-1 items-start cursor-pointer"
      onClick={() => logic.onCellClick(dateKey)}
    >
      {record?.scheduleRelationDTOList?.map((r) => {
        return (
          <Popover
            content={
              <div className="w-[400px] max-h-[400px] overflow-y-auto flex flex-wrap gap-2">
                {r.channelRelationViewDTOList.map((g) => {
                  return g.channelDTOList.map((c) => {
                    return (
                      <Tag
                        key={`${g.channelGroupId}_${c.channelId}`}
                        color="blue"
                      >
                        {g.channelGroupName}/{c.channelName}
                      </Tag>
                    );
                  });
                })}
              </div>
            }
            key={r.workingShiftDTO.id}
          >
            <TXTag
              color={r.workingShiftDTO.frontendExtension || undefined}
              text={r.workingShiftDTO.shiftName}
            ></TXTag>
          </Popover>
        );
      })}
    </div>
  );
});
