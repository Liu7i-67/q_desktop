import { PlusOutlined } from "@ant-design/icons";
import { observer } from "@quarkunlimit/qu-mobx";
import { Button } from "antd";
import { useStore } from "../store/RootStore";

export interface ICreateButtonProps {
  /**@param */
  className?: string;
  /**@function 是否编辑策略 */
  onSetManageStartgyEditId: (id: string) => void;
  /**@function 设置新增、编辑策略信息组件显示隐藏 */
  onStrategyVisibleChange: (visible: boolean) => void;
}

export const CreateButton = observer(function CreateButton_(
  props: ICreateButtonProps
) {
  const root = useStore();
  const { computed } = root;
  return (
    <div
      className={`absolute top-[16px] right-[24px] ${props.className ?? ""}`}
    >
      <Button
        loading={computed.loading}
        className={`bg-[#0867e9]`}
        type="primary"
        onClick={() => {
          props.onSetManageStartgyEditId("");
          props.onStrategyVisibleChange(true);
        }}
        icon={<PlusOutlined />}
      >
        新增策略
      </Button>
    </div>
  );
});
