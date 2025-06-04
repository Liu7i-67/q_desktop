import { observer } from "@quarkunlimit/qu-mobx";
import { IInstitutionalFeedbackRecord } from "../interface";
import { Flex, Tag, Image } from "antd";
import { dispatchStatusInfo2 } from "@/service/business/v1/customer-dispatch/customer-dispatch-page";

export const FeedBackItem = observer(function FeedBackItem_(props: {
  record: IInstitutionalFeedbackRecord;
}) {
  const { record } = props;
  let info = dispatchStatusInfo2[record.dispatchStatus || "EMPTY"];

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2">
        <span className="text-gray-400 text-sm mt-0.5">
          {record.createTime}
        </span>
        <Tag color={info.color}>{info.text}</Tag>
      </div>
      {record?.operateImg && (
        <Flex wrap gap="middle">
          {record?.operateImg?.map((img, mIndex) => (
            <Image width={100} src={img?.fullPath} key={mIndex} />
          ))}
        </Flex>
      )}
      <div className="mt-2">{record.memo || "-"}</div>
    </div>
  );
});
