import TXSearchForm from "@/components/TXSearchForm";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { CustomerLeadsAuth } from "@/pages/customerLead/auth";
import { transformTreeData } from "@/utils/treeTransform";
import { Button, DatePicker, Form, Input, Select, TreeSelect } from "antd";
import { useState } from "react";
import { useSelector } from "./store";

const Option = () => {
  const [expand, setExpand] = useState(false); // 默认不展开
  const FormItem = Form.Item;
  const form = useSelector((x) => x.form);
  const { runGetData, runGetChannelData, runGetStreamerData } = useSelector(
    (x) => x.api
  );
  const state = useSelector((store) => store.state);
  const { platformList, regionTree } = state;
  const {
    onSearch,
    reset,
    openAddModal,
    openAddModalCreate,
    checkCustomerPeek,
  } = useSelector((x) => x.logic);

  const channelProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/channel/get-page",
    searchParamKey: "channelName",
    transformOptions: (data) =>
      data.map((item) => ({ label: item.channelName, value: item.id })),
  });

  const streamerProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/live-streamer/get-page",
    searchParamKey: "streamerName",
    transformOptions: (data) =>
      data.map((item) => ({ label: item.streamerName, value: item.id })),
  });

  return (
    <TXSearchForm
      form={form}
      onReset={reset}
      onSearch={onSearch}
      loading={runGetData.loading}
    >
      {CustomerLeadsAuth.customerLeadsCreate && (
        <Button
          type={"primary"}
          className="mr-6"
          onClick={() => {
            openAddModal();
            openAddModalCreate();
          }}
        >
          新增客户线索
        </Button>
      )}

      <Form.Item name="phoneNumber" label="线索电话">
        <Input placeholder="请输入线索电话" />
      </Form.Item>
      <Button
        type={"primary"}
        className="mr-6"
        onClick={() => {
          checkCustomerPeek("phoneNumber");
        }}
      >
        查重
      </Button>

      <Form.Item name="wechatNumber" label="线索客户微信">
        <Input
          placeholder="请输入微信号"
          onChange={(e) => {
            form.setFieldsValue({
              wechatNumber: e.target.value?.toLocaleLowerCase?.(),
            });
          }}
        />
      </Form.Item>
      <Button
        type={"primary"}
        className="mr-6"
        onClick={() => {
          checkCustomerPeek("wechatNumber");
        }}
      >
        查重
      </Button>
      <Form.Item name="customerName" label="客户姓名">
        <Input placeholder="请输入客户姓名" />
      </Form.Item>

      <Form.Item name="areaCode" label="城市">
        <TreeSelect
          showSearch
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
      </Form.Item>

      <Form.Item name="channelId" label="广告渠道">
        <TXSearchSelect {...channelProps} placeholder="请选择广告渠道" />
        {/* <Select
          placeholder="请选择广告渠道"
          allowClear
          showSearch
          optionFilterProp="children"
          defaultActiveFirstOption={false}
          filterOption={false}
          options={channel.map((item: any) => ({
            label: item.channelName,
            value: item.id,
          }))}
          notFoundContent={
            runGetChannelData.loading ? (
              <Spin size="small" />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "#999",
                  padding: "8px 0",
                }}
              >
                暂无数据
              </div>
            )
          }
          onPopupScroll={onChannelPopupScroll}
          onSearch={(value) => {
            setChannelSearchValue(value);
            if (!value.trim()) {
              getChannelData();
            } else {
              debouncedChannelSearch();
            }
          }}
          onDropdownVisibleChange={(open) => {
            setChannelCurrent(1);
            if (open) {
              getChannelData();
              setChannelList([]);
            }
          }}
          onClear={() => {
            setChannelList([]);
            setChannelCurrent(1);
          }}
        /> */}
      </Form.Item>

      <Form.Item name="platformId" label="平台">
        <Select
          placeholder="请选择平台"
          allowClear
          showSearch
          optionFilterProp="children"
          defaultActiveFirstOption={false}
          filterOption={false}
          options={platformList.map((item: any) => ({
            label: item.platformName,
            value: item.id,
          }))}
        />
      </Form.Item>

      <Form.Item name="liveStreamerId" label="主播">
        <TXSearchSelect {...streamerProps} placeholder="请选择主播" />
        {/* <Select
          placeholder="请选择主播"
          allowClear
          showSearch
          optionFilterProp="children"
          defaultActiveFirstOption={false}
          filterOption={false}
          options={streamerList.map((item: any) => ({
            label: item.streamerName,
            value: item.id,
          }))}
          notFoundContent={
            runGetStreamerData.loading ? (
              <Spin size="small" />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "#999",
                  padding: "8px 0",
                }}
              >
                暂无数据
              </div>
            )
          }
          onPopupScroll={onStreamerPopupScroll}
          onSearch={(value) => {
            setLiveSearchValue(value);
            if (!value.trim()) {
              getStreamerData();
            } else {
              debouncedStreamerSearch();
            }
          }}
          onDropdownVisibleChange={(open) => {
            setStreamerCurrent(1);
            if (open) {
              getStreamerData();
              setStreamerList([]);
            }
          }}
          onClear={() => {
            setStreamerList([]);
            setStreamerCurrent(1);
          }}
        /> */}
      </Form.Item>

      <Form.Item name="createTime" label="创建时间">
        <DatePicker.RangePicker />
      </Form.Item>

      <Form.Item name="assignTime" label="分配时间">
        <DatePicker.RangePicker />
      </Form.Item>
    </TXSearchForm>
  );
};

export default Option;
