import { Button, Form, Input, TreeSelect } from "antd";
import UserHelper from "@/utils/user-helper";
import { useSelector } from "@/pages/basic/employee/store";
import { useMount } from "@quarkunlimit/react-hooks";
import { UserAuth } from "@/pages/basic/employee/auth";
import TXSearchForm from "@/components/TXSearchForm";

const userHelper = UserHelper.getInstance();

const Option = () => {
  const FormItem = Form.Item;
  const searchForm = useSelector((x) => x.searchForm);
  const { deptTree } = useSelector((x) => x.state);
  const { getDeptTree, openAddModalCreate, reset, handleSearch } = useSelector(
    (x) => x.logic
  );
  const { runDeptTree, runGetPage } = useSelector((x) => x.api);

  useMount(() => {
    getDeptTree();
  });

  return (
    <TXSearchForm
      form={searchForm}
      onReset={reset}
      onSearch={handleSearch}
      loading={runGetPage.loading}
    >
      {UserAuth.userCreate && (
        <FormItem>
          <Button
            type={"primary"}
            className={"mr-4"}
            onClick={openAddModalCreate}
          >
            新增员工
          </Button>
        </FormItem>
      )}
      <FormItem label={"用户名"} name="userName">
        <Input placeholder={"请输入用户名"} />
      </FormItem>
      <FormItem label={"电话"} name="phoneNumber">
        <Input placeholder={"请输入电话"} />
      </FormItem>
      <FormItem label={"所在部门"} name="deptIdList">
        <TreeSelect
          loading={runDeptTree.loading}
          className={"mr-4 !w-[220px]"}
          placeholder={"请选择部门"}
          treeData={deptTree as any}
          fieldNames={{
            label: "deptName",
            value: "id",
            children: "childList",
          }}
          allowClear={true}
        />
      </FormItem>
      <FormItem label={"账号"} name="userAccount">
        <Input placeholder={"请输入账号"} />
      </FormItem>
    </TXSearchForm>
  );
};

export default Option;
