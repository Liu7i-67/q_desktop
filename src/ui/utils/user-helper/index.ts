import { EUserType, ILoginInfo } from "@/utils/user-helper/interface";
import { AddressHelper } from "../address-helper";

class UserHelper {
  static instance: UserHelper | null = null;
  /**
   * @permissions 权限列表
   */
  permissions: string[] = [];
  /**
   * @tenantId 租户id
   */
  tenantId: string = "";
  /**
   * @token 身份token
   */
  token: string = "";
  /**
   * @员工关联的部门id
   */
  deptIdLists: string[] = [];
  /**
   * @loginInfo 其他登录信息
   */
  // @ts-ignore
  loginInfo: ILoginInfo;

  static getInstance() {
    if (!UserHelper.instance) {
      UserHelper.instance = new UserHelper();
    }
    return UserHelper.instance;
  }

  /**
   * @initLoginInfo 初始化登录
   */
  initLoginInfo() {
    try {
      const deptIdLists = window.localStorage.getItem("deptIdLists");
      const _deptIdLists = JSON.parse(deptIdLists!);
      const id = window.localStorage.getItem("id");
      const nickName = window.localStorage.getItem("nickName");
      const orgId = window.localStorage.getItem("orgId");
      const permissionKey = window.localStorage.getItem("permissionKey");
      const _permissionKey = JSON.parse(permissionKey!);
      const tenantId = window.localStorage.getItem("tenantId");
      const tenantName = window.localStorage.getItem("tenantName");
      const token = window.localStorage.getItem("token");
      const userName = window.localStorage.getItem("userName");
      const userType = window.localStorage.getItem("userType");
      const roleIdList = window.localStorage.getItem("roleIdList") ?? "[]";
      const role_id_list = JSON.parse(roleIdList);

      this.loginInfo = {
        deptIdLists: _deptIdLists,
        id: id ?? "",
        nickname: nickName ?? "",
        orgId: orgId ?? "",
        permissionKey: _permissionKey,
        tenantId: tenantId ?? "",
        tenantName: tenantName ?? "",
        token: token ?? "",
        userName: userName ?? "",
        userType: (userType as EUserType) ?? EUserType.CONSULTANT,
        roleIdList: role_id_list ?? [],
      };
      this.token = this.loginInfo.token;
      this.permissions = _permissionKey;
      this.tenantId = this.loginInfo.tenantId;
      this.deptIdLists = this.loginInfo.deptIdLists;
      if (this.token) {
        AddressHelper.getInstance().getRegionTree();
      }
    } catch (e) {
      console.error("initLoginInfo Error----: ", e);
    }
  }

  /**
   * @getPermissions 获取权限
   */
  getPermissions() {
    return this.permissions;
  }

  /**
   * @checkPermission 检查是否有权限
   */
  checkPermission(key: string): boolean {
    if (key === "") {
      return true;
    }
    return (
      this.permissions?.findIndex((permission: string) => permission === key) >
      -1
    );
  }

  /**
   * @getTenantId 获取门店id
   */
  get getTenantId() {
    return this.tenantId;
  }

  /**
   * @getUserId 获取员工id
   */
  get getUserId() {
    return this.loginInfo.id;
  }

  /**
   * @getUserRoleIdList 获取当前登录用户权限列表
   */
  get getUserRoleIdList() {
    return this.loginInfo.roleIdList;
  }
}

export default UserHelper;
