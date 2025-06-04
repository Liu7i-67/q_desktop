import usePageTableScrollY from "@/hooks/usePageTableScrollY";
import { useMount } from "@quarkunlimit/react-hooks";
import { Button, Table as AntdTable } from "antd";
import { useEffect } from "react";
import { useSelector } from "./store";

const Table = () => {
  const state = useSelector((x) => x.state);
  const { currentSideId, searchPermissionTree, expandPermissionKeys } = state;

  const {
    getTargetPermission,
    getPermissionTree,
    handleExpandRowsChange,
    handleSavePermission,
  } = useSelector((x) => x.logic);

  const { runGetPermissionTree, runSetPermission, runGetTargetPermission } =
    useSelector((x) => x.api);

  const { scrollY } = usePageTableScrollY({
    hasPagination: false,
    gapWithFormAndTable: 0,
  });

  useMount(() => {
    getPermissionTree();
  });

  useEffect(() => {
    if (currentSideId !== "") {
      getTargetPermission();
    }
  }, [currentSideId]);

  const columns = useSelector((x) => x.columns);

  return (
    <div className={""}>
      <AntdTable
        loading={
          runGetPermissionTree.loading ||
          runSetPermission.loading ||
          runGetTargetPermission.loading
        }
        columns={columns}
        dataSource={searchPermissionTree}
        scroll={{
          x: "max-content",
          y: scrollY,
        }}
        rowKey="id"
        expandable={{
          childrenColumnName: "childList",
          expandedRowKeys: expandPermissionKeys,
          onExpandedRowsChange: handleExpandRowsChange,
        }}
        pagination={false}
      />
      <div className="flex justify-end items-center mt-3">
        <span className="text-red-500">
          注意：在编辑完权限后请点击此按钮进行保存
        </span>
        <Button
          className="ml-3"
          type="primary"
          onClick={() => handleSavePermission()}
        >
          保存
        </Button>
      </div>
    </div>
  );
};
export default Table;
