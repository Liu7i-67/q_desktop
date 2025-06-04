import { forwardRef, useImperativeHandle } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type {
  IEditChannelGroupingModalProps,
  IEditChannelGroupingModalRef,
} from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { Form, Input, Select } from "antd";
import { Modal } from "@/components/TXModal";

const EditChannelGroupingModal = observer(
  forwardRef<IEditChannelGroupingModalRef, IEditChannelGroupingModalProps>(
    function EditChannelGroupingModal_(props, ref) {
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
          title={`${logic.iniData?.old ? "编辑" : "新增"}渠道分组`}
          open={logic.open}
          width={600}
          onCancel={logic.closeModal}
          onOk={logic.submit}
          okButtonProps={{
            loading: computed.loading,
          }}
        >
          <Form
            labelCol={{ span: 8 }}
            form={refs.form}
            className="pr-[40px] py-[20px]"
          >
            <Form.Item
              label="渠道分组名称"
              name="groupName"
              rules={[
                {
                  required: true,
                  message: "请输入渠道分组名称",
                },
              ]}
            >
              <Input placeholder="请输入渠道名称" maxLength={255}></Input>
            </Form.Item>
            <Form.Item
              name="channelIdList"
              label="小红书渠道"
              rules={[
                {
                  required: true,
                  message: "请选择小红书渠道",
                },
              ]}
            >
              <Select
                placeholder="请选择小红书渠道"
                options={logic.channelList}
                mode="multiple"
                showSearch
                labelInValue
                optionFilterProp="label"
                onSearch={(e) => {
                  logic.getChannelData(e);
                }}
                maxTagCount={1}
                maxTagTextLength={16}
              ></Select>
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  )
);

export default observer(
  forwardRef<IEditChannelGroupingModalRef, IEditChannelGroupingModalProps>(
    function EditChannelGroupingModalPage(props, ref) {
      return (
        <Provider>
          <EditChannelGroupingModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);

export * from "./interface";
