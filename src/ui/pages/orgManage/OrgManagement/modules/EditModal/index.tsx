import { TXCompactDatePicker } from "@/components/TXCompactDatePicker";
import { TXCompactTimePicker } from "@/components/TXCompactTimePicker";
import { Modal } from "@/components/TXModal";
import TXTreeSelect, { useTXTreeSelectFetch } from "@/components/TXTreeSelect";
import { convertToTreeData } from "@/utils/treeTransform";
import ImageUpload from "@/utils/upload";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Spin,
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { forwardRef, useImperativeHandle } from "react";
import { IEditModalProps, IEditModalRef } from "./interface";
import { Provider, useStore } from "./store/RootStore";

const EditModal = observer(
  forwardRef<IEditModalRef, IEditModalProps>(function EditModal_(props, ref) {
    const root = useStore();
    useSyncProps(root, Object.keys(props), props);
    const { logic, refs, computed } = root;

    const orgTreeProps = useTXTreeSelectFetch({
      fetchDataApi: "/api/base/v1/organization-type/tree",
      initFetch: false,
      refreshFetch: logic.open,
      transformTree: (data) => convertToTreeData(data),
    });

    useImperativeHandle(ref, () => {
      return {
        openModal: logic.openModal,
        closeModal: logic.closeModal,
      };
    });

    return (
      <Modal
        title={logic.initData.record ? "编辑机构" : "新增机构"}
        open={logic.open}
        width={1000}
        destroyOnClose
        onCancel={logic.closeModal}
        onOk={logic.onOk}
        okButtonProps={{
          loading: computed.loading,
        }}
      >
        <Spin spinning={computed.loading}>
          <Form
            className="p-8 max-h-[60vh] overflow-y-auto"
            form={refs.editForm}
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
                  <TXTreeSelect
                    placeholder="请选择机构分类"
                    showSearch={false}
                    treeCheckable={false}
                    treeExpandAction={undefined}
                    fieldNames={{
                      label: "title",
                      value: "key",
                      children: "children",
                    }}
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    {...orgTreeProps}
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
                  <TXTreeSelect
                    treeData={logic.initData.cityTree}
                    treeCheckable={false}
                    treeExpandAction={undefined}
                    placeholder="请选择城市"
                    showSearch={false}
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
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
                <Form.Item
                  label="营业日期"
                  name="operatingDate"
                  rules={[
                    {
                      validator(_, value) {
                        if (value) {
                          const [start, end] = value;
                          if (!start && end) {
                            return Promise.reject("请选择开始日期");
                          }
                          if (start && !end) {
                            return Promise.reject("请选择结束日期");
                          }
                          if (start && end && start > end) {
                            return Promise.reject("开始日期不能晚于结束日期");
                          }
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <TXCompactDatePicker
                    disabledStartDate={(current) => {
                      const date = refs.editForm.getFieldValue("operatingDate");
                      if (date) {
                        const [start, end] = date;
                        return end && current && current > end;
                      }
                      return false;
                    }}
                    disabledEndDate={(current) => {
                      const date = refs.editForm.getFieldValue("operatingDate");
                      if (date) {
                        const [start, end] = date;
                        return start && current && current < start;
                      }
                      return false;
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="营业时间"
                  name="operatingTime"
                  rules={[
                    {
                      validator(_, value) {
                        if (value) {
                          const [start, end] = value;
                          if (!start && end) {
                            return Promise.reject("请选择开始时间");
                          }
                          if (start && !end) {
                            return Promise.reject("请选择结束时间");
                          }
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <TXCompactTimePicker />
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
                <Form.Item
                  label="连锁机构"
                  name="chainFlag"
                  initialValue={false}
                >
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
