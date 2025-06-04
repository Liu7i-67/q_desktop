import { observer } from "@quarkunlimit/qu-mobx";
import { ICustomerRecord } from "../interface";
import { Tag } from "antd";
import { operateTypeInfo } from "@/service/business/v1/customer-operate-log/get-page";

export const RecordItem = observer(function RecordItem_(props: {
  record: ICustomerRecord;
}) {
  const { record } = props;

  const info = operateTypeInfo[record.operateType || "NULL"];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 text-gray-600 mt-0.5">
        <span>{record.createTime}</span>
        <span>{record.createUsername}</span>
      </div>
      <div>
        <Tag color={info.color}>{info.text}</Tag>
      </div>
      <div className="text-gray-700">
        {record.operateMessage
          ?.split("\n")
          .map((line: string, index: number) => (
            <div key={index} className="leading-6">
              {line}
            </div>
          ))}
      </div>
    </div>
  );
});
