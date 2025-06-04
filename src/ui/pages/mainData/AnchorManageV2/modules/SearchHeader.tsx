import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Button, Form, Input, Select } from "antd";
import TXSearchForm from "@/components/TXSearchForm";
import { ISearchInfo } from "../store/RootStore/interface";
import { LiveStreamerAuth } from "../auth";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic } = root;

  return (
    <TXSearchForm
      onSearch={logic.onSearch}
      onReset={logic.onReset}
      form={refs.searchForm}
    >
      {LiveStreamerAuth.liveStreamerCreate && (
        <Button
          type="primary"
          onClick={() => refs.editRef.current?.openModal()}
        >
          新增主播
        </Button>
      )}
      <Form.Item label="主播姓名" name="streamerName">
        <Input placeholder="请输入主播姓名" />
      </Form.Item>
      <Form.Item name="enableFlag" label="是否启用">
        <Select
          style={{ width: 80 }}
          options={[
            { label: "是", value: true },
            { label: "否", value: false },
          ]}
        />
      </Form.Item>
    </TXSearchForm>
  );
});
