import TXTreeSelect from "@/components/TXTreeSelect";
import { Button, DatePicker, Form, Select, TreeSelect } from "antd";
import dayjs from "dayjs";
import { useSelector } from "../store";
import TXChannelPicker from "@/components/TXChannelPicker";

const SearchItem = (props: { type: string; info: any }) => {
  const { type, info } = props;
  const form = useSelector((state) => state.form);
  const {
    runDeptTree,
    runExportReport,
    runGetChannelTypeTree,
    runGetChannelGroup,
  } = useSelector((state) => state.api);
  const { deptTree, isStatistics, channelTypeTree, channelGroup } = useSelector(
    (state) => state.state
  );
  const { exportReport, getChannelGroup } = useSelector((state) => state.logic);

  return (
    <>
      <Form
        className="flex items-center gap-4"
        form={form}
        onFinish={() => {
          if (!isStatistics) {
            exportReport(info.code);
          }
        }}
        initialValues={
          isStatistics
            ? {
                time: [dayjs().startOf("month"), dayjs().endOf("day")],
              }
            : undefined
        }
      >
        {info.key === "teamPerformanceForm" ||
        info.key === "teamPerformanceTotalForm" ? (
          <Form.Item
            name="dept"
            rules={[{ required: true, message: "请选择部门" }]}
          >
            <TreeSelect
              loading={runDeptTree.loading}
              className={"!w-[180px]"}
              placeholder={"请选择部门"}
              treeData={deptTree as any}
              fieldNames={{
                label: "deptName",
                value: "id",
                children: "childList",
              }}
              allowClear={true}
              labelInValue
            />
          </Form.Item>
        ) : null}

        {/* 渠道 */}
        {info.key === "xhsPutForm" && (
          <Form.Item name="channelIds">
            <TXChannelPicker
              className="w-[280px]"
              multiple
              placeholder="请选择渠道"
            />
          </Form.Item>
        )}
        {/* 渠道 */}
        {info.key === "xhsPutForm" || info.key === "OACustomForm" ? (
          <Form.Item
            name="channelGroupIds"
            rules={[
              {
                required: info.key !== "xhsPutForm",
                message: "请选择渠道",
              },
            ]}
          >
            <Select
              mode="multiple"
              loading={runGetChannelGroup.loading}
              className={"!w-[200px]"}
              placeholder={"请选择渠道分组"}
              options={channelGroup as any}
              fieldNames={{
                label: "groupName",
                value: "groupId",
              }}
              allowClear={true}
              optionFilterProp="groupName"
              onSearch={(v) => getChannelGroup(v)}
            />
          </Form.Item>
        ) : null}
        {info.key === "xhsShuntForm" ? (
          <Form.Item
            name="shiftType"
            initialValue={0}
            rules={[{ required: true, message: "请选择班次" }]}
          >
            <Select
              options={[
                { label: "白班", value: 0 },
                { label: "夜班", value: 1 },
                ...(info.key === "xhsPutForm" || info.key === "OACustomForm"
                  ? [{ label: "全天", value: 2 }]
                  : []),
              ]}
            />
          </Form.Item>
        ) : null}
        {info.key === "channleNeWCustomerDealExcel" ? (
          <Form.Item
            name="channelTypeId"
            rules={[{ required: true, message: "请选择渠道分类" }]}
          >
            <TreeSelect
              loading={runGetChannelTypeTree.loading}
              className={"!w-[180px]"}
              placeholder={"请选择渠道分类"}
              treeData={channelTypeTree as any}
              fieldNames={{
                label: "typeName",
                value: "id",
                children: "childList",
              }}
              allowClear={true}
            />
          </Form.Item>
        ) : null}
        {info.key === "individualRetentionRate" ? (
          <Form.Item
            name="deptIds"
            rules={[{ required: true, message: "请选择部门" }]}
          >
            <TXTreeSelect
              loading={runDeptTree.loading}
              className={"!w-[180px]"}
              placeholder={"请选择部门"}
              treeData={deptTree as any}
              fieldNames={{
                label: "deptName",
                value: "id",
                children: "childList",
              }}
            />
          </Form.Item>
        ) : null}
        <Form.Item
          name="time"
          {...(!isStatistics
            ? {
                rules: [{ required: true, message: "请选择时间" }],
              }
            : {})}
        >
          {(() => {
            switch (type) {
              case "range":
                return (
                  <DatePicker.RangePicker
                    disabledDate={(current) =>
                      current && current > dayjs().endOf("day")
                    }
                  />
                );
              case "rangeTime":
                return (
                  <DatePicker.RangePicker
                    showTime
                    disabledDate={(current) =>
                      current && current > dayjs().endOf("day")
                    }
                  />
                );
              case "day":
                return (
                  <DatePicker
                    disabledDate={(current) =>
                      current && current > dayjs().endOf("day")
                    }
                  />
                );
              case "week":
                return (
                  <DatePicker.WeekPicker
                    disabledDate={(current) =>
                      current && current > dayjs().endOf("week")
                    }
                  />
                );
              case "month":
                return (
                  <DatePicker.MonthPicker
                    disabledDate={(current) =>
                      current && current > dayjs().endOf("month")
                    }
                  />
                );
              case "oneYear":
                return (
                  <DatePicker.RangePicker
                    disabledDate={(current: dayjs.Dayjs) =>
                      current.isAfter(dayjs(), "day") ||
                      current.isBefore(dayjs().subtract(1, "year"), "day")
                    }
                  />
                );
              default:
                return null;
            }
          })()}
        </Form.Item>
        {!isStatistics && (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={runExportReport.loading}
            >
              导出
            </Button>
          </Form.Item>
        )}
      </Form>
    </>
  );
};

export default SearchItem;
