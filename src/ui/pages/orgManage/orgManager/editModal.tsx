import { Modal } from "@/components/TXModal";
import { convertToTreeData, transformTreeData } from "@/utils/treeTransform";
import ImageUpload from "@/utils/upload";
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  TimePicker,
  TreeSelect,
} from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector } from "./store";

const { TextArea } = Input;

const EditModal = () => {
  const editForm = useSelector((x) => x.editForm);
  const { runGetOrgDetail, runSaveOrg, runUpdateOrg } = useSelector(
    (x) => x.api
  );
  const { loading, editModalVisible, isCreate, orgTypeTree, regionTree } =
    useSelector((x) => x.state);
  const { closeEditModal, addModalSubmit, updateModalSubmit } = useSelector(
    (x) => x.logic
  );

  useEffect(() => {
    if (editModalVisible) {
    } else {
      editForm.resetFields();
    }
  }, [editModalVisible]);

  return (
    <Modal
      title={isCreate ? "新增机构" : "编辑机构"}
      open={editModalVisible}
      onCancel={closeEditModal}
      onOk={isCreate ? addModalSubmit : updateModalSubmit}
      destroyOnClose
      width={1000}
      loading={!isCreate && runGetOrgDetail.loading}
      confirmLoading={
        loading || (isCreate ? runSaveOrg.loading : runUpdateOrg.loading)
      }
    >
      <Form
        className="p-8 max-h-[60vh] overflow-y-auto"
        form={editForm}
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="机构名称"
              name="orgName"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入机构名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="机构编码" name="orgCode">
              <Input placeholder="请输入机构编码" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={"是否启用"}
              name="enableFlag"
              initialValue={false}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="联系人" name="contactName">
              <Input placeholder="请输入联系人姓名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="联系人电话" name="contactPhone">
              <Input placeholder="请输入联系人电话" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="机构成立年份" name="establishYear">
              <DatePicker
                picker="year"
                style={{ width: "100%" }}
                placeholder="请选择成立年份"
                disabledDate={(current) => current && current > dayjs()}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="法定代表人" name="legalPerson">
              <Input placeholder="请输入法定代表人姓名" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="机构邮箱" name="email">
              <Input placeholder="请输入机构邮箱" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="机构分类"
              name="orgType"
              rules={[{ required: true }]}
            >
              <TreeSelect
                placeholder="请选择机构分类"
                treeData={convertToTreeData(orgTypeTree)}
                allowClear
                fieldNames={{
                  label: "title",
                  value: "key",
                  children: "children",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="合作状态"
              name="cooperationStatus"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="请选择合作状态"
                options={[
                  { label: "合作中", value: "IN_PROGRESS" },
                  { label: "已暂停", value: "PAUSED" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="客户到期提醒天数"
              name="remainderDays"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="请选择提醒天数"
                options={[
                  { label: "90天", value: 90 },
                  { label: "180天", value: 180 },
                  { label: "360天", value: 360 },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="所在城市"
              name="areaCode"
              rules={[{ required: true }]}
            >
              <TreeSelect
                placeholder="请选择城市"
                treeData={transformTreeData(regionTree)}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="详细地址"
              name="address"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入详细地址" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="营业日期" required>
              <Input.Group compact>
                <Form.Item
                  name="operatingDateStart"
                  noStyle
                  rules={[{ required: true, message: "请选择开始日期" }]}
                >
                  <DatePicker
                    style={{ width: "50%" }}
                    placeholder="开始日期"
                    disabledDate={(current) => {
                      const endDate =
                        editForm.getFieldValue("operatingDateEnd");
                      return endDate && current && current > endDate;
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="operatingDateEnd"
                  noStyle
                  rules={[
                    { required: true, message: "请选择结束日期" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const startDate = getFieldValue("operatingDateStart");
                        if (!value || !startDate || value >= startDate) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("结束日期不能早于开始日期")
                        );
                      },
                    }),
                  ]}
                >
                  <DatePicker
                    style={{ width: "50%" }}
                    placeholder="结束日期"
                    disabledDate={(current) => {
                      const startDate =
                        editForm.getFieldValue("operatingDateStart");
                      return startDate && current && current < startDate;
                    }}
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="营业时间" required>
              <Input.Group compact>
                <Form.Item
                  name="operatingTimeStart"
                  noStyle
                  rules={[{ required: true, message: "请选择开始时间" }]}
                >
                  <TimePicker style={{ width: "50%" }} placeholder="开始时间" />
                </Form.Item>
                <Form.Item
                  name="operatingTimeEnd"
                  noStyle
                  rules={[{ required: true, message: "请选择结束时间" }]}
                >
                  <TimePicker style={{ width: "50%" }} placeholder="结束时间" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="面积（平方米）" name="squareMetre">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="请输入机构面积"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="咨询室数量" name="consultationRoomNum">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="请输入咨询室数量"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="手术室数量" name="operatingRoomNum">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="请输入手术室数量"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="连锁机构" name="chainFlag" initialValue={false}>
              <Radio.Group>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="营业执照编号" name="businessLicenseNo">
              <Input placeholder="请输入营业执照编号" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="医疗许可证编号" name="medicalLicenseNo">
              <Input placeholder="请输入医疗许可证编号" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="营业范围" name="businessScope">
              <TextArea
                placeholder="请输入营业范围"
                rows={2}
                maxLength={256}
                showCount
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="医院科室" name="departmentName">
              <TextArea
                rows={2}
                maxLength={256}
                showCount
                placeholder="请输入医院科室"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="机构描述" name="description">
              <TextArea
                rows={2}
                maxLength={500}
                showCount
                placeholder="请输入机构描述"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="机构备注" name="memo">
              <TextArea
                rows={2}
                maxLength={500}
                showCount
                placeholder="请输入机构备注"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="LOGO" name="logoImg">
              <ImageUpload
                // uploadType="org"
                maxCount={3}
                maxSize={10}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="营业执照图片" name="businessLicenseImg">
              <ImageUpload
                // uploadType="org"
                maxCount={3}
                maxSize={10}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="认证证书图片" name="authCertificateImg">
              <ImageUpload
                // uploadType="org"
                maxCount={3}
                maxSize={10}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="荣誉证书图片" name="honorCertificateImg">
              <ImageUpload
                // uploadType="org"
                maxCount={3}
                maxSize={10}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="医疗许可证" name="medicalLicenseImg">
              <ImageUpload
                // uploadType="org"
                maxCount={3}
                maxSize={10}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="机构环境图片" name="environmentImg">
              <ImageUpload
                // uploadType="org"
                maxCount={3}
                maxSize={10}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditModal;
