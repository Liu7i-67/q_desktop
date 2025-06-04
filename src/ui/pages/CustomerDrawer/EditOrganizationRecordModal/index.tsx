import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import {
  IEditOrganizationRecordModalProps,
  IEditOrganizationRecordModalRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { DatePicker, Form, Spin, TreeSelect } from "antd";
import dayjs from "dayjs";

const EditOrganizationRecordModal = observer(
  forwardRef<
    IEditOrganizationRecordModalRef,
    IEditOrganizationRecordModalProps
  >(function EditOrganizationRecordModal_(props, ref) {
    const root = useStore();
    useSyncProps(root, Object.keys(props), props);
    const { logic, computed, refs } = root;

    useImperativeHandle(ref, () => {
      return {
        openModal: logic.openModal,
        closeModal: logic.closeModal,
      };
    });

    return (
      <Modal
        title="机构联系记录"
        open={logic.open}
        width={500}
        destroyOnClose
        onOk={logic.submit}
        styles={{
          body: {
            maxHeight: "60vh",
            overflowY: "auto",
            padding: "16px 16px 16px 0",
          },
        }}
        onCancel={logic.closeModal}
        confirmLoading={computed.loading}
      >
        <Spin spinning={computed.loading}>
          <Form form={refs.form} layout="vertical">
            <Form.Item
              label="联系时间"
              name="contactTime"
              rules={[{ required: true, message: "请选择联系时间" }]}
            >
              <DatePicker
                className="w-full"
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={(current) =>
                  current && current > dayjs().endOf("day")
                }
              />
            </Form.Item>
            <Form.Item
              label="联系机构"
              name="organizationId"
              rules={[{ required: true, message: "请选择联系机构" }]}
            >
              <TreeSelect
                placeholder={"请选择联系机构"}
                treeData={logic.orgTree}
                showSearch
                treeNodeFilterProp="title"
                treeExpandAction="click"
                labelInValue
              />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    );
  })
);

export default observer(
  forwardRef<
    IEditOrganizationRecordModalRef,
    IEditOrganizationRecordModalProps
  >(function EditOrganizationRecordModalPage(props, ref) {
    return (
      <Provider>
        <EditOrganizationRecordModal {...props} ref={ref} />
      </Provider>
    );
  })
);
