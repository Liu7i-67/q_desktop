import { Popover, Select, Tag, TreeSelect } from "antd";
import { RedBookSchedulingAuth } from "../../auth";
import { useSelector } from "./store";
import dayjs from "dayjs";
import { useState } from "react";
import { cn } from "@/utils/tools";
import { ITreeChannelGrouping } from "@/pages/SchedulingManagement/ChannelGrouping";

export const SchedulePicker = function SchedulePicker_(prop: {
  dayShifts: any;
  record: any;
  /** @param 当前选中内容 */
  webChannelIdList: any;
  date: any;
  index: number;
}) {
  const { dayShifts, record, date, index, webChannelIdList } = prop;
  const { weekData, shiftList, channelGroup } = useSelector((x) => x.state);
  const { updateWeekData } = useSelector((x) => x.logic);

  const [show, setShow] = useState(false);

  const realRecord = weekData.find(
    (item: any) =>
      item.userName === record.userName && item.scheduleDate === date
  );

  const tProps = {
    treeData: channelGroup as ITreeChannelGrouping[],
    treeCheckable: true,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };

  return (
    <>
      {!!realRecord?.channelRelationDTOList?.length && (
        <Popover
          content={
            <div className="max-w-[400px] max-h-[60vh] overflow-y-auto flex flex-wrap gap-2 wes">
              {realRecord?.channelRelationDTOList?.map((i: any) => {
                return i.channelDTOList?.map?.((c: any) => {
                  return (
                    <div
                      className="wes max-w-[280px]"
                      key={i.channelGroupId + c.channelId}
                    >
                      <Tag
                        key={i.channelGroupId + c.channelId}
                        color="blue"
                        bordered={false}
                      >
                        {i.channelGroupName}/{c.channelName}
                      </Tag>
                    </div>
                  );
                });
              })}
            </div>
          }
        >
          <div className=" absolute top-[-10px] left-[-10px] w-[0] h-[0] border-[rgba(0,0,0,0)] border-b-[#2d73e4] border-[10px] cursor-pointer transform rotate-[-45deg]"></div>
        </Popover>
      )}
      <Select
        disabled={!RedBookSchedulingAuth.redBookSchedulingUpdate}
        mode="multiple"
        showSearch
        allowClear
        className={show ? "border-[#1677ff] border-[1px] rounded-md" : ""}
        placeholder="选择班次"
        style={{ width: "100%" }}
        maxTagTextLength={3}
        maxTagCount={1}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        value={dayShifts.map((shift: any) => String(shift.id))}
        onChange={(values) => {
          // 获取当前用户在当前日期的完整记录
          const currentRecord = weekData.find(
            (item: any) =>
              item.userName === record.userName && item.scheduleDate === date
          ) || { ...record, webChannelIdList: [], channelRelationDTOList: [] };

          // 构建新的班次数据
          const selectedShifts = values.map((shiftId: any) => {
            const shift = shiftList.find((s: any) => String(s.id) === shiftId);
            return {
              id: shiftId,
              shiftName: shift?.shiftName || "",
              scheduleType: 0,
              timeSlot: shift?.timeSlot || "",
              createTime: `${date} 00:00:00`,
              updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            };
          });

          // 更新数据时保持原有记录的其他字段
          const newData = {
            ...currentRecord,
            userName: record.userName,
            userId: record.userId,
            scheduleDate: date,
            workingShiftDTOList: selectedShifts,
          };

          updateWeekData(record.userName, newData);
        }}
      >
        {shiftList.map((shift: any) => (
          <Select.Option key={String(shift.id)} value={String(shift.id)}>
            {shift.shiftName}
          </Select.Option>
        ))}
      </Select>
      <div
        className={cn(
          "absolute top-[0] w-[240px] h-full flex items-center z-[999]",
          show ? "" : "hidden",
          index < 2 ? "-right-[240px]" : "-left-[240px]"
        )}
      >
        <TreeSelect
          {...tProps}
          value={webChannelIdList}
          className="border-[#1677ff] border-[1px] rounded-md"
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          placeholder="请选择渠道"
          treeNodeFilterProp="title"
          treeDefaultExpandAll
          allowClear
          maxTagCount={1}
          maxTagTextLength={6}
          labelInValue
          onChange={(e) => {
            // 获取当前用户在当前日期的完整记录
            const currentRecord = weekData.find(
              (item: any) =>
                item.userName === record.userName && item.scheduleDate === date
            ) || {
              ...record,
              webChannelIdList: [],
              channelRelationDTOList: [],
            };

            // 更新数据时保持原有记录的其他字段
            const newData = {
              ...currentRecord,
              userName: record.userName,
              userId: record.userId,
              scheduleDate: date,
              webChannelIdList: e,
            };

            updateWeekData(record.userName, newData);
          }}
        />
      </div>
    </>
  );
};
