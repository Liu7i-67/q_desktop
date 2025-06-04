import { handleBeforeInput } from "@/utils/tools";
import { transformTreeData } from "@/utils/treeTransform";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Tooltip,
  TreeSelect,
} from "antd";
import { Modal } from "@/components/TXModal";
import dayjs from "dayjs";
import { useEffect } from "react";
import { WechatStatus } from "../service";
import { useSelector } from "../store";
import { IOption } from "@/utils/interface";
import { phoneValidator } from "@/utils/validator";
import { customerTypeOptions } from "@/utils/enum/modules/customerType";

const EditModal = () => {
  const { runSave, runUpdate, runGetDetail } = useSelector((x) => x.api);
  const { editModalVisible, regionTree, dictValue, isCreate, projectTypeTree } =
    useSelector((x) => x.state);
  const editForm = useSelector((x) => x.editForm);
  const {
    closeEditModal,
    addModalSubmit,
    getDictValue,
    updateModalSubmit,
    getDetail,
    getProjectTypeTree,
  } = useSelector((x) => x.logic);

  // 获取指定 dictCode 的字典值
  const getDictOptions = (dictCode: string) => {
    return dictValue
      .filter((item) => item.dictCode === dictCode)
      .map((item) => ({
        label: item.dictName,
        value: item.dictValue,
      }));
  };

  useEffect(() => {
    if (editModalVisible) {
      getDictValue();
      getProjectTypeTree();
      if (!isCreate) {
        getDetail();
      }
    } else {
      editForm.resetFields();
    }
  }, [editModalVisible]);

  const RemovePhone = (props: {
    index: number;
    remove: (index: number) => void;
  }) => {
    return (
      props.index > 0 && (
        <Tooltip placement={"top"} title={"移除"}>
          <MinusCircleOutlined
            className={
              "text-red-200 hover:text-red-500 hover:cursor-pointer ease-in-out duration-300"
            }
            onClick={() => props.remove(props.index)}
          />
        </Tooltip>
      )
    );
  };

  const labelValueList = Form.useWatch("labelValueList", editForm);

  const lock = labelValueList?.some?.((i: IOption) =>
    ["未成年", "无医美意向"].includes(i.label)
  );

  useEffect(() => {
    if (lock) {
      editForm.setFieldValue("customerType", "INVALID_CUSTOMER");
    }
  }, [lock]);

  return (
    <Modal
      title={isCreate ? "新增客户" : "编辑客户"}
      open={editModalVisible}
      onCancel={closeEditModal}
      onOk={isCreate ? addModalSubmit : updateModalSubmit}
      loading={!isCreate && runGetDetail.loading}
      confirmLoading={runSave.loading || runUpdate.loading}
      destroyOnClose
      width={900}
    >
      <Form
        className={"p-8 max-h-[60vh] overflow-y-auto"}
        layout={"vertical"}
        form={editForm}
        initialValues={{
          wechatStatus: WechatStatus.UN_DEFINED,
        }}
      >
        <div className={"grid grid-cols-3 gap-4"}>
          <Form.Item name="customerName" label="客户姓名">
            <Input placeholder="请输入客户姓名" />
          </Form.Item>

          <Form.Item
            name="areaCode"
            label="所在城市"
            //  rules={[{ required: true, message: '请选择所在城市' }]}
          >
            <TreeSelect
              placeholder="请选择所在城市"
              treeData={transformTreeData(regionTree)}
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
                { value: WechatStatus.UN_PASSED, label: "未通过" },
                { value: WechatStatus.PASSED, label: "已通过" },
                { value: WechatStatus.UN_DEFINED, label: "待定" },
              ]}
            />
          </Form.Item>

          {/*<Form.Item name="wechatNumber" label="微信号">*/}
          {/*  <Input allowClear placeholder="请输入微信号" />*/}
          {/*</Form.Item>*/}
          <Form.Item name="labelValueList" label="客户标签">
            <Select
              mode="multiple"
              labelInValue
              placeholder="请选择客户标签"
              options={getDictOptions("customer_label")}
              allowClear
            />
          </Form.Item>
          <div>
            <Form.Item name="customerType" label="客户类型">
              <Select
                placeholder="请选择客户类型"
                options={customerTypeOptions}
                disabled={lock}
                allowClear
              />
            </Form.Item>
            {lock && (
              <div className="text-red-400 -mt-[20px]">无效客户不支持修改</div>
            )}
          </div>
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
                  {fields.map((field, index) => (
                    <div className={"flex items-center"}>
                      <Form.Item {...field} noStyle>
                        <Input
                          placeholder="请输入客户微信"
                          suffix={<RemovePhone index={index} remove={remove} />}
                          onChange={(e) => {
                            const wechatNumber =
                              editForm.getFieldValue("wechatNumber") || [];
                            wechatNumber[index] = e.target.value.toLowerCase();
                            editForm.setFieldsValue({ wechatNumber });
                          }}
                        />
                      </Form.Item>
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
                  {fields.map((field, index) => (
                    <div className={"flex items-center"}>
                      <Form.Item
                        {...field}
                        rules={[
                          {
                            validator: phoneValidator,
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="请输入客户电话"
                          suffix={<RemovePhone index={index} remove={remove} />}
                        />
                      </Form.Item>
                      {/*{fields.length > 1 && (*/}
                      {/*  <MinusCircleOutlined*/}
                      {/*    style={{*/}
                      {/*      color: 'rgba(249,57,32,1)',*/}
                      {/*    }}*/}
                      {/*    onClick={() => remove(index)}*/}
                      {/*  />*/}
                      {/*)}*/}
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

          <Form.Item name="intentionalProjectPostDTOList" label="首次咨询项目">
            <Select
              placeholder="请选择首次咨询项目"
              mode="multiple"
              showSearch
              options={projectTypeTree?.reduce((prev, item) => {
                const firstLevelNode: any = {};
                firstLevelNode["value"] = item.id;
                if (item.typeName === "其他") {
                  firstLevelNode["label"] = "其他（看脸、避雷、查医院等）";
                } else {
                  firstLevelNode["label"] = item.typeName;
                }
                return item.typeName !== "皮肤"
                  ? item.typeName === "轻医美"
                    ? [firstLevelNode, ...prev]
                    : [...prev, firstLevelNode]
                  : prev;
              }, [])}
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
    </Modal>
  );
};

export default EditModal;
