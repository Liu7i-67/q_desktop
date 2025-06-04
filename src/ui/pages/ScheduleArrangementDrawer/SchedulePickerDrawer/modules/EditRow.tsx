import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Card, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import TXTreeSelect, { useTXTreeSelectFetch } from "@/components/TXTreeSelect";
import { getXhsChannelSelectTree } from "@/utils/treeTransform";
import { TRecord } from "@/utils/interface";
import { TXTag } from "@/components/TXTag";
import { IBaseScheduleRelationDTO } from "../../service/interface";

export const EditRow = observer(function EditRow_(props: {
  record: IBaseScheduleRelationDTO;
}) {
  const root = useStore();
  const { logic } = root;
  const { record } = props;

  const dispatchOrgProps = useTXTreeSelectFetch({
    fetchDataApi: "/api/base/v1/channel-group/get-page",
    transformTree: (data) =>
      getXhsChannelSelectTree((data as TRecord)?.records || []),
    request: {
      size: 500,
      page: 1,
    },
  });

  return (
    <Card
      className="mb-2"
      size="small"
      styles={{
        body: {
          display: "flex",
          overflow: "hidden",
          alignItems: "center",
        },
      }}
    >
      <div className="w-[200px] wes">
        <TXTag
          color={record.workingShiftDTO.frontendExtension}
          text={record.workingShiftDTO.shiftName}
          className="cursor-pointer"
        ></TXTag>
      </div>
      <div className="flex-1 pl-4 pr-[60px]">
        <TXTreeSelect
          multiple
          className="w-full"
          placeholder="请选择渠道"
          {...dispatchOrgProps}
          value={record.webChannel}
          maxTagCount={3}
          labelInValue
          onChange={(e) => {
            console.log(e);
            logic.changeChannelInfo(e, record);
          }}
        />
      </div>
      <Popconfirm
        title="确认删除"
        description="是否确认删除该行数据？"
        onConfirm={() => {
          logic.deleteShift(record);
        }}
        okText="确认"
        cancelText="取消"
      >
        <a className="text-red-500 text-lg">
          <DeleteOutlined />
        </a>
      </Popconfirm>
    </Card>
  );
});
