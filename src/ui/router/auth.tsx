import TXSuspense from "@/components/TXSuspense";
import userHelper from "@/utils/user-helper";
import { FC, memo, PropsWithChildren } from "react";
import { Navigate } from "react-router";

interface AuthProps extends PropsWithChildren {
  auth: string; // 权限标识
}

const Auth: FC<AuthProps> = ({ children, auth }) => {
  const checkUnAuth = () => {
    const token = window.localStorage.getItem("token");
    if (!token || token === "") {
      return true;
    }
  };

  if (checkUnAuth()) {
    return <Navigate to="/login" replace />;
  }

  let flag: boolean = true;
  if (auth && auth !== "") {
    flag = userHelper.getInstance().checkPermission(auth);
  }

  // 检查是否有权限
  if (!flag) {
    return <Navigate to="/no_permission" replace />; // 重定向到无权限页面
  }

  return <TXSuspense>{children}</TXSuspense>;
};

export default memo(Auth);
