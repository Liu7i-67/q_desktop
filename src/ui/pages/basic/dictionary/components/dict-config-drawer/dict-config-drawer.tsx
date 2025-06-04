import { Button, Tag } from "antd";
import { Drawer } from "@/components/TXDrawer";
import { useSelector } from "@/pages/basic/dictionary/store";
import ConfigTable from "@/pages/basic/dictionary/components/dict-config-drawer/config-table";

const DictConfigDrawer = () => {
  const state = useSelector((x) => x.state);
  const { currentEditName, currentEditCode, dictValueDrawerVisible } = state;
  const { closeDictValueDrawer } = useSelector((x) => x.logic);
  return (
    <Drawer
      open={dictValueDrawerVisible}
      width={"60%"}
      title={"字典配置"}
      onClose={closeDictValueDrawer}
      footer={
        <div className={"w-full flex justify-end"}>
          <Button onClick={closeDictValueDrawer}>关闭</Button>
        </div>
      }
    >
      <div className={"px-4"}>
        <div className={"text-[16px] font-bold mb-2"}>当前编辑字典：</div>
        <div className={"flex items-center"}>
          <div className={"mr-2"}>
            <span className={"mr-1"}>字典编码：</span>
            <Tag>{currentEditCode}</Tag>
          </div>
          <div>
            <span className={"mr-1"}>字典名称：</span>
            <Tag>{currentEditName}</Tag>
          </div>
        </div>
        {/*分割线*/}
        <div className={"w-full h-[1px] bg-gray-200/50 my-4"} />
        <ConfigTable />
      </div>
    </Drawer>
  );
};

export default DictConfigDrawer;
