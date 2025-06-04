import { Modal } from "@/components/TXModal";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { transformTreeData } from "@/utils/treeTransform";
import ImageUpload from "@/utils/upload";
import { phoneValidator } from "@/utils/validator";
import { Form, Input, Select, TreeSelect } from "antd";
import TextArea from "antd/es/input/TextArea";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "./store";

const EditModal = () => {
  const {
    runSave,
    runUpdate,
    runGetCustomerLeadDetails,
    runGetChannelData,
    runGetStreamerData,
  } = useSelector((x) => x.api);
  const {
    addModalVisible,
    regionTree,
    channel,
    platformList,
    streamerList,
    isCreate,
    channelCurrent,
    channelTotal,
    streamerCurrent,
    streamerTotal,
    updateRecord,
    addModalLoading,
  } = useSelector((x) => x.state);
  const addForm = useSelector((x) => x.addForm);
  const FormItem = Form.Item;
  const {
    closeAddModal,
    addModalSubmit,
    updateModalSubmit,
    getCustomerLeadDetails,
    setChannelList,
    setChannelCurrent,
    handleChannelSearch,
    onChannelScroll,
    getChannelData,
    setStreamerList,
    setStreamerCurrent,
    handleStreamerSearch,
    onStreamerScroll,
    getStreamerData,
  } = useSelector((x) => x.logic);
  const [leadType, setLeadType] = useState<string | undefined>(undefined);
  const [channelTimer, setChannelTimer] = useState<NodeJS.Timeout | null>(null);
  const [streamerTimer, setStreamerTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const channelProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/channel/get-page",
    searchParamKey: "channelName",
    transformOptions: (data) =>
      data.map((item) => ({ label: item.channelName, value: item.id })),
    refreshFetch: leadType === "PLACE" && addModalVisible,
    initFetch: false,
  });

  const streamerProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/live-streamer/get-page",
    searchParamKey: "streamerName",
    transformOptions: (data) =>
      data.map((item) => ({ label: item.streamerName, value: item.id })),
    refreshFetch: leadType === "ECOMMERCE" && addModalVisible,
    initFetch: false,
  });

  const handleLeadTypeChange = (value: string) => {
    setLeadType(value);
  };

  useEffect(() => {
    if (addModalVisible) {
      if (!isCreate) {
        getCustomerLeadDetails();
      }
    } else {
      setLeadType(undefined);
    }
  }, [addModalVisible, isCreate]);

  useEffect(() => {
    // 监听表单中 leadsType 的值变化
    const leadsType = addForm.getFieldValue("leadsType");
    if (leadsType) {
      handleLeadTypeChange(leadsType);
    }
  }, [addForm.getFieldValue("leadsType")]);

  const debouncedChannelSearch = debounce((value: string) => {
    setChannelList([]);
    setChannelCurrent(1);
    handleChannelSearch(value);
  }, 300);

  // 处理渠道滚动加载
  const onChannelPopupScroll = (e: any) => {
    const { target } = e;
    if (
      !runGetChannelData.loading &&
      channelTotal > channel.length &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      // 先更新页码，再加载数据
      const nextPage = channelCurrent + 1;
      setChannelCurrent(nextPage);
      onChannelScroll(nextPage);
    }
  };

  // 处理KOL搜索
  const debouncedStreamerSearch = (value: string) => {
    setStreamerList([]);
    setStreamerCurrent(1);

    if (streamerTimer) {
      clearTimeout(streamerTimer);
    }
    if (!value.trim()) {
      return;
    }
    const newTimer = setTimeout(() => {
      handleStreamerSearch(value);
    }, 500);
    setStreamerTimer(newTimer);
  };

  // 处理KOL滚动加载
  const onStreamerPopupScroll = (e: any) => {
    const { target } = e;
    if (
      !runGetStreamerData.loading &&
      streamerTotal > streamerList.length &&
      target.scrollTop + target.offsetHeight >= target.scrollHeight - 30
    ) {
      // 先更新页码，再加载数据
      const nextPage = streamerCurrent + 1;
      setStreamerCurrent(nextPage);
      onStreamerScroll(nextPage);
    }
  };

  return (
    <Modal
      title={isCreate ? "新增客户线索" : "修改客户线索"}
      open={addModalVisible}
      onCancel={closeAddModal}
      onOk={isCreate ? addModalSubmit : updateModalSubmit}
      okButtonProps={{
        loading: addModalLoading,
      }}
      confirmLoading={isCreate ? runSave.loading : runUpdate.loading}
      destroyOnClose
      width={900}
      loading={!isCreate && runGetCustomerLeadDetails.loading}
    >
      <Form
        className={"p-8 max-h-[60vh] overflow-y-auto"}
        layout={"vertical"}
        form={addForm}
      >
        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            name="leadsType"
            label="线索类型"
            rules={[{ required: true, message: "请选择线索类型" }]}
          >
            <Select
              placeholder="请选择线索类型"
              onChange={handleLeadTypeChange}
            >
              <Select.Option value="PLACE">投放</Select.Option>
              <Select.Option value="ECOMMERCE">电商</Select.Option>
            </Select>
          </Form.Item>

          {/* 根据线索类型动态展示表单项 */}
          {leadType === "PLACE" && (
            <Form.Item
              name="channelName"
              label="广告渠道"
              rules={[{ required: true, message: "请选择广告渠道" }]}
            >
              <TXSearchSelect
                {...channelProps}
                labelInValue
                placeholder="请选择广告渠道"
              />
            </Form.Item>
          )}

          {leadType === "ECOMMERCE" && (
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
                <Select placeholder="请选择平台">
                  {platformList.map((platform) => (
                    <Select.Option key={platform.id} value={platform.id}>
                      {platform.platformName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}

          <FormItem
            name="customerName"
            label="客户姓名"
            rules={[{ message: "请输入客户姓名" }]}
          >
            <Input placeholder="请输入客户姓名" />
          </FormItem>

          <FormItem
            name="phoneNumber"
            label="线索电话"
            rules={[{ validator: phoneValidator }]}
          >
            <Input placeholder="请输入线索电话" />
          </FormItem>

          <FormItem
            name="areaCode"
            label="所在城市"
            rules={[{ message: "请选择城市" }]}
          >
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder="请选择城市"
              allowClear
              treeData={transformTreeData(regionTree)}
              filterTreeNode={(inputValue, node) =>
                (node.title as string)
                  .toLowerCase()
                  .indexOf(inputValue.toLowerCase()) > -1
              }
            />
          </FormItem>

          <FormItem name="wechatNumber" label="微信号">
            <Input
              placeholder="请输入微信号"
              onChange={(e) =>
                addForm.setFieldsValue({
                  wechatNumber: e.target.value.toLowerCase(),
                })
              }
            />
          </FormItem>
        </div>
        <FormItem name="memo" label="备注">
          <TextArea placeholder="请输入备注" maxLength={256} showCount />
        </FormItem>

        <FormItem name="wechatQrCode" label="微信二维码">
          <ImageUpload
            // uploadType="customerLead"
            maxSize={10}
            maxCount={1}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default EditModal;
