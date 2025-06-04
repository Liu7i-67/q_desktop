import { observer } from "@quarkunlimit/qu-mobx";
import { Tag } from "antd";
import { useStore } from "../store/RootStore";

export const ConfigDrawerTitle = observer(function ConfigDrawerTitle_() {
  const root = useStore();
  const { logic } = root;
  return (
    <>
      <div className={"text-[16px] font-bold mb-2"}>当前编辑字典：</div>
      <div className={"flex items-center"}>
        <div className={"mr-2"}>
          <span className={"mr-1"}>字典编码：</span>
          <Tag>{logic.initData.dictCode}</Tag>
        </div>
        <div>
          <span className={"mr-1"}>字典名称：</span>
          <Tag>{logic.initData.dictName}</Tag>
        </div>
      </div>
    </>
  );
});

export default ConfigDrawerTitle;
