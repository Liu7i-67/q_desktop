import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Input } from "antd";

export const SearchRow = observer(function SearchRow_() {
  const root = useStore();
  const { refs, logic } = root;

  return (
    <div className="p-[16px]">
      <Input
        value={logic.searchVal}
        allowClear
        onChange={(e) => {
          logic.changeSearchVal(e.target.value);
        }}
        ref={refs.inputRef}
        onPressEnter={logic.onEnterPress}
        placeholder="请输入搜索关键词"
      ></Input>
    </div>
  );
});
