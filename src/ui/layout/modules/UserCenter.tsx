import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Dropdown, message } from "antd";
import {
  CaretDownOutlined,
  DeleteOutlined,
  LogoutOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UserHelper from "@/utils/user-helper";
import { EUserType } from "@/utils/user-helper/interface";
import userHelper from "@/utils/user-helper";
import { useNavigate } from "react-router";
import { deleteIndexedDB } from "@/utils/DataBase";

export const UserCenter = observer(function UserCenter_() {
  const root = useStore();
  const { logic, refs } = root;

  const navigate = useNavigate();
  const userInfo = userHelper.getInstance();

  return (
    <Dropdown
      className={"h-[36px] flex items-center relative -right-[34px]"}
      menu={{
        items: [
          {
            key: "center",
            label: "个人中心",
            icon: <UserOutlined />,
            onClick: () => {
              refs.userRef.current?.openDrawer();
            },
          },
          {
            key: "message",
            label: logic.listenFlag ? "关闭消息通知" : "开启消息通知",
            icon: <MessageOutlined />,
            style: {
              color: logic.listenFlag ? "red" : "green",
              display:
                UserHelper.getInstance().loginInfo.userType !== EUserType.ORG
                  ? "none"
                  : "initial",
            },
            onClick: logic.changeListenFlag,
          },
          {
            type: "divider",
          },
          {
            key: "reset",
            label: "清空本地配置",
            icon: <DeleteOutlined />,
            style: {
              color: "red",
            },
            onClick: async () => {
              await deleteIndexedDB();
              message.success("本地配置已清空，请刷新页面");
            },
          },
          {
            type: "divider",
          },
          {
            key: "logout",
            label: "退出登录",
            icon: <LogoutOutlined />,
            onClick: () => {
              // 处理退出登录逻辑
              localStorage.clear();
              navigate("/login", { replace: true });
            },
          },
          {
            key: "verison",
            label: `当前版本：${process.env.PUBLIC_TX_VERSION}`,
          },
        ],
      }}
    >
      <div className="flex gap-1 cursor-pointer">
        <div className="cursor-pointer">{userInfo.loginInfo.userName}</div>
        <div className="w-[32px] h-[32px] rounded-[50%] bg-[#0867e9] text-white flex items-center justify-center">
          {userInfo.loginInfo.userName?.slice?.(0, 1)}
        </div>
        <CaretDownOutlined className="text-[#D9D9D9]" />
      </div>
    </Dropdown>
  );
});
