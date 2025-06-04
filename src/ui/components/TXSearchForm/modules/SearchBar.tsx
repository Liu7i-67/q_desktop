import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button } from "antd";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { ExpandBtn } from "./ExpandBtn";
import { SettingBtn } from "./SettingBtn";
import { cn } from "@/utils/tools";

export const LineSearchBar = observer(function LineSearchBar_() {
  const root = useStore();
  const { logic, propsStore } = root;

  if (
    propsStore.props.hideAction ||
    !logic.expand ||
    !logic.haveInit ||
    !logic.renderExpand
  ) {
    return null;
  }

  return (
    <div className="tx-search-form-bar flex">
      <Button onClick={logic.onReset} loading={propsStore.props.loading}>
        <ReloadOutlined />
        重置
      </Button>
      <Button
        type="primary"
        loading={propsStore.props.loading}
        onClick={logic.onSearch}
      >
        <SearchOutlined />
        搜索
      </Button>
      <ExpandBtn />
      <SettingBtn />
    </div>
  );
});

export const SearchBar = observer(function SearchBar_() {
  const root = useStore();
  const { logic, propsStore, refs } = root;

  if (propsStore.props.hideAction) {
    return null;
  }

  return (
    <div
      className={cn("tx-search-form-bar", logic.expand ? "hidden" : "flex")}
      ref={refs.barRef}
    >
      <Button onClick={logic.onReset} loading={propsStore.props.loading}>
        <ReloadOutlined />
        重置
      </Button>
      <Button
        type="primary"
        loading={propsStore.props.loading}
        onClick={logic.onSearch}
      >
        <SearchOutlined />
        搜索
      </Button>
      <ExpandBtn />
      <SettingBtn />
    </div>
  );
});
