import { handleCopy } from "@/utils/tools";

const TableRestPasswordDes: React.FC = () => {
  return (
    <div className={"text-sm text-gray-400 flex items-center"}>
      初始密码：
      <p
        className={"text-md text-black hover:underline cursor-pointer"}
        onClick={() => {
          handleCopy("tx123456");
        }}
      >
        tx123456
      </p>
    </div>
  );
};

export default TableRestPasswordDes;
