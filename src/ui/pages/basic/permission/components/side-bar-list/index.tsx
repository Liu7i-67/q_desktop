import { cn } from "@/utils/tools";

interface IProps {
  /**
   * @list 列表数据
   */
  list: {
    id: string;
    roleName?: string;
    userName?: string;
  }[];
  /**
   * @checkedId 当前选中的id
   */
  checkedId: string;
  /**
   * @onClick 点击事件
   * @param id
   */
  onClick: (id: string) => void;
}

const SideBarList = (props: IProps) => {
  const { list, checkedId, onClick } = props;
  return (
    <div>
      {list.map((item: any) => {
        const { id, roleName, userName } = item;
        return (
          <div
            className={cn(
              "py-4 pl-2 select-none",
              "rounded-sm cursor-pointer",
              "hover:bg-blue-200 duration-100 ease-in-out hover:font-medium",
              id === checkedId
                ? "bg-blue-400/90 text-white font-medium hover:bg-blue-400"
                : ""
            )}
            key={id}
            onClick={() => {
              onClick(id);
            }}
          >
            <p className={"max-w-[280px] truncate"}>{roleName ?? userName}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SideBarList;
