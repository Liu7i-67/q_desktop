import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Form, ColorPicker } from "antd";
import { TXTag } from "@/components/TXTag";
import { Color } from "antd/es/color-picker";

const FrontendExtensionItem = observer(() => {
  const root = useStore();
  const { refs } = root;

  const frontendExtension = Form.useWatch("frontendExtension", refs.editForm);
  const shiftName: string = Form.useWatch("shiftName", refs.editForm) || "";

  return (
    <>
      {frontendExtension && shiftName && (
        <Form.Item label="班次预览">
          <TXTag
            color={
              typeof frontendExtension === "string"
                ? frontendExtension
                : `#${(frontendExtension as Color)?.toHex?.()}`
            }
            text={shiftName}
          />
        </Form.Item>
      )}
      <Form.Item
        label="配色"
        name="frontendExtension"
        rules={[{ required: true, message: "请选择配色" }]}
      >
        <ColorPicker
          presets={[
            {
              label: "常用",
              colors: [
                "#3d7ce2",
                "#389e0d",
                "#ff4d4f",
                "#faad14",
                "#c41d7f",
                "#08979c",
              ],
            },
          ]}
        />
      </Form.Item>
    </>
  );
});

export default FrontendExtensionItem;
