import { Button, InputNumber, Select, Space, Spin, Table } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "../store";
import dayjs from "dayjs";
import { JudgeEnableFlag } from "@/utils/tools";

interface CoordinateTableProps {
  dataSource: readonly any[];
  // consultantList: readonly any[];
  onChange: (newData: any[]) => void;
}

const CoordinateTable: React.FC<CoordinateTableProps> = ({
  dataSource,
  onChange,
}) => {
  const { runGetEmployee } = useSelector((x) => x.api);
  const { employeeList, employeeTotal, employeeCurrent, updateModalData } =
    useSelector((x) => x.state);
  const {
    handleEmployeeSearch,
    setEmployeeCurrent,
    setEmployeeList,
    onEmployeeScroll,
  } = useSelector((x) => x.logic);
  const [searchValue, setSearchValue] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (newData: readonly any[]) => {
    console.log(newData);
    onChange(JSON.parse(JSON.stringify(newData)));
  };

  const handleAdd = () => {
    const newData = {
      key: dayjs().valueOf(),
      collabType: undefined,
      ratio: 0,
      userId: undefined,
    };
    handleChange([...dataSource, newData]);
  };

  const handleItemChange = (
    record: any,
    field: string,
    value: any,
    index: number
  ) => {
    // const newData = dataSource.map((item) => item.id === record.id ? { ...item, [field]: value } : { ...item });
    // handleChange(newData);
    const newData = dataSource.reduce((prev, item, idx) => {
      return idx === index
        ? [
            ...prev,
            {
              ...item,
              [field]: value,
            },
          ]
        : [
            ...prev,
            {
              ...item,
            },
          ];
    }, []);
    handleChange(newData);
  };

  const handleDelete = (key: number, index: number) => {
    const newData = key
      ? dataSource.filter((item) => item.key !== key)
      : dataSource.filter((_, i) => i !== index);
    handleChange(newData);
  };

  // 处理员工搜索
  const debouncedSearch = (value: string) => {
    setSearchValue(value);
    setEmployeeList([]);
    setEmployeeCurrent(1);

    if (timer) {
      clearTimeout(timer);
    }
    if (!value.trim()) {
      return;
    }
    const newTimer = setTimeout(() => {
      handleEmployeeSearch(value);
    }, 500);
    setTimer(newTimer);
  };

  // 处理员工上拉刷新
  const onPopupScroll = (e: any) => {
    const { target } = e;
    if (
      !runGetEmployee.loading &&
      employeeTotal > employeeList.length &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      onEmployeeScroll(searchValue, employeeCurrent + 1);
    }
  };

  const columns = [
    {
      title: "合作类型",
      dataIndex: "collabType",
      key: "collabType",
      render: (_: any, record: any, index: number) => (
        <Select
          style={{ width: "100%" }}
          value={record.collabType}
          onChange={(value) =>
            handleItemChange(record, "collabType", value, index)
          }
        >
          <Select.Option value="OFFICIAL">官方合作</Select.Option>
          <Select.Option value="COLLABORATION">协作合作</Select.Option>
        </Select>
      ),
      width: "30%",
    },
    {
      title: "合作比率(%)",
      dataIndex: "ratio",
      key: "ratio",
      render: (_: any, record: any, index: number) => (
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          max={100}
          precision={0}
          value={record.ratio}
          onChange={(value) => {
            handleItemChange(record, "ratio", value, index);
          }}
        />
      ),
      width: "20%",
    },
    {
      title: "合作用户",
      dataIndex: "userId",
      key: "userId",
      render: (_: any, record: any, index: number) => (
        <Select
          showSearch
          allowClear
          placeholder="请输入搜索关键词"
          defaultValue={
            record.userId
              ? {
                  key: record.userId,
                  label: record.userName,
                  value: record.userId,
                }
              : undefined
          }
          labelInValue
          defaultActiveFirstOption={false}
          filterOption={false}
          onSearch={debouncedSearch}
          onChange={(value: any) => {
            handleItemChange(record, "userId", value?.value, index);
          }}
          onClear={() => {
            setEmployeeList([]);
            setEmployeeCurrent(1);
            handleItemChange(record, "userId", undefined, index);
          }}
          onPopupScroll={onPopupScroll}
          notFoundContent={
            runGetEmployee.loading ? (
              <Spin size="small" />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "#999",
                  padding: "8px 0",
                }}
              >
                暂无数据
              </div>
            )
          }
          style={{ width: "100%" }}
        >
          {employeeList.map((employee) => (
            <Select.Option
              disabled={JudgeEnableFlag(employee)}
              key={employee.id}
              value={employee.id}
            >
              {employee.userName}
            </Select.Option>
          ))}
        </Select>
      ),
      width: "40%",
    },
    {
      title: "操作",
      key: "action",
      width: "10%",
      render: (_: any, record: any, index: number) => {
        const localStorageData = localStorage.getItem("updateModalData")
          ? JSON.parse(localStorage.getItem("updateModalData") as string)
          : null;
        return (
          <Space>
            {localStorageData &&
              record.userName !== localStorageData.ownerName && (
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record.key, index)}
                />
              )}
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Button
        className="mb-4"
        type="dashed"
        onClick={handleAdd}
        icon={<PlusOutlined />}
      >
        添加合作
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
    </>
  );
};

export default CoordinateTable;
