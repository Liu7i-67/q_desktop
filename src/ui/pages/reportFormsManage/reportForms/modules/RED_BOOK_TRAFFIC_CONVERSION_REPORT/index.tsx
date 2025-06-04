import TXChannelPicker from "@/components/TXChannelPicker";
import { reportDimensionOptions } from "@/utils/enum/modules/reportDimension";
import { Button, Form, Row, Select } from "antd";
import { ISearchInfo } from "./interface";
import { IReqReportV1ReportB0004Export } from "@/service/report/v1/report/B0004/export";
import { exportDownload, showErrorInfo, to } from "@/utils/tools";
import { red_book_traffic_conversion_report } from "./service";
import { useState } from "react";
import { DateRow } from "./DateRow";
import { HelpBtn } from "./HelpBtn";

export const RED_BOOK_TRAFFIC_CONVERSION_REPORT =
  function RED_BOOK_TRAFFIC_CONVERSION_REPORT_() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm<ISearchInfo>();

    const exportData = async () => {
      const values = await form.validateFields();
      if (!values) {
        return;
      }

      const req: IReqReportV1ReportB0004Export = {
        dimension: values.dimension,
        startLocalDateTime: values.localDateTime[0].format(
          "YYYY-MM-DD 00:00:00"
        ),
        endLocalDateTime: values.localDateTime[1].format("YYYY-MM-DD 23:59:59"),
      };

      if (values.channelIds?.length) {
        req.channelIds = values.channelIds;
      }

      setLoading(true);
      const [err, res] = await to(red_book_traffic_conversion_report(req));
      setLoading(false);

      if (err || !res) {
        showErrorInfo({ err, res });
        return;
      }

      exportDownload(res);
    };

    return (
      <div>
        <Form
          layout="inline"
          form={form}
          initialValues={{
            dimension: "DATETIME",
            method: "000",
          }}
        >
          <Row gutter={[16, 16]} className="p-4">
            <DateRow />
            <Form.Item label="渠道" name="channelIds">
              <TXChannelPicker
                className="w-[300px]"
                multiple
                placeholder="请选择来源渠道"
              />
            </Form.Item>
            <Form.Item
              label="报表维度"
              name="dimension"
              rules={[
                {
                  required: true,
                  message: "请选择报表维度",
                },
              ]}
            >
              <Select
                className="!w-[200px]"
                placeholder="请选择"
                options={reportDimensionOptions}
              />
            </Form.Item>
            <Form.Item label="统计方式" name="method">
              <Select
                disabled
                className="!w-[200px]"
                placeholder="请选择"
                options={[
                  {
                    label: "当期数据",
                    value: "000",
                  },
                ]}
              />
            </Form.Item>
            <div className="w-full mt-8 flex items-center justify-center gap-4">
              <Button type="primary" onClick={exportData} loading={loading}>
                导出
              </Button>
              <HelpBtn />
            </div>
          </Row>
        </Form>
      </div>
    );
  };
