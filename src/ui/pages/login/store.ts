import { createStore } from "@quarkunlimit/tiny";
import { Form, notification } from "antd";

import { useMethods } from "@quarkunlimit/react-hooks";
import { useImmerApi } from "@quarkunlimit/immer";
import { Login } from "@/pages/login/services";
import { useNavigate } from "react-router";
import { ILoginInfo } from "@/utils/user-helper/interface";
import UserHelper from "@/utils/user-helper";

function loginStore() {
  const r = useNavigate();

  const handle_login = (data: ILoginInfo) => {
    try {
      const deptIdLists = JSON.stringify(data.deptIdLists);
      const permissionKey = JSON.stringify(data.permissionKey);
      window.localStorage.setItem("deptIdLists", deptIdLists);
      window.localStorage.setItem("id", data.id);
      window.localStorage.setItem("nickName", data.nickname ?? "");
      window.localStorage.setItem("orgId", data?.orgId?.toString() ?? "");
      window.localStorage.setItem("permissionKey", permissionKey);
      window.localStorage.setItem("tenantId", data.tenantId);
      window.localStorage.setItem("tenantName", data.tenantName);
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("userName", data.userName);
      window.localStorage.setItem("userType", data.userType);
      window.localStorage.setItem(
        "roleIdList",
        JSON.stringify(data.roleIdList ?? [])
      );
      const userHelper = UserHelper.getInstance();
      userHelper.initLoginInfo();
      r("/", { replace: true });
    } catch (e) {
      console.error(e);
      notification.error({
        message: "登录失败",
        description: "请联系管理员",
        duration: 3,
      });
    }
  };

  const runLogin = useImmerApi(Login, {
    onSuccess(res) {
      const { data } = res;
      const { code } = data;
      if (code !== 200) {
        notification.error({
          message: "登录失败",
          description: "账号或密码错误",
          duration: 3,
        });
      }
      handle_login(data?.data);
    },
    onError(err) {
      console.error(err);
      notification.error({
        message: "登录失败",
        description: "请联系管理员",
        duration: 3,
      });
    },
  });

  const logic = useMethods({
    login() {
      form.validateFields().then((res) => {
        const request = {
          userAccount: res.userAccount,
          password: res.password,
          tenantId: res.tenant_id,
        };
        runLogin.run(request);
      });
    },
  });

  const form = Form.useForm()[0];
  return {
    form,
    logic,
    api: {
      runLogin,
    },
  };
}

export const { Provider, useSelector } = createStore(loginStore);
