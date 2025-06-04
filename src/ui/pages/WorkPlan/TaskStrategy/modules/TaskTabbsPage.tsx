import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Tabs } from "antd";
import { lazy } from "react";
import { useStore } from "../store/RootStore";

const EditStrategyPage = lazy(() => import("./EditStrategyPage"));
const ExcuteStartegy = lazy(() => import("./ExcuteStartegy"));
const ManageStartgy = lazy(() => import("./ManageStartgy"));

export interface ITabsProps {
  /**@param 显示隐藏策略表单页*/
  strategyVisible: boolean;
  /**@param 策略组件是否是编辑状态 */
  manageStartgyEditId: string;
  /**@function 设置新增、编辑策略信息组件显示隐藏 */
  onStrategyVisibleChange: (visible: boolean) => void;
  /**@function 管理策略是否编辑*/
  onSetManageStartgyEditId: (id: string) => void;
}

const TaskTabbsPage = observer(function TaskTabbsPage_(props: ITabsProps) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic } = root;

  if (logic.strategyVisible) {
    return (
      <EditStrategyPage
        manageStartgyEditId={props.manageStartgyEditId}
        onStrategyVisibleChange={props.onStrategyVisibleChange}
      />
    );
  }

  return (
    <div className="relative p-2">
      <Tabs
        className="px-4"
        activeKey={logic.activeKey}
        items={logic.items}
        onChange={logic.onChange}
      />
      {logic.renderSet.has("EXECUTOR") && (
        <ExcuteStartegy visible={logic.activeKey === "EXECUTOR"} />
      )}
      {logic.renderSet.has("CARETAKER") && (
        <ManageStartgy
          visible={logic.activeKey === "CARETAKER"}
          onStrategyVisibleChange={props.onStrategyVisibleChange}
          onSetManageStartgyEditId={props.onSetManageStartgyEditId}
        />
      )}
    </div>
  );
});

export default TaskTabbsPage;
