import { Modal } from "@/components/TXModal";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { PlusOutlined } from "@ant-design/icons";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Spin,
  TreeSelect,
} from "antd";
import dayjs from "dayjs";
import { forwardRef, useImperativeHandle } from "react";
import { IEditModalProps, IEditModalRef } from "./interface";
import CustomerTypeField from "./modules/CustomerTypeField";
import LeadsTypeFormItem from "./modules/LeadsTypeFormItem";
import RepeatFormItem from "./modules/RepeatInfo";
import { Provider, useStore } from "./store/RootStore";

const EditModal = observer(
  forwardRef<IEditModalRef, IEditModalProps>(function EditModal_(props, ref) {
    const root = useStore();
    useSyncProps(root, Object.keys(props), props);
    const { logic, refs, computed } = root;

    useImperativeHandle(ref, () => {
      return {
        openModal: logic.openModal,
        closeModal: logic.closeModal,
      };
    });

    const labelRelationIdProps = useSearchSelectFetch({
      fetchDataApi: "/api/base/v1/sys-dict-value/dict-value",
      request: {
        dictCode: "customer_label",
      },
      searchParamKey: "dictName",
      transformOptions: (data) => {
        return data.map((x) => ({
          label: x.dictName,
          value: x.dictValue,
        }));
      },
    });

    return (
      <Modal
        title={logic.initData ? "编辑客户" : "新增客户"}
        open={logic.open}
        width={900}
        destroyOnClose
        onCancel={logic.closeModal}
        onOk={logic.submitForm}
        okButtonProps={{
          loading: computed.submitLoading,
        }}
      >
        <Spin spinning={computed.submitLoading}>
          <Form
            className={"p-8 max-h-[60vh] overflow-y-auto"}
            layout={"vertical"}
            form={refs.editForm}
            initialValues={{
              wechatStatus: "UN_DEFINED",
            }}
          >
            <div className={"grid grid-cols-3 gap-4"}>
              {!logic.initData && <LeadsTypeFormItem />}
              <Form.Item name="customerName" label="客户姓名">
                <Input placeholder="请输入客户姓名" />
              </Form.Item>

              <Form.Item name="areaCode" label="所在城市">
                <TreeSelect
                  placeholder="请选择所在城市"
                  treeData={logic.regionTree}
                  showSearch
                  treeNodeFilterProp="title"
                />
              </Form.Item>
              <Form.Item
                name="wechatStatus"
                label="微信通过状态"
                rules={[{ required: true, message: "请选择所在城市" }]}
              >
                <Radio.Group
                  options={[
                    { value: "UN_PASSED", label: "未通过" },
                    { value: "PASSED", label: "已通过" },
                    { value: "UN_DEFINED", label: "待定" },
                  ]}
                />
              </Form.Item>
              <Form.Item name="labelValueList" label="客户标签">
                <TXSearchSelect
                  {...labelRelationIdProps}
                  labelInValue
                  placeholder="客户标签"
                  mode="multiple"
                />
              </Form.Item>
              <CustomerTypeField />
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.wechatStatus !== currentValues.wechatStatus
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("wechatStatus") === "PASSED" && (
                    <Form.Item name="wechatPassTime" label="微信通过时间">
                      <DatePicker
                        className="w-full"
                        showTime={{
                          format: "HH:mm:ss",
                          defaultValue: dayjs("00:00:00", "HH:mm:ss"),
                        }}
                        format="YYYY-MM-DD HH:mm:ss"
                      />
                    </Form.Item>
                  )
                }
              </Form.Item>

              <Form.Item label="客户微信" className={"col-span-3"}>
                <Form.List name="wechatNumber" initialValue={[""]}>
                  {(fields, { add, remove }) => (
                    <div className={"w-full grid grid-cols-3 gap-4"}>
                      {fields.map(({ key, ...restField }, index) => (
                        <div key={index}>
                          <RepeatFormItem
                            key={key}
                            {...restField}
                            index={index}
                            type="wechat"
                            remove={remove}
                          />
                        </div>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加客户微信
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item label="客户电话" className={"col-span-3"}>
                <Form.List name="phoneNumber" initialValue={[""]}>
                  {(fields, { add, remove }) => (
                    <div className={"w-full grid grid-cols-3 gap-4"}>
                      {fields.map(({ key, ...restField }, index) => (
                        <div key={index}>
                          <RepeatFormItem
                            key={key}
                            {...restField}
                            index={index}
                            type="phone"
                            remove={remove}
                          />
                        </div>
                      ))}
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        添加客户电话
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item
                name="intentionalProjectPostDTOList"
                label="首次咨询项目"
              >
                <Select
                  placeholder="请选择首次咨询项目"
                  mode="multiple"
                  showSearch
                  options={logic.firstConsultTree}
                />
              </Form.Item>

              <Form.Item name="memo" label="备注" className={"col-span-3"}>
                <Input.TextArea
                  placeholder="请输入备注"
                  maxLength={256}
                  showCount
                  className={"h-[100px]"}
                />
              </Form.Item>
            </div>
          </Form>
        </Spin>
      </Modal>
    );
  })
);

export default observer(
  forwardRef<IEditModalRef, IEditModalProps>(
    function EditModalPage(props, ref) {
      return (
        <Provider>
          <EditModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
