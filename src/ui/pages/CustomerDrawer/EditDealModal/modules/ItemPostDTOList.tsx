import { Observer, observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  TreeSelect,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { cn } from "@/utils/tools";

export const ItemPostDTOList = observer(function ItemPostDTOList_() {
  const root = useStore();
  const { logic } = root;
  return (
    <Form.Item label="成交项目" required>
      <Form.List name="itemPostDTOList">
        {(fields, { add, remove }) => (
          <Observer>
            {() => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row gutter={18} key={key}>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, "dataId"]}
                        className="flex-1"
                        rules={[{ required: true, message: "请输入成交项目" }]}
                      >
                        <TreeSelect
                          placeholder="请选择成交项目"
                          treeData={logic.pojectTree}
                          showSearch
                          treeNodeFilterProp="title"
                          treeExpandAction="click"
                          className="w-full"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} className="flex items-center">
                      <Form.Item
                        {...restField}
                        name={[name, "amount"]}
                        className="flex-1 pr-4"
                        rules={[{ required: true, message: "请输入成交金额" }]}
                      >
                        <InputNumber
                          placeholder="成交金额"
                          className="w-full"
                          min={0}
                          max={99999999.99}
                          precision={2}
                          addonBefore="￥"
                        />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        className={cn(
                          "pb-[24px] text-[#ff4d4f]",
                          name == 0 ? "opacity-0 pointer-events-none" : ""
                        )}
                      />
                    </Col>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    添加成交项目
                  </Button>
                </Form.Item>
              </>
            )}
          </Observer>
        )}
      </Form.List>
    </Form.Item>
  );
});
