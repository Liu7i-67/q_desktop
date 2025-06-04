import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Table } from "antd";
import { formatCurrency } from "@/utils/tools";
import { ColumnsType } from "antd/es/table";
import { IResDealItemDTO } from "@/service/business/v1/customer-deal";

export const TransactionList = observer(function TransactionList_() {
  const root = useStore();
  const { logic } = root;

  const columns: ColumnsType<IResDealItemDTO> = [
    {
      title: "名称",
      dataIndex: "dataName",
      key: "dataName",
    },
    {
      title: "金额",
      dataIndex: "amount",
      key: "amount",
      render: (text) => {
        return <div>￥{text}</div>;
      },
    },
  ];

  return (
    <div className="mt-8">
      <div className="text-[16px] font-bold text-primary mb-2 select-none">
        成交项目
      </div>
      <Table
        size="small"
        columns={columns}
        pagination={false}
        rowKey="id"
        dataSource={logic.detail?.dealItemDTOList || []}
        scroll={{
          x: "max-content",
        }}
        footer={() => {
          return (
            <div className={"flex items-center select-none"}>
              <div className={"text-[18px] font-bold mr-1"}>总计：</div>
              <div className={"text-money text-[16px] font-bold"}>
                ￥{formatCurrency(logic.detail?.amount || 0)}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
});
