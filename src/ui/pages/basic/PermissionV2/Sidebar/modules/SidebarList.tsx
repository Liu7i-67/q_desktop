import { observer } from "@quarkunlimit/qu-mobx";
import { Spin, Pagination } from "antd";
import { useStore } from "../store/RootStore";
import { cn } from "@/utils/tools";

const SidebarList = observer(() => {
  const root = useStore();
  const { logic, computed } = root;

  return (
    <Spin spinning={computed.sideListLoading}>
      <div
        className={cn(
          "h-[calc(100vh-240px)] overflow-y-auto",
          "mb-2",
          "w-full"
        )}
      >
        {logic.sideList.map((item: { id: string; name: string }) => {
          const { id, name } = item;
          return (
            <div
              className={cn(
                "py-4 pl-2 select-none",
                "rounded-sm cursor-pointer",
                "hover:bg-blue-200 duration-100 ease-in-out hover:font-medium",
                id === logic.checkId
                  ? "bg-blue-400/90 text-white font-medium hover:bg-blue-400"
                  : ""
              )}
              key={id}
              onClick={() => logic.onChecked(id)}
            >
              <p className={"max-w-[280px] truncate"}>{name}</p>
            </div>
          );
        })}
      </div>
      <Pagination
        className={"flex justify-center"}
        size="small"
        current={logic.pagination.current}
        pageSize={20}
        total={logic.pagination.total}
        showSizeChanger={false}
        onChange={(p) => logic.onPageChange(p)}
      />
    </Spin>
  );
});

export default SidebarList;
