import { Modal } from "@/components/TXModal";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import TXTreeSelect, { useTXTreeSelectFetch } from "@/components/TXTreeSelect";
import { EUserType } from "@/utils/user-helper/interface";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Spin,
  Switch,
  TreeDataNode,
} from "antd";
import { forwardRef, useImperativeHandle } from "react";
import { IEditEmployeeModalProps, IEditEmployeeModalRef } from "./interface";
import OrgSelect from "./modules/OrgSelect";
import { Provider, useStore } from "./store/RootStore";

const EditEmployeeModal = observer(
  forwardRef<IEditEmployeeModalRef, IEditEmployeeModalProps>(
    function EditEmployeeModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, refs, computed } = root;

      const roleSelectProps = useSearchSelectFetch({
        fetchDataApi: "/api/base/v1/sys-role/get-page",
        initFetch: false,
        refreshFetch: logic.open,
        searchParamKey: "roleName",
        transformOptions: (data) =>
          data.map((item) => ({
            label: item.roleName,
            value: item.id,
            disabled: item.enableFlag === false,
          })),
      });

      const deptTreeProps = useTXTreeSelectFetch({
        fetchDataApi: "/api/base/v1/sys-dept/tree",
        request: {
          ignorePermission: true,
        },
        refreshFetch: logic.open,
        initFetch: false,
        transformTree: (data) => data as TreeDataNode[],
      });

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      return (
        <Modal
          title={logic.recordId ? "编辑员工" : "新增员工"}
          open={logic.open}
          width={600}
          destroyOnClose
          okButtonProps={{
            loading: computed.loading,
          }}
          onOk={logic.onOk}
          onCancel={logic.closeModal}
        >
          <Spin spinning={computed.loading}>
            <Form
              layout="vertical"
              className={"p-8 max-h-[60vh] overflow-y-auto"}
              form={refs.addForm}
            >
              <div className={"grid grid-cols-2 gap-4"}>
                <Form.Item
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
                      { label: "流量", value: EUserType.TRAFFIC },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: "员工名称为必选项" }]}
                  label={"员工姓名："}
                  name={"userName"}
                  key={"userName"}
                >
                  <Input placeholder={"清输入员工姓名"} />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: "员工电话为必选项" }]}
                  label={"员工电话："}
                  name={"phoneNumber"}
                  key={"phoneNumber"}
                >
                  <Input placeholder={"清输入员工电话"} />
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: "员工账号为必选项" }]}
                  label={"员工账号："}
                  name={"userAccount"}
                  key={"userAccount"}
                >
                  <Input
                    disabled={Boolean(logic.recordId)}
                    placeholder={"请输入员工账号"}
                  />
                </Form.Item>
                <Form.Item
                  label={"员工角色："}
                  rules={[{ required: true, message: "员工角色为必选项" }]}
                  name={"roleList"}
                  key={"roleList"}
                >
                  <TXSearchSelect
                    mode="multiple"
                    placeholder="请选择员工角色"
                    {...roleSelectProps}
                  />
                </Form.Item>
                <Form.Item
                  label={"员工昵称："}
                  name={"nickname"}
                  key={"nickname"}
                >
                  <Input placeholder={"请输入员工昵称"} />
                </Form.Item>
                <Form.Item
                  label={"是否启用"}
                  name="enableFlag"
                  initialValue={false}
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                {<OrgSelect />}
              </div>
              <Form.Item label={"所属部门："} required>
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
                          <div
                            key={field.key}
                            className="flex items-center gap-4"
                          >
                            <Form.Item
                              name={[field.name, "deptId"]}
                              rules={[
                                { required: true, message: "请选择部门" },
                              ]}
                            >
                              <TXTreeSelect
                                {...deptTreeProps}
                                className="!w-[220px]"
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

                            <Form.Item
                              name={[field.name, "directorFlag"]}
                              valuePropName="checked"
                              initialValue={false}
                            >
                              <Checkbox>管理员</Checkbox>
                            </Form.Item>
                            <Form.Item>
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
                            </Form.Item>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Form.List>
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IEditEmployeeModalRef, IEditEmployeeModalProps>(
    function EditEmployeeModalPage(props, ref) {
      return (
        <Provider>
          <EditEmployeeModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
