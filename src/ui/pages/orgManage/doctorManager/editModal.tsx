import { Modal } from "@/components/TXModal";
import { getOrgTreeOptions, getProjectOptions } from "@/utils/treeTransform";
import ImageUpload from "@/utils/upload";
import { Col, DatePicker, Form, Input, Row, Select, TreeSelect } from "antd";
import { useEffect } from "react";
import { useSelector } from "./store";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const EditModal = () => {
  const { runUpdateDoctor, runSaveDoctor, runGetDoctorDetail } = useSelector(
    (x) => x.api
  );
  const {
    isCreate,
    editModalVisible,
    uploadLoading,
    orgTree,
    projectTree,
    dictValue,
  } = useSelector((x) => x.state);
  const editForm = useSelector((x) => x.editForm);
  const FormItem = Form.Item;
  const {
    closeEditModal,
    getDictValue,
    getProjectTree,
    getOrgTree,
    getDoctorDetail,
    addModalSubmit,
    updateModalSubmit,
  } = useSelector((x) => x.logic);

  useEffect(() => {
    if (editModalVisible) {
      getDictValue();
      getProjectTree();
      getOrgTree();
      if (!isCreate) {
        getDoctorDetail();
      }
    } else {
      editForm.resetFields();
    }
  }, [editModalVisible]);

  return (
    <Modal
      title={isCreate ? "新增医生" : "编辑医生"}
      open={editModalVisible}
      onCancel={closeEditModal}
      onOk={isCreate ? addModalSubmit : updateModalSubmit}
      width={1000}
      destroyOnClose
      confirmLoading={
        uploadLoading ||
        (isCreate ? runSaveDoctor.loading : runUpdateDoctor.loading)
      }
      loading={!isCreate && runGetDoctorDetail.loading}
    >
      <Form
        className={"p-8 max-h-[60vh] overflow-y-auto"}
        {...formItemLayout}
        layout="horizontal"
        form={editForm}
      >
        <Row gutter={24}>
          <Col span={12}>
            <FormItem
              label="医生姓名"
              name="doctorName"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入医生姓名" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="医生学历"
              name="diploma"
              rules={[{ required: true }]}
            >
              <Select placeholder="请选择学历">
                {dictValue?.map((item) => (
                  <Select.Option key={item.dictValue} value={item.dictValue}>
                    {item.dictName}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="从业日期"
              name="hireDate"
              rules={[{ required: true }]}
            >
              <DatePicker
                placeholder="请选择从业日期"
                style={{ width: "100%" }}
              />
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              label="医生类型"
              name="doctorType"
              rules={[{ required: true }]}
            >
              <Select placeholder="请选择医生类型">
                <Select.Option value="DOCTOR">医生</Select.Option>
                <Select.Option value="ANESTHETIST">麻醉师</Select.Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="任职机构"
              name="relationOrgIdList"
              rules={[{ required: true }]}
            >
              <TreeSelect
                placeholder="请选择任职机构"
                multiple
                treeData={getOrgTreeOptions(orgTree)}
                showSearch
                treeCheckable
                treeNodeFilterProp="label"
                treeExpandAction="click"
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="擅长项目" name="projectIdList">
              <TreeSelect
                placeholder="请选择擅长项目"
                multiple
                treeData={getProjectOptions(projectTree)}
                showSearch
                treeCheckable
                treeNodeFilterProp="label"
                treeExpandAction="click"
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="医生头衔" name="title">
              <Input placeholder="请输入医生头衔" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="职称编号" name="professionalTitleNo">
              <Input placeholder="请输入职称编号" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="医师资格证编号" name="qualificationNo">
              <Input placeholder="请输入医师资格证编号" />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="执业资格证编号" name="licenseNo">
              <Input placeholder="请输入执业资格证编号" />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              label="医生介绍"
              name="intro"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 19 }}
            >
              <Input.TextArea
                rows={1}
                maxLength={100}
                showCount
                placeholder="请输入医生介绍"
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="医生照片"
              name="doctorImg"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
              rules={[{ required: true, message: "请上传医生照片" }]}
            >
              <ImageUpload
                // uploadType="doctor"
                maxSize={10}
                maxCount={8}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="医师执业证照片"
              name="licenseImg"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
            >
              <ImageUpload
                // uploadType="doctor"
                maxSize={10}
                maxCount={8}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="医生职称证书"
              name="professionalTitleImg"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
            >
              <ImageUpload
                // uploadType="doctor"
                maxSize={10}
                maxCount={8}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="医师资格证照片"
              name="qualificationImg"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 14 }}
            >
              <ImageUpload
                // uploadType="doctor"
                maxSize={10}
                maxCount={8}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <style>
        {`
          .tree-node-disabled .ant-select-tree-node-content-wrapper {
            color: #000 !important;
          }
          .tree-node-selectable .ant-select-tree-node-content-wrapper {
            color: #000 !important;
          }
        `}
      </style>
    </Modal>
  );
};

export default EditModal;
