import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "./store/RootStore";
import { Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SchedulingManagementAuth } from "../auth";
import TXSearchForm from "@/components/TXSearchForm";
import { ISearchInfo } from "./store/RootStore/interface";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic } = root;

  return (
    <TXSearchForm
      onSearch={(e) => {
        logic.onSearch(e as ISearchInfo);
        logic.setExpandRows([]);
      }}
      onReset={() => {
        logic.onSearch({});
        logic.setExpandRows([]);
      }}
    >
      {SchedulingManagementAuth.redBookChannelGroupCreate && (
        <Button
          type="primary"
          onClick={() => refs.editRef.current?.openModal()}
        >
          <PlusOutlined />
          创建渠道分组
        </Button>
      )}
      <Form.Item label="分组名称" name="groupName" className="max-w-[280px]">
        <Input placeholder="请输入渠道分组名称" maxLength={255}></Input>
      </Form.Item>
    </TXSearchForm>
  );
});
