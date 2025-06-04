import { ThreadLisAuth } from "@/pages/xhs-spotlight/threadList/auth";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, Spin } from "antd";
import { useMemo, useState } from "react";
import { useSelector } from "./store";
import TXSearchForm from "@/components/TXSearchForm";
const { RangePicker } = DatePicker;

const Option = () => {
  const [expand, setExpand] = useState<boolean>(false); // 默认不展开
  const FormItem = Form.Item;
  const form = useSelector((x) => x.form);
  const {
    onSearch,
    reset,
    setChannelList,
    setChannelCurrent,
    handleChannelSearch,
    onChannelScroll,
    getChannelData,
    exportXhsLeads,
  } = useSelector((x) => x.logic);
  const { runGetData, runGetChannelData, runExportXhsLeads } = useSelector(
    (x) => x.api
  );
  const { channelTotal, channel, channelCurrent } = useSelector((x) => x.state);
  const [channelTimer, setChannelTimer] = useState<NodeJS.Timeout | null>(null);

  // 处理渠道搜索
  const debouncedChannelSearch = (value: string) => {
    setChannelList([]);
    setChannelCurrent(1);

    if (channelTimer) {
      clearTimeout(channelTimer);
    }
    if (!value.trim()) {
      return;
    }
    const newTimer = setTimeout(() => {
      handleChannelSearch(value);
    }, 500);
    setChannelTimer(newTimer);
  };

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

  return (
    <TXSearchForm
      form={form}
      onReset={reset}
      onSearch={onSearch}
      loading={runGetData.loading}
    >
      {ThreadLisAuth.littleRedBookLeadsExport && (
        <Button
          type={"primary"}
          onClick={() => exportXhsLeads()}
          loading={runExportXhsLeads.loading}
        >
          导出excel
        </Button>
      )}
      <Form.Item name="phoneNum" label="电话号码">
        <Input placeholder="请输入电话号码" />
      </Form.Item>

      <Form.Item name="wechat" label="微信">
        <Input placeholder="请输入微信号" />
      </Form.Item>
      <Form.Item name="channelIdList" label="私信接收人">
        <Select
          placeholder="请选择私信接收人"
          mode="multiple"
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
            if (!value.trim()) {
              setChannelList([]);
              setChannelCurrent(1);
              getChannelData();
            } else {
              debouncedChannelSearch(value);
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
        />
      </Form.Item>

      <Form.Item name="campaignName" label="计划名称">
        <Input placeholder="请输入计划名称" />
      </Form.Item>
      <Form.Item name="createTime" label="创建日期">
        <RangePicker
          format="YYYY-MM-DD"
          placeholder={["开始日期", "结束日期"]}
        />
      </Form.Item>

      <Form.Item name="redId" label="用户ID">
        <Input placeholder="请输入用户ID" />
      </Form.Item>

      <Form.Item name="address" label="用户地址">
        <Input placeholder="请输入用户地址" />
      </Form.Item>

      <Form.Item name="leadsTagList" label="线索标签">
        <Select
          mode="multiple"
          placeholder="请选择线索标签"
          allowClear
          options={[
            { value: "跟进中", label: "跟进中" },
            { value: "留客资", label: "留客资" },
            { value: "高潜成交", label: "高潜成交" },
            { value: "已成单", label: "已成单" },
            { value: "无意向", label: "无意向" },
          ]}
        />
      </Form.Item>

      <Form.Item name="littleRedBookLeadsSource" label="小红书来源">
        <Select
          placeholder="请选择来源"
          allowClear
          options={[
            { value: "NATURAL_FLOW", label: "自然流" },
            { value: "PUT_IN", label: "投放" },
            { value: "UNKNOWN", label: "未知" },
          ]}
        />
      </Form.Item>
    </TXSearchForm>
  );
};

export default Option;
