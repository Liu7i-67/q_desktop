import TXSearchForm from "@/components/TXSearchForm";
import { AdvertiserManagementAuth } from "@/pages/xhs-spotlight/advertise/auth";
import { Button, Form, Input } from "antd";
import { useSelector } from "./store";

export default function Option() {
  const form = useSelector((x) => x.form);
  const { reset, onSearch, openCreateModal, deleteAdvertiser } = useSelector(
    (x) => x.logic
  );
  const { selectedRowKeys } = useSelector((x) => x.state);
  const { runGetAdvertiser } = useSelector((x) => x.api);

  return (
    <TXSearchForm
      form={form}
      onReset={reset}
      onSearch={onSearch}
      loading={runGetAdvertiser.loading}
    >
      {(AdvertiserManagementAuth.advertiserManagementCreate ||
        AdvertiserManagementAuth.advertiserManagementDelete) && (
        <Form.Item>
          {AdvertiserManagementAuth.advertiserManagementCreate && (
            <Button type={"primary"} onClick={() => openCreateModal()}>
              新增广告主
            </Button>
          )}
          {AdvertiserManagementAuth.advertiserManagementDelete && (
            <Button
              color="danger"
              variant="solid"
              className="ml-2"
              disabled={!selectedRowKeys.length}
              onClick={() => deleteAdvertiser()}
            >
              批量删除
            </Button>
          )}
        </Form.Item>
      )}
      <Form.Item name="advertiserName" label="广告主名称">
        <Input placeholder="请输入计划名称" />
      </Form.Item>
      <Form.Item name="phoneNumber" label="手机号">
        <Input placeholder="请输入手机号" />
      </Form.Item>
    </TXSearchForm>
  );
}
