import { observer } from "@quarkunlimit/qu-mobx";
import { Form, Select } from "antd";
import {
  taskFinishOption,
  taskStartOption,
  taskTimeoutOption,
} from "../../constant";
import { useStore } from "../../store/RootStore";
import TaskCancelOption from "./modules/TaskCancelOption";
import TaskContentTable from "./modules/TaskContentTable";
import TaskCreateOption from "./modules/TaskCreateOption";
import TaskRelaySelect from "./modules/TaskRelaySelect";

const StepTwoForm = observer(function StepTwoForm_() {
  const root = useStore();
  const { logic, refs, propsStore } = root;

  return (
    <Form layout="vertical" form={refs.steopTwoForm}>
      <Form.Item
        label="任务创建场景"
        name="taskCreateScenario"
        rules={[
          {
            required: true,
            message: "请选择任务创建场景",
          },
        ]}
      >
        <TaskCreateOption />
      </Form.Item>
      <Form.Item label="任务内容" required>
        <TaskContentTable />
      </Form.Item>
      <div className="grid grid-cols-2 gap-x-[30px]">
        <Form.Item
          label="任务开始场景"
          name="taskStartScenario"
          rules={[
            {
              required: true,
              message: "请选择任务开始场景",
            },
          ]}
        >
          <Select
            disabled
            mode="multiple"
            options={taskStartOption}
            size="large"
            placeholder="请选择任务开始场景"
          />
        </Form.Item>
        <Form.Item
          label="任务完成场景"
          name="taskFinishScenario"
          rules={[
            {
              required: true,
              message: "请选择任务完成场景",
            },
          ]}
        >
          <Select
            disabled
            mode="multiple"
            options={taskFinishOption}
            size="large"
            placeholder="请选择任务完成场景"
          />
        </Form.Item>
        <Form.Item
          label="任务取消场景"
          name="taskCancelScenario"
          rules={[
            {
              required: true,
              message: "请选择任务取消场景",
            },
          ]}
        >
          {/* <Select
            mode="multiple"
            options={taskCancelOption}
            size="large"
            placeholder="请选择任务取消场景"
          /> */}
          <TaskCancelOption />
        </Form.Item>
        <Form.Item
          label="任务超时场景"
          name="taskTimeoutScenario"
          rules={[
            {
              required: true,
              message: "请选择任务超时场景",
            },
          ]}
        >
          <Select
            disabled
            mode="multiple"
            options={taskTimeoutOption}
            size="large"
            placeholder="请选择任务超时场景"
          />
        </Form.Item>
        <Form.Item label="任务接力场景" name="taskRelayScenario">
          <TaskRelaySelect />
        </Form.Item>
      </div>
    </Form>
  );
});

export default StepTwoForm;
