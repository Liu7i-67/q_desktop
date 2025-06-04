import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, Input, Select, Button } from "antd";
import TXSearchForm from "@/components/TXSearchForm";
import { ISearchInfo } from "../store/RootStore/interface";
import { PlatformAuth } from "../auth";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic } = root;

  return (
    <TXSearchForm
      onSearch={logic.onSearch}
      onReset={logic.onReset}
      form={refs.searchForm}
    >
      {PlatformAuth.platformCreate && (
        <Button
          type="primary"
          onClick={() => refs.editRef.current?.openModal()}
        >
          新增平台
        </Button>
      )}
      <Form.Item label="平台名称" name="platformName">
        <Input placeholder="请输入平台名称" />
      </Form.Item>
      <Form.Item name="enableFlag" label="是否启用">
        <Select
          style={{ width: 80 }}
          options={[
            {
              label: "是",
              value: true,
            },
            {
              label: "否",
              value: false,
            },
          ]}
        />
      </Form.Item>
    </TXSearchForm>
  );
});
