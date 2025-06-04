import { Button, Form, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { observer } from "@quarkunlimit/qu-mobx";

const RelationItem = observer(() => {
  const channelProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/channel/get-page",
    searchParamKey: "channelName",
    transformOptions: (data) =>
      data.map((item) => ({ label: item.channelName, value: item.id })),
  });

  return (
    <Form.List name="relationList" initialValue={[{}]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, index) => (
            <Form.Item
              label={index === 0 ? "渠道及权重" : ""}
              required
              style={{ marginBottom: 16 }}
              key={key}
            >
              <div className={"flex gap-x-2 justify-between"}>
                <Form.Item
                  {...restField}
                  name={[name, "channelId"]}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "请选择渠道",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const relationList =
                          getFieldValue("relationList") || [];
                        const duplicateCount = relationList.filter(
                          (item: { channelId: string }) =>
                            item?.channelId === value
                        ).length;

                        if (duplicateCount > 1) {
                          return Promise.reject(new Error("渠道不能重复选择"));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <TXSearchSelect {...channelProps} placeholder="请选择渠道" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "weight"]}
                  noStyle
                  rules={[{ required: true, message: "请输入权重" }]}
                >
                  <InputNumber
                    placeholder="请输入权重"
                    min={0}
                    max={100}
                    precision={0}
                    style={{ width: 100 }}
                  />
                </Form.Item>
                {fields.length > 1 && (
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    className="text-red-500"
                  />
                )}
              </div>
            </Form.Item>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              添加渠道
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
});

export default RelationItem;
