import { SearchOutlined } from "@ant-design/icons";
import { Form, Input, Pagination, Radio, Spin } from "antd";
import React from "react";
import { useSelector } from "./store";
import { useMount } from "@quarkunlimit/react-hooks";
import { cn } from "@/utils/tools";
import { ESearchType } from "@/pages/basic/permission/types";
import SideBarList from "@/pages/basic/permission/components/side-bar-list";

const Sidebar: React.FC = () => {
  const state = useSelector((x) => x.state);
  const {
    sidebarSearchType,
    sidebarList,
    sidebarListTotal,
    sidebarCurrent,
    currentSideId,
  } = state;

  const {
    handleSiderBarTypeChange,
    handleSiderBarSearch,
    handleSiderBarPageChange,
    sideBarItemClick,
  } = useSelector((x) => x.logic);

  const FormItem = Form.Item;

  const sideForm = useSelector((x) => x.sideForm);

  useMount(() => {
    handleSiderBarSearch();
  });

  return (
    <div className={"p-2"}>
      <Form
        layout={"inline"}
        className={"pb-2 w-full"}
        initialValues={{
          type: sidebarSearchType,
        }}
        form={sideForm}
      >
        <div className={"flex justify-between w-full"}>
          <FormItem name={"type"} key={"type"}>
            <Radio.Group
              className={"flex-1"}
              buttonStyle="solid"
              value={sidebarSearchType}
              onChange={(e) => {
                handleSiderBarTypeChange(e.target.value);
              }}
            >
              <Radio.Button value={ESearchType.ROLE}>角色</Radio.Button>
              <Radio.Button value={ESearchType.USER}>员工</Radio.Button>
            </Radio.Group>
          </FormItem>

          <FormItem name={"query"} key={"query"}>
            <Input
              placeholder="请输入搜索内容"
              className={"w-[150px]"}
              suffix={
                <SearchOutlined
                  onClick={() => {
                    handleSiderBarSearch(1);
                  }}
                />
              }
            />
          </FormItem>
        </div>
      </Form>
      <div
        className={cn(
          "h-[calc(100vh-240px)] overflow-y-auto",
          "mb-2",
          "w-full"
        )}
      >
        <SideBarList
          list={sidebarList as any}
          checkedId={currentSideId}
          onClick={sideBarItemClick}
        />
      </div>
      <Pagination
        className={"flex justify-center"}
        size="small"
        current={sidebarCurrent}
        pageSize={20}
        total={sidebarListTotal}
        showSizeChanger={false}
        onChange={(page) => {
          handleSiderBarPageChange(page);
        }}
      />
    </div>
  );
};

export default Sidebar;
