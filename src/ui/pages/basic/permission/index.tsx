import { Provider, useSelector } from "@/pages/basic/permission/store";
import Sidebar from "./sidebar";
import Option from "./option";
import Table from "./table";
import { Spin } from "antd";

const Permission = () => {
  const { runGetRoleList, runGetUserList, runGetTargetPermission } =
    useSelector((x) => x.api);
  return (
    <div className="flex">
      <Spin
        spinning={
          runGetRoleList.loading ||
          runGetUserList.loading ||
          runGetTargetPermission.loading
        }
      >
        <div className={"min-w-[300px]"}>
          <Sidebar />
        </div>
      </Spin>
      <div className="p-2 w-[calc(100%-320px)]">
        <Option />
        <Table />
      </div>
    </div>
  );
};

export default () => {
  return (
    <Provider>
      <Permission />
    </Provider>
  );
};
