import TXSearchForm from "@/components/TXSearchForm";
import { observer } from "@quarkunlimit/qu-mobx";
import { Button, Form, Input, Select } from "antd";
import { ChannelAuth } from "../auth";
import { useStore } from "../store/RootStore";
import TXEmployeePicker from "@/components/TXEmployeePicker";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic, computed } = root;

  return (
    <TXSearchForm
      onSearch={logic.onSearch}
      onReset={logic.onReset}
      form={refs.form}
      formKey="CHANNEL_MANGEMENT_FORM"
      loading={computed.loading}
    >
      {ChannelAuth.channelCreate && (
        <Button
          type="primary"
          onClick={() => {
            refs.editModalRef.current?.openModal({
              tree: refs.txTreeSidebarRef.current?.exportTreeData() ?? [],
              channelTypeId: logic.channelType,
            });
          }}
        >
          新增渠道
        </Button>
      )}
      <Form.Item name="channelName" label="渠道名称">
        <Input placeholder="请输入渠道名称" />
      </Form.Item>
      <Form.Item name="enableFlag" label="是否启用">
        <Select placeholder="请选择启用状态" style={{ width: 150 }}>
          <Select.Option value={true}>是</Select.Option>
          <Select.Option value={false}>否</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="负责人" name="managerUserIdList">
        <TXEmployeePicker type="TASK_OWNER" placeholder="请选择负责人" />
      </Form.Item>
    </TXSearchForm>
  );
});
