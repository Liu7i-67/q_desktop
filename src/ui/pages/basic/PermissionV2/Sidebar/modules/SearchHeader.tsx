import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, Input, Radio } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchHeader = observer(() => {
  const root = useStore();
  const { logic } = root;
  return (
    <div className={"flex justify-between w-full mb-[8px]"}>
      <Radio.Group
        className={"flex-1"}
        optionType="button"
        buttonStyle="solid"
        value={logic.sidebarType}
        options={[
          { value: "ROLE", label: "角色" },
          { value: "USER", label: "员工" },
        ]}
        onChange={(e) => {
          logic.changeSidebarType(e.target.value);
        }}
      />

      <Input
        value={logic.searchValue}
        placeholder="请输入搜索内容"
        className={"w-[160px]"}
        onChange={(e) => {
          logic.changeSearchValue(e.target.value);
        }}
        allowClear
        suffix={<SearchOutlined onClick={() => logic.search()} />}
      />
    </div>
  );
});

export default SearchHeader;
