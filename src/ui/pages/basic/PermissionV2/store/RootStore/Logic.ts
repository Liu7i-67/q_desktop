import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { showErrorInfo, to } from "@/utils/tools";
import { IDataSource } from "../../interface";
import { message } from "antd";
import {
  get_menu_tree,
  get_target_permission,
  set_permission,
} from "../../service";
import {
  findNodeIdsByPermissionKeys,
  buildNodeMaps,
  updateChildrenChecked,
  updateParentCheckedUpward,
  collectCheckedIdsAndKeys,
  setNodeDataScope,
  collectCheckedMenuList,
  updateCheckedAndCleanEmptyChildren,
} from "../../tools";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  dataSource: IDataSource[] = [];
  menuName?: string;
  targetEnum: "ROLE" | "USER" = "ROLE";
  targetId: string = "";
  expandedRowKeys: string[] = [];
  permissionKeysList: string[] = [];
  dataScopeEnum: string = "";

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getList = withRequest(this.getList, "getList");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  onSearch() {
    const menuName = this.rootStore.refs.searchForm.getFieldValue("menuName");
    this.menuName = menuName;
  }

  async getList() {
    const [err, res] = await to(get_menu_tree());
    if (err || !res) {
      return;
    }
    runInAction(() => {
      this.dataSource = res.data || [];
    });
  }

  async onCheck(targetId: string, targetEnum: "ROLE" | "USER") {
    this.targetId = targetId;
    this.targetEnum = targetEnum;
    await this.getPermission();
    runInAction(() => {
      this.expandedRowKeys = findNodeIdsByPermissionKeys(
        this.dataSource,
        this.permissionKeysList
      );
    });
  }

  async getPermission() {
    const [err, res] = await to(
      get_target_permission({
        targetEnum: this.targetEnum,
        targetId: this.targetId,
      })
    );
    if (err || !res) return;

    runInAction(() => {
      const permissionKeysList: string[] = res.data.map(
        (item: IDataSource) => item.permissionKey
      );
      this.permissionKeysList = permissionKeysList;

      this.dataSource = updateCheckedAndCleanEmptyChildren(
        this.dataSource,
        res.data || []
      );
    });
  }

  handleExpandRowsChange(expandKeys: string[]) {
    this.expandedRowKeys = expandKeys;
  }

  handleSetPermissionTreeSwitch(checked: boolean, id: string) {
    const { idMap, parentMap } = buildNodeMaps(this.dataSource);
    const targetNode = idMap.get(id);
    if (!targetNode) return;

    targetNode.checked = checked;
    updateChildrenChecked(targetNode, checked);
    updateParentCheckedUpward(id, parentMap);

    const { checkedIds, checkedKeys } = collectCheckedIdsAndKeys(
      this.dataSource
    );
    this.expandedRowKeys = checkedIds;
    this.permissionKeysList = checkedKeys;
  }

  handleSetDataScope(value: string, id: string) {
    setNodeDataScope(this.dataSource, id, value);
  }

  async setPermission() {
    const enableMenuList = collectCheckedMenuList(this.dataSource);

    const [err, res] = await to(
      set_permission({
        targetId: this.targetId,
        targetEnum: this.targetEnum,
        enableMenuList,
      })
    );
    if (err || !res) {
      return;
    }
    runInAction(() => {
      if (res.code === 200) {
        message.success("设置成功");
        this.getPermission();
        this.rootStore.refs.searchForm.resetFields();
        this.onSearch();
        return;
      }
      showErrorInfo({
        err,
        res,
        msg: res.msg || "设置失败",
      });
    });
  }
}
