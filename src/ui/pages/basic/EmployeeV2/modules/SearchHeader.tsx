import TXSearchForm from "@/components/TXSearchForm";
import TXTreeSelect, { useTXTreeSelectFetch } from "@/components/TXTreeSelect";
import { observer } from "@quarkunlimit/qu-mobx";
import { Button, Form, Input, TreeDataNode } from "antd";
import { EmployeeAuth } from "../auth";
import { useStore } from "../store/RootStore";

export const SearchHeader = observer(function SearchHeader_() {
  const root = useStore();
  const { refs, logic, computed } = root;

  const deptTreeProps = useTXTreeSelectFetch({
    fetchDataApi: "/api/base/v1/sys-dept/tree",
    request: {
      ignorePermission: true,
    },
    transformTree: (data) => data as TreeDataNode[],
  });

  return (
    <TXSearchForm
      form={refs.form}
      onSearch={logic.onSearch}
      onReset={logic.onReset}
      loading={computed.loading}
    >
      {EmployeeAuth.userCreate && (
        <Form.Item>
          <Button
            type={"primary"}
            className={"mr-4"}
            onClick={() => {
              refs.editEmployeeModalRef.current?.openModal();
            }}
          >
            新增员工
          </Button>
        </Form.Item>
      )}
      <Form.Item label={"用户名"} name="userName">
        <Input placeholder={"请输入用户名"} />
      </Form.Item>
      <Form.Item label={"电话"} name="phoneNumber">
        <Input placeholder={"请输入电话"} />
      </Form.Item>
      <Form.Item label={"所在部门"} name="deptIdList">
        <TXTreeSelect
          {...deptTreeProps}
          placeholder={"请选择部门"}
          fieldNames={{
            label: "deptName",
            value: "id",
            children: "childList",
          }}
          treeCheckable={false}
          treeExpandAction={undefined}
        />
      </Form.Item>
      <Form.Item label={"账号"} name="userAccount">
        <Input placeholder={"请输入账号"} />
      </Form.Item>
    </TXSearchForm>
  );
});
