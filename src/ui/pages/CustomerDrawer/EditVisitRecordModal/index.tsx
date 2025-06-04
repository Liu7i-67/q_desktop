import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Modal } from "@/components/TXModal";
import {
  IEditVisitRecordModalProps,
  IEditVisitRecordModalRef,
} from "./interface";
import { forwardRef, useImperativeHandle } from "react";
import { DatePicker, Form, Spin, TreeSelect } from "antd";

const EditVisitRecordModal = observer(
  forwardRef<IEditVisitRecordModalRef, IEditVisitRecordModalProps>(
    function EditVisitRecordModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, refs, computed } = root;

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      return (
        <Modal
          open={logic.open}
          title="到院信息"
          width={500}
          destroyOnClose
          onCancel={logic.closeModal}
          styles={{
            body: {
              maxHeight: "60vh",
              overflowY: "auto",
              padding: "16px 16px 16px 0",
            },
          }}
          onOk={logic.submit}
          confirmLoading={computed.loading}
        >
          <Spin spinning={computed.loading}>
            <Form form={refs.form} layout="vertical">
              <Form.Item
                label="到院时间"
                name="arrivalTime"
                rules={[{ required: true, message: "请选择到院时间" }]}
              >
                <DatePicker
                  className="w-full"
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
              <Form.Item
                label="到院项目"
                name="itemDTOList"
                rules={[{ required: true, message: "请选择到院项目" }]}
              >
                <TreeSelect
                  placeholder="请选择到院项目"
                  multiple
                  treeData={logic.pojectTree}
                  showSearch
                  treeCheckable
                  treeNodeFilterProp="title"
                  treeExpandAction="click"
                />
              </Form.Item>
              <Form.Item
                label="到院机构"
                name="orgId"
                rules={[{ required: true, message: "请选择到院机构" }]}
              >
                <TreeSelect
                  placeholder={"请选择到院机构"}
                  treeData={logic.orgTree}
                  showSearch
                  treeNodeFilterProp="title"
                  treeExpandAction="click"
                />
              </Form.Item>
            </Form>
          </Spin>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IEditVisitRecordModalRef, IEditVisitRecordModalProps>(
    function EditVisitRecordModalPage(props, ref) {
      return (
        <Provider>
          <EditVisitRecordModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
