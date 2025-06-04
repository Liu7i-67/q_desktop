import TXTreeCascader from "@/components/TXTreeCascader";
import { observer } from "@quarkunlimit/qu-mobx";
import { Form, Input, Radio } from "antd";
import { EFollowSource } from "../../interface";
import { useStore } from "../../store/RootStore";
import TreeCascaderInput from "../TreeCascaderInput";

const StepOneForm = observer(function StepOneForm_() {
  const root = useStore();
  const { logic, refs } = root;
  return (
    <>
      <Form layout="vertical" form={refs.steopOneForm}>
        <Form.Item
          label="策略名称"
          name="strategyName"
          rules={[
            {
              required: true,
              message: "请填写策略名称",
            },
          ]}
        >
          <Input size="large" maxLength={20} placeholder="限20个字" />
        </Form.Item>
        <Form.Item
          label="策略描述"
          name="strategyDesc"
          rules={[
            {
              required: true,
              message: "请填写策略描述",
            },
          ]}
        >
          <Input.TextArea
            style={{
              resize: "none",
            }}
            rows={5}
            maxLength={500}
            showCount
            placeholder="请详细描述策略内容，用于展示给咨询师查看任务细节，以便咨询师能更好得理解策略并安排好每日工作。限500字。"
          />
        </Form.Item>
        <div className="grid grid-cols-2 gap-x-[30px]">
          <Form.Item
            label="执行人"
            name="executor"
            rules={[
              {
                required: true,
                message: "请选择执行人",
              },
            ]}
          >
            <TreeCascaderInput type="Executor" />
          </Form.Item>
          <Form.Item
            label="管理人"
            name="caretaker"
            rules={[
              {
                required: true,
                message: "管理人",
              },
            ]}
          >
            <TreeCascaderInput type="Caretaker" />
          </Form.Item>
        </div>
        <Form.Item
          label="策略类型"
          name="followSource"
          rules={[
            {
              required: true,
              message: "请选择策略类型",
            },
          ]}
        >
          <Radio.Group>
            <Radio value={EFollowSource.AUTO_CREATE}>自动化流程任务</Radio>
            <Radio value={EFollowSource.MANUAL_CREATE}>
              自定义下次跟进任务
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      <TXTreeCascader
        type="deptUser"
        ref={refs.txTreeCascaderRef}
        afterClose={logic.onTxTreeCascaderChekced}
        onCustomExtraNodeKey={logic.onCustomExtraNodeKey}
      />
    </>
  );
});

export default StepOneForm;
