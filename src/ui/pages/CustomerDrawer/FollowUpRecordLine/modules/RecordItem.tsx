import { observer } from "@quarkunlimit/qu-mobx";
import { IFollowUpRecord } from "../interface";
import { CustomerSSvg } from "../svg";

export const RecordItem = observer(function RecordItem_(props: {
  record: IFollowUpRecord;
}) {
  const { record } = props;

  return (
    <div className="flex flex-col gap-2 shadow-md bg-[#fff] rounded-md py-2 px-4">
      <div className="flex items-center gap-2">
        {CustomerSSvg}
        <span className="text-[16px] font-bold">{record.createUserName}</span>
        <span className="text-[#666] flex-1">添加跟进内容</span>
        <span className="text-[#999] text-xs">{record.createTime}</span>
      </div>
      <div className="flex items-center gap-4 text-gray-600 mt-0.5">
        {record.memo}
      </div>
    </div>
  );
});
