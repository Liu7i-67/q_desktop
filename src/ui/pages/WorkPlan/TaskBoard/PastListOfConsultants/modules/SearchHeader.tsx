import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import TXSearchForm from "@/components/TXSearchForm";
import { ISearchInfo } from "../store/RootStore/interface";
import { ConsultantsRow } from "./ConsultantsRow";
import { SubTabRow } from "./SubTabRow";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { logic } = root;

  return (
    <TXSearchForm
      onSearch={(e) => {
        logic.onSearch(e as ISearchInfo);
      }}
      onReset={() => {
        logic.onSearch({});
      }}
      hideAction
    >
      <SubTabRow />
      <ConsultantsRow />
      <Button onClick={logic.refresh}>
        <ReloadOutlined />
        刷新
      </Button>
    </TXSearchForm>
  );
});
