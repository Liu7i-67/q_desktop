import { makeAutoObservable, Observer } from "@quarkunlimit/qu-mobx";
import { IComputed, IScheduleRecord } from "./interface";
import { RootStore } from ".";
import { ColumnsType } from "antd/es/table";
import { IWeekViewRecord } from "../../interface";
import { weekDays } from "../tools";
import { RedBookSchedulingAuth } from "@/pages/workforce/auth";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { DayCell } from "../../modules/DayCell";

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get loading() {
    const { loadingStore } = this.rootStore;
    return loadingStore.get("getWeekData") || loadingStore.get("saveView");
  }

  get columns() {
    const { logic, refs } = this.rootStore;

    const list: ColumnsType<IScheduleRecord> = [
      {
        title: "姓名",
        dataIndex: "userName",
        key: "userName",
        width: 100,
        fixed: "left",
        render: (v: string, record) => {
          return (
            <Observer>
              {() => (
                <div
                  className="w-[100px] min-h-[22px] wes cursor-pointer"
                  onClick={() => {
                    logic.optionAction(record, "user");
                  }}
                >
                  {v}
                </div>
              )}
            </Observer>
          );
        },
      },
    ];

    for (let i = 0; i < logic.rangeDate.length; i++) {
      const [y, m, d] = logic.rangeDate[i].split("-");
      list.push({
        title: `${m}/${d} ${weekDays[i]}`,
        dataIndex: logic.rangeDate[i],
        key: logic.rangeDate[i],
        width: 120,
        render: (v: string) => {
          return <Observer>{() => <DayCell dateKey={v} />}</Observer>;
        },
      });
    }

    if (RedBookSchedulingAuth.redBookSchedulingUpdate) {
      list.push({
        title: "操作",
        key: "action",
        width: 50,
        fixed: "right",
        render: (_, record) => {
          return (
            <Observer>
              {() => (
                <Popconfirm
                  title="确认删除"
                  description="是否确认删除该行数据？"
                  onConfirm={() => {
                    logic.optionAction(record, "delete");
                  }}
                  okText="确认"
                  cancelText="取消"
                >
                  <a className="text-red-500 text-lg">
                    <DeleteOutlined />
                  </a>
                </Popconfirm>
              )}
            </Observer>
          );
        },
      });
    }

    return list;
  }
}
