import { Modal } from "@/components/TXModal";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import TXTreeSelect from "@/components/TXTreeSelect";
import { AsyncImageUpload } from "@/utils/upload";
import { phoneValidator } from "@/utils/validator";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { useMount } from "@quarkunlimit/react-hooks";
import { Form, Input, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { forwardRef, useImperativeHandle } from "react";
import { IAddCustomerModalProps, IAddCustomerModalRef } from "./interface";
import RepeatFormItemHOC from "./modules/RepeatFormItemHOC";
import { Provider, useStore } from "./store/RootStore";
import TXSearchUserSelect from "@/components/TXSearchSelect/modules/UserSelct";

const AddCustomerModal = observer(
  forwardRef<IAddCustomerModalRef, IAddCustomerModalProps>(
    function AddCustomerModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, refs, computed } = root;
      const leadsType = Form.useWatch("leadsType", refs.addCustomerForm);

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      const channelProps = useSearchSelectFetch({
        fetchDataApi: "/api/base/v1/channel/get-page",
        searchParamKey: "channelName",
        initFetch: false,
        refreshFetch: logic.open && leadsType === "PLACE",
        transformOptions: (data) =>
          data.map((item) => ({ label: item.channelName, value: item.id })),
      });

      const streamerProps = useSearchSelectFetch({
        fetchDataApi: "/api/base/v1/live-streamer/get-page",
        searchParamKey: "streamerName",
        initFetch: false,
        refreshFetch: logic.open && leadsType === "ECOMMERCE",
        transformOptions: (data) =>
          data.map((item) => ({ label: item.streamerName, value: item.id })),
      });

      const platFormProps = useSearchSelectFetch({
        fetchDataApi: "/api/base/v1/platform/get-page",
        searchParamKey: "platformName",
        initFetch: false,
        refreshFetch: logic.open && leadsType === "ECOMMERCE",
        transformOptions: (data) =>
          data.map((item) => ({ label: item.platformName, value: item.id })),
      });

      useMount(() => {
        logic.getRegionTree();
      });

      return (
        <Modal
          title="新增客户"
          open={logic.open}
          width={800}
          destroyOnClose
          onOk={logic.onOk}
          onCancel={logic.closeModal}
          okButtonProps={{
            loading: computed.loading,
          }}
        >
          <Spin spinning={computed.loading}>
            <Form
              className={"p-8 max-h-[60vh] overflow-y-auto"}
              layout={"vertical"}
              form={refs.addCustomerForm}
            >
              <div className="grid grid-cols-3 gap-4">
                <Form.Item
                  name="leadsType"
                  label="来源渠道类型"
                  rules={[{ required: true, message: "请选择来源渠道类型 " }]}
                >
                  <Select placeholder="请选择线索类型">
                    <Select.Option value="PLACE">投放</Select.Option>
                    <Select.Option value="ECOMMERCE">电商</Select.Option>
                  </Select>
                </Form.Item>
                {leadsType === "PLACE" && (
                  <Form.Item
                    name="channelName"
                    label="渠道"
                    rules={[{ required: true, message: "请选择渠道" }]}
                  >
                    <TXSearchSelect
                      {...channelProps}
                      labelInValue
                      placeholder="请选择渠道"
                    />
                  </Form.Item>
                )}
                {leadsType === "ECOMMERCE" && (
                  <>
                    <Form.Item
                      name="liveStreamerName"
                      label="主播"
                      rules={[{ required: true, message: "请选择主播" }]}
                    >
                      <TXSearchSelect
                        {...streamerProps}
                        labelInValue
                        placeholder="请选择主播"
                      />
                    </Form.Item>
                    <Form.Item
                      name="platformId"
                      label="平台"
                      rules={[{ required: true, message: "请选择平台" }]}
                    >
                      <TXSearchSelect
                        {...platFormProps}
                        placeholder="请选择平台"
                      />
                    </Form.Item>
                  </>
                )}
                <Form.Item
                  name="customerName"
                  label="客户姓名"
                  rules={[{ message: "请输入客户姓名" }]}
                >
                  <Input placeholder="请输入客户姓名" />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="客户电话"
                  rules={[
                    { message: "请输入客户电话" },
                    {
                      validator: phoneValidator,
                    },
                  ]}
                >
                  <RepeatFormItemHOC type="phone" />
                </Form.Item>
                <Form.Item name="wechatNumber" label="客户微信">
                  <RepeatFormItemHOC
                    type="wechat"
                    onChange={(e) => {
                      refs.addCustomerForm.setFieldValue(
                        "wechatNumber",
                        e.target?.value?.toLowerCase?.()
                      );
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="areaCode"
                  label="所在城市"
                  rules={[{ message: "请选择城市" }]}
                >
                  <TXTreeSelect
                    treeCheckable={false}
                    treeExpandAction={undefined}
                    placeholder="请选择城市"
                    treeNodeFilterProp="title"
                    treeData={logic.regionTree}
                  />
                </Form.Item>
                <Form.Item
                  name="ownerUserId"
                  label="指派咨询师"
                  rules={[{ required: true, message: "请选择指派咨询师" }]}
                >
                  <TXSearchUserSelect
                    extraHookProps={{
                      initFetch: false,
                      refreshFetch: logic.open,
                      request: {
                        userType: "CONSULTANT",
                      },
                    }}
                    placeholder="请选择指派咨询师"
                  />
                </Form.Item>
              </div>
              <Form.Item name="memo" label="备注">
                <TextArea placeholder="请输入备注" maxLength={256} showCount />
              </Form.Item>
              <Form.Item name="wechatQrCode" label="微信二维码">
                <AsyncImageUpload
                  uploadType="customer"
                  maxSize={10}
                  maxCount={1}
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
  forwardRef<IAddCustomerModalRef, IAddCustomerModalProps>(
    function AddCustomerModalPage(props, ref) {
      return (
        <Provider>
          <AddCustomerModal {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
