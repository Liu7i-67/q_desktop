import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Spin,
  Switch,
  TreeSelect,
} from "antd";
import { EUserType } from "@/utils/user-helper/interface";
import { useSelector } from "@/pages/basic/employee/store";
import { useEffect, useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal } from "@/components/TXModal";

const AddEmployeeModal = () => {
  const FormItem = Form.Item;
  const {
    runGetRoleList,
    runDeptTree,
    runSaveEmployee,
    runUpdateEmployee,
    runGetEmployeeDetail,
    runGetOrg,
  } = useSelector((x) => x.api);
  const {
    addModalVisible,
    roleList,
    roleCurrent,
    roleTotal,
    deptTree,
    isCreate,
    orgList,
    orgCurrent,
    orgTotal,
  } = useSelector((x) => x.state);
  const addForm = useSelector((x) => x.addForm);
  const {
    addFormSubmit,
    closeAddModal,
    getRoleList,
    setRoleList,
    setRoleCurrent,
    onRoleScroll,
    handleRoleSearch,
    updateFormSubmit,
    getEmployeeDetail,
    setOrgList,
    setOrgCurrent,
    onOrgScroll,
    handleOrgSearch,
    getOrgList,
  } = useSelector((x) => x.logic);
  const [searchValue, setSearchValue] = useState<string>("");
  const [roleTimer, setRoleTimer] = useState<NodeJS.Timeout | null>(null);
  const [timerOrg, setTimerOrg] = useState<NodeJS.Timeout | null>(null);
  const [userType, setUserType] = useState<EUserType>();

  useEffect(() => {
    if (addModalVisible) {
      getRoleList();
      if (!isCreate) {
        getEmployeeDetail();
      }
    } else {
      addForm.resetFields();
    }
  }, [addModalVisible]);

  useEffect(() => {
    const type = addForm.getFieldValue("userType");
    setUserType(type);
  }, [addForm.getFieldValue("userType")]);

  // 处理角色搜索
  const debouncedRoleSearch = (value: string) => {
    setSearchValue(value);
    setRoleList([]);
    setRoleCurrent(1);

    if (roleTimer) {
      clearTimeout(roleTimer);
    }
    if (!value.trim()) {
      return;
    }
    const newTimer = setTimeout(() => {
      handleRoleSearch(value);
    }, 500);
    setRoleTimer(newTimer);
  };

  // 处理角色滚动加载
  const onRolePopupScroll = (e: any) => {
    const { target } = e;
    if (
      !runGetRoleList.loading &&
      roleTotal > roleList.length &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      // 先更新页码，再加载数据
      const nextPage = roleCurrent + 1;
      setRoleCurrent(nextPage);
      onRoleScroll(searchValue, nextPage);
    }
  };

  // 处理机构搜索
  const debouncedSearchOrg = (value: string) => {
    setOrgList([]);
    setOrgCurrent(1);

    if (timerOrg) {
      clearTimeout(timerOrg);
    }
    if (!value.trim()) {
      return;
    }
    const newTimer = setTimeout(() => {
      handleOrgSearch(value);
    }, 500);
    setTimerOrg(newTimer);
  };

  // 处理机构上拉刷新
  const onOrgPopupScroll = (e: any) => {
    const { target } = e;
    if (
      !runGetOrg.loading &&
      orgTotal > orgList.length &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      onOrgScroll(orgCurrent + 1);
    }
  };

  return (
    <Modal
      open={addModalVisible}
      title={isCreate ? "新增员工" : "编辑员工"}
      width={600}
      onOk={isCreate ? addFormSubmit : updateFormSubmit}
      onCancel={closeAddModal}
      destroyOnClose
      confirmLoading={
        isCreate ? runSaveEmployee.loading : runUpdateEmployee.loading
      }
      loading={runGetEmployeeDetail.loading}
    >
      <Form
        layout="vertical"
        className={"p-8 max-h-[60vh] overflow-y-auto"}
        form={addForm}
      >
        <div className={"grid grid-cols-2 gap-4"}>
          <FormItem
            rules={[{ required: true, message: "员工类型为必选项" }]}
            label={"员工类型："}
            name={"userType"}
            key={"userType"}
          >
            <Select
              placeholder="请选择员工类型"
              options={[
                { label: "咨询师", value: EUserType.CONSULTANT },
                { label: "客服", value: EUserType.CUSTOMER_SERVICE },
                { label: "商务", value: EUserType.BUSINESS },
                { label: "财务", value: EUserType.ACCOUNTANT },
                { label: "机构", value: EUserType.ORG },
              ]}
              onChange={(value) => setUserType(value)}
            />
          </FormItem>
          <FormItem
            rules={[{ required: true, message: "员工名称为必选项" }]}
            label={"员工姓名："}
            name={"userName"}
            key={"userName"}
          >
            <Input placeholder={"清输入员工姓名"} />
          </FormItem>
          <FormItem
            rules={[{ required: true, message: "员工电话为必选项" }]}
            label={"员工电话："}
            name={"phoneNumber"}
            key={"phoneNumber"}
          >
            <Input placeholder={"清输入员工电话"} />
          </FormItem>
          <FormItem
            rules={[{ required: true, message: "员工账号为必选项" }]}
            label={"员工账号："}
            name={"userAccount"}
            key={"userAccount"}
          >
            <Input disabled={!isCreate} placeholder={"请输入员工账号"} />
          </FormItem>
          <FormItem
            label={"员工角色："}
            rules={[{ required: true, message: "员工角色为必选项" }]}
            name={"roleList"}
            key={"roleList"}
          >
            <Select
              mode="multiple"
              placeholder="请选择员工角色"
              allowClear
              showSearch
              optionFilterProp="children"
              defaultActiveFirstOption={false}
              filterOption={false}
              options={roleList.map((item: any) => ({
                label: item.roleName,
                value: item.id,
              }))}
              notFoundContent={
                runGetRoleList.loading ? (
                  <Spin size="small" />
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#999",
                      padding: "8px 0",
                    }}
                  >
                    暂无数据
                  </div>
                )
              }
              onPopupScroll={onRolePopupScroll}
              onSearch={(value) => {
                if (!value.trim()) {
                  setRoleList([]);
                  setRoleCurrent(1);
                  getRoleList();
                } else {
                  debouncedRoleSearch(value);
                }
              }}
              onDropdownVisibleChange={(open) => {
                setRoleCurrent(1);
                if (open) {
                  getRoleList();
                  setRoleList([]);
                }
              }}
              onClear={() => {
                setRoleList([]);
                setRoleCurrent(1);
              }}
            />
          </FormItem>
          <FormItem label={"员工昵称："} name={"nickname"} key={"nickname"}>
            <Input placeholder={"请输入员工昵称"} />
          </FormItem>
          <FormItem
            label={"是否启用"}
            name="enableFlag"
            initialValue={false}
            valuePropName="checked"
          >
            <Switch />
            {/* <Select
              placeholder="请选择"
              allowClear
              options={[
                { label: "启用", value: true },
                { label: "禁用", value: false },
              ]}
            /> */}
          </FormItem>
          {userType === EUserType.ORG && (
            <FormItem
              label={"关联机构："}
              // name={'orgId'}
              // key={'orgId'}
              name="orgName"
              key="orgName"
              rules={[{ required: true, message: "关联机构为必选项" }]}
            >
              <Select
                placeholder="请选择机构"
                allowClear
                showSearch
                optionFilterProp="children"
                defaultActiveFirstOption={false}
                filterOption={false}
                onSearch={(value) => {
                  if (!value.trim()) {
                    // 当搜索值为空时，重置并获取列表
                    setOrgList([]);
                    setOrgCurrent(1);
                    getOrgList();
                  } else {
                    debouncedSearchOrg(value);
                  }
                }}
                notFoundContent={
                  runGetOrg.loading ? (
                    <Spin size="small" />
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        color: "#999",
                        padding: "8px 0",
                      }}
                    >
                      暂无数据
                    </div>
                  )
                }
                onPopupScroll={onOrgPopupScroll}
                onDropdownVisibleChange={(open) => {
                  if (open) {
                    setOrgList([]);
                    getOrgList();
                  } else {
                    setOrgCurrent(1);
                  }
                }}
                style={{ width: "100%" }}
                onClear={() => {
                  setOrgList([]);
                  setOrgCurrent(1);
                }}
              >
                {orgList.map((org) => (
                  <Select.Option key={org.id} value={org.orgName}>
                    {org.orgName}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          )}
        </div>
        <FormItem label={"所属部门："} required>
          <Form.List name="deptList" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <div>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  className="mb-4 w-[100px]"
                >
                  添加部门
                </Button>
                <div className="flex flex-col gap-2">
                  {fields.map((field, index) => (
                    <div key={field.key} className="flex items-center gap-4">
                      <FormItem
                        name={[field.name, "deptId"]}
                        rules={[{ required: true, message: "请选择部门" }]}
                      >
                        <TreeSelect
                          loading={runDeptTree.loading}
                          className="!w-[220px]"
                          placeholder={"请选择部门"}
                          treeData={deptTree as any}
                          fieldNames={{
                            label: "deptName",
                            value: "id",
                            children: "childList",
                          }}
                        />
                      </FormItem>

                      <FormItem
                        name={[field.name, "directorFlag"]}
                        valuePropName="checked"
                        initialValue={false}
                      >
                        <Checkbox>管理员</Checkbox>
                      </FormItem>
                      <FormItem>
                        {fields.length > 1 && (
                          <Button
                            type="link"
                            danger
                            onClick={() => remove(index)}
                            icon={<DeleteOutlined />}
                          >
                            删除
                          </Button>
                        )}
                      </FormItem>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Form.List>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default AddEmployeeModal;
