import Table from "antd/es/table";
import { useSelector } from "@/components/deal-confirm-modal/store";
import InfoTitle from "@/components/deal-confirm-modal/deal-info/info-title";
import { formatCurrency } from "@/utils/tools";

const scroll: any = {
  x: "max-content",
  y: "140px",
};

const DealItemTable = () => {
  const columns = useSelector((x) => x.columns);
  const state = useSelector((x) => x.state);

  const { dealItemList, dealInfo } = state;

  return (
    <>
      <InfoTitle title={"成交项目"} />
      <Table
        columns={columns}
        pagination={false}
        dataSource={dealItemList}
        scroll={scroll}
        footer={() => {
          return (
            <div className={"flex items-center select-none"}>
              <div className={"text-[18px] font-bold mr-1"}>总计：</div>
              <div className={"text-money text-[16px] font-bold"}>
                ￥{formatCurrency(dealInfo.amount)}
              </div>
            </div>
          );
        }}
      />
    </>
  );
};

export default DealItemTable;
