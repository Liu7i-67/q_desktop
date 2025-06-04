import { useSelector } from "./store";
import { useEffect } from "react";
import TXTable from "@/components/TXTable";

const scroll: any = {
  x: "max-content",
  y: "calc(100vh - 400px)",
};

const Table = () => {
  const { runGetData } = useSelector((x) => x.api);
  const { getData } = useSelector((x) => x.logic);
  const state = useSelector((x) => x.state);
  const { dataSource } = state;
  const columns = useSelector((x) => x.columns);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <TXTable
        dataSource={dataSource}
        loading={runGetData.loading}
        scroll={scroll}
        pagination={false}
        columns={columns}
        tableKey="SHIFT_MANAGEMENT"
      />
    </div>
  );
};

export default Table;
