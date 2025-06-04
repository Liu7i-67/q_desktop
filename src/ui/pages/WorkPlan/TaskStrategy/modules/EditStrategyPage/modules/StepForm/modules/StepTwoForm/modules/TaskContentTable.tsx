import { TRecord } from "@/utils/interface";
import { observer } from "@quarkunlimit/qu-mobx";
import { Button, Form, Input, Select, Switch, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { taskCreateConditionOption } from "../../../constant";
import { useStore } from "../../../store/RootStore";
import TaskTimeInputNumber from "./TaskTimeInputNumber";

const TaskContentTable = observer(function TaskContentTable_() {
  const root = useStore();
  const { refs, logic } = root;
  const isManualCreate =
    logic.stepOneFormValue?.followSource === "MANUAL_CREATE";

  return (
    <Form.List name="taskContent">
      {(fields, { add, remove }) => {
        return (
          <Table
            size="small"
            columns={
              [
                {
                  title: "序号",
                  key: "index",
                  width: 60,
                  render: (_, __, index) => index + 1,
                },
                {
                  title: "任务描述",
                  key: "taskDesc",
                  dataIndex: "taskDesc",
                  width: 299,
                  render: (text, record) => (
                    <Form.Item
                      className="mb-0"
                      name={[record.name, "taskDesc"]}
                      fieldKey={[record.fieldKey, "taskDesc"]}
                      rules={[
                        {
                          required: true,
                          message: "请输入任务描述",
                        },
                      ]}
                    >
                      <Input.TextArea
                        style={{
                          resize: "none",
                        }}
                        disabled={isManualCreate}
                        rows={3}
                        maxLength={50}
                        placeholder="请详细描述该任务的创建原因，咨询师在跟进用户时将展示该信息，以便提醒咨询师跟进重点。限50字。"
                      />
                    </Form.Item>
                  ),
                },
                {
                  title: "任务创建条件",
                  key: "taskCreateCondition",
                  dataIndex: "taskCreateCondition",
                  width: 152,
                  render: (text, record) => (
                    <Form.Item
                      className="mb-0"
                      name={[record.name, "taskCreateCondition"]}
                      fieldKey={[record.fieldKey, "taskCreateCondition"]}
                      rules={[
                        {
                          required: true,
                          message: "请选择任务创建条件",
                        },
                      ]}
                    >
                      <Select
                        disabled={isManualCreate}
                        options={taskCreateConditionOption}
                        placeholder="不限条件"
                      />
                    </Form.Item>
                  ),
                },
                {
                  title: "开始时间",
                  key: "taskStartTime",
                  dataIndex: "taskStartTime",
                  width: 152,
                  render: (text, record) => (
                    <Form.Item
                      className="mb-0"
                      name={[record.name, "taskStartTime"]}
                      fieldKey={[record.fieldKey, "taskStartTime"]}
                      rules={[{ required: true, message: "请输入开始时间" }]}
                    >
                      <TaskTimeInputNumber type="start" />
                    </Form.Item>
                  ),
                },
                {
                  title: "截止时间",
                  key: "taskEndTime",
                  dataIndex: "taskEndTime",
                  wdith: 152,
                  render: (text, record, index) => (
                    <Form.Item
                      className="mb-0"
                      name={[record.name, "taskEndTime"]}
                      fieldKey={[record.fieldKey, "taskEndTime"]}
                      dependencies={["taskStartTime"]}
                      rules={[
                        { required: true, message: "请输入截止时间" },
                        {
                          validator: (_, value) => {
                            const taskContent =
                              refs.steopTwoForm.getFieldValue("taskContent");
                            const startTime =
                              taskContent[index]?.taskStartTime ?? undefined;
                            if (startTime && value && startTime > value) {
                              return Promise.reject("截止时间不能小于开始时间");
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <TaskTimeInputNumber type="end" />
                    </Form.Item>
                  ),
                },
                {
                  title: "优先展示",
                  key: "priorityFlag",
                  dataIndex: "priorityFlag",
                  width: 130,
                  render: (text, record) => (
                    <Form.Item
                      className="mb-0"
                      name={[record.name, "priorityFlag"]}
                      fieldKey={[record.fieldKey, "priorityFlag"]}
                      initialValue={false}
                    >
                      <Switch disabled={isManualCreate} />
                    </Form.Item>
                  ),
                },
                {
                  title: "操作",
                  key: "action",
                  width: 80,
                  fixed: "right",
                  render: (_, record, index) => (
                    <Button
                      type="link"
                      danger
                      disabled={isManualCreate}
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      删除
                    </Button>
                  ),
                },
              ] as ColumnType<TRecord>[]
            }
            dataSource={fields}
            pagination={false}
            footer={() => (
              <Button
                block
                disabled={isManualCreate}
                onClick={() => {
                  add({
                    taskCreateCondition: "UNLIMITED",
                  });
                }}
              >
                添加任务
              </Button>
            )}
          />
        );
      }}
    </Form.List>
  );
});

export default TaskContentTable;
