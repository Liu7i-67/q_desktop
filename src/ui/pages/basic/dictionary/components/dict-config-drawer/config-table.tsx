import { Button, Pagination, Table } from "antd";
import { useSelector } from "@/pages/basic/dictionary/store";
import { useMount } from "@quarkunlimit/react-hooks";

const scroll: any = {
  x: "max-content",
  y: "calc(100vh - 376px)",
};

const ConfigTable = () => {
  const configColumns = useSelector((x) => x.configColumns);
  const { runGetDictValue } = useSelector((x) => x.api);
  const { getDictValue, openDictValueModal } = useSelector((x) => x.logic);
  const state = useSelector((x) => x.state);
  const { dictValueRecord } = state;

  useMount(() => {
    getDictValue();
  });

  return (
    <div>
      <div className={"mb-2"}>
        <Button
          type={"primary"}
          onClick={openDictValueModal}
          loading={runGetDictValue.loading}
        >
          新增
        </Button>
      </div>
      <>
        <Table
          scroll={scroll}
          loading={runGetDictValue.loading}
          columns={configColumns}
          dataSource={dictValueRecord}
          pagination={false}
        />
        <Pagination className={"mt-2"} align={"end"} />
      </>
    </div>
  );
};

export default ConfigTable;
