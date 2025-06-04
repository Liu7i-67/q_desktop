import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Checkbox, Col, Empty, Row } from "antd";

export const AllKeyPicker = observer(function AllKeyPicker_() {
  const root = useStore();
  const { logic, computed } = root;

  const columnSpan = logic.initData?.columnSpan || 6;

  if (!computed.allKey.length) {
    return (
      <div className="flex items-center justify-center">
        <Empty description="没有相关的表单项" />
      </div>
    );
  }
  return (
    <Row gutter={[12, 12]}>
      {computed.allKey.map((c) => {
        const key = c.name;
        if (typeof key !== "string") {
          return null;
        }
        const record = logic.columnMap.get(key);

        if (!record) return null;
        return (
          <Col span={columnSpan} key={c.name}>
            <Checkbox
              checked={!record.hidden}
              onChange={() => logic.changeHidden(key)}
            >
              {record.label}
            </Checkbox>
          </Col>
        );
      })}
    </Row>
  );
});
