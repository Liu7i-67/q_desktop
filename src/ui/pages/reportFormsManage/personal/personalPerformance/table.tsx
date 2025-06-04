import usePageTableScrollY from "@/hooks/usePageTableScrollY";
import { ReportCode } from "@/pages/reportFormsManage/types";
import { useMount } from "@quarkunlimit/react-hooks";
import { Pagination, Table as AntdTable } from "antd";
import { useSelector } from "../store";
import TXTable from "@/components/TXTable";

const Table = () => {
  const { runGetReportPagination } = useSelector((x) => x.api);
  const { getReportPagination, onChangePageSize } = useSelector((x) => x.logic);
  const state = useSelector((x) => x.state);
  const { dataSource, total, size, page } = state;
  const columns = useSelector((x) => x.columns);

  useMount(() => {
    getReportPagination(ReportCode.Personal_Performance_Schedule);
  });

  return (
    <div>
      <TXTable
        // @ts-ignore
        dataSource={dataSource}
        loading={runGetReportPagination.loading}
        scroll={{
          x: "max-content",
          y: "calc(100vh - 350px)",
        }}
        pagination={false}
        tableKey="REPORT_FORMS_MANAGE_PERSONAL"
        // @ts-ignore
        columns={columns}
      />
      <Pagination
        className={"mt-4"}
        // hideOnSinglePage={true}
        align={"end"}
        total={total}
        pageSize={size}
        current={page}
        onChange={(page, size) => onChangePageSize(page, size)}
        showTotal={(total) => `共 ${total} 条`}
        showSizeChanger
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  );
};

export default Table;
