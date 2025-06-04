import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Input } from "antd";

export const Title = observer(function Title_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="flex items-center">
      <span className="mr-4">列表配置</span>
      <Input
        className="w-[240px]"
        value={logic.searchVal}
        onChange={(e) => {
          logic.changeSearchVal(e.target.value);
        }}
        allowClear
        placeholder="请输入字段标题"
      />
    </div>
  );
});
