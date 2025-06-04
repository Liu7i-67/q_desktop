import { Service } from "@/utils/Axios";
import { TRecord } from "@/utils/interface";
import { deleteEmptyKey, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import type { TreeProps } from "antd/es/tree";
import { Key } from "react";
import { getConfigMap } from "../../config";
import {
  deduplicateByKeyWidthChecked,
  filterTreeWithExpand,
  generateNodePath,
  transformOriginTree,
} from "../../tool";
import { TXTreeMapHelper } from "../../TXTreeMapHelper";
import { RootStore } from "./";
import {
  ICheckedProps,
  IInitData,
  ILogic,
  TLoadingStore,
  TTXTreeCascaderNode,
} from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  originTreeData: TRecord[] = [];
  treeData: TTXTreeCascaderNode[] = [];
  originTransformTreeData: TTXTreeCascaderNode[] = [];
  initData: IInitData | null = null;
  checkedKeys: string[] = [];
  checkedNodes: TTXTreeCascaderNode[] = [];
  expandKeys: string[] = [];
  initExpandKeys: string[] = [];
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getTreeData = withRequest(this.getTreeData, "getTreeData");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getTreeData() {
    const { propsStore } = this.rootStore;
    const config = getConfigMap(propsStore.props.type);
    if (config?.fetchApi) {
      const [err, res] = await to(
        (() => {
          return Service.get(config.fetchApi, {
            params: deleteEmptyKey({
              ...config.request,
            }),
          });
        })()
      );
      runInAction(() => {
        if (!(err || !res)) {
          this.originTreeData = res?.data ?? [];
          const tree = transformOriginTree(
            propsStore.props.type,
            res?.data ?? [],
            propsStore.props.onCustomExtraNodeKey
          );
          this.originTransformTreeData = [...tree];
          this.treeData = [...tree];
        }
      });
    }
  }

  onOk() {
    const { propsStore } = this.rootStore;
    propsStore.props.afterClose?.(this.checkedNodes);
    this.closeModal();
  }

  onCheck: TreeProps["onCheck"] = (checked: ICheckedProps | Key[], info) => {
    const { propsStore } = this.rootStore;
    //取消勾选
    if (!info.checked) {
      const key = info.node.key as string;
      const checkedKey =
        key.split("_")[(info.node as TTXTreeCascaderNode).level ?? 0];
      this.onRemoveSelectedNode(checkedKey);
      return;
    }
    //勾选
    const txTreeMapHelper = TXTreeMapHelper.getInstance();
    let checkedNodes: TTXTreeCascaderNode[] = [];
    let checkedKeys: string[] = [];
    ((checked as ICheckedProps).checked as string[])
      .filter(Boolean)
      .forEach((key) => {
        const nodes = txTreeMapHelper
          .getTXTreeHelperMap(propsStore.props.type)
          ?.get(key.split("_")[key.split("_").length - 1]);
        if (nodes) {
          checkedNodes = [...checkedNodes, ...nodes];
          checkedKeys = [
            ...checkedKeys,
            ...nodes.map((node) => node.key as string),
          ];
        }
      });
    this.checkedNodes = [...checkedNodes];
    this.checkedKeys = [...checkedKeys];
  };

  onExpand: TreeProps["onExpand"] = (expandedKeys) => {
    this.expandKeys = expandedKeys as string[];
  };

  onSearch(value: string) {
    if (value.trim()) {
      const { filteredData, expandKeys } = filterTreeWithExpand(
        this.originTransformTreeData,
        value
      );
      this.treeData = filteredData;
      this.expandKeys = expandKeys;
    } else {
      this.treeData = [...this.originTransformTreeData];
      this.expandKeys = this.generateExpandKeysWithCheckedNodes();
    }
  }

  onRemoveSelectedNode(key: string) {
    this.checkedNodes = deduplicateByKeyWidthChecked(
      [...this.checkedNodes],
      key
    );
    this.checkedKeys = this.checkedNodes.map((node) => node.key as string);
  }

  async openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData ?? null;
    if (!this.originTreeData.length) {
      await this.getTreeData();
    }
    if (initData) {
      this.initTreeCheckedStatus();
      this.initExpandStatus();
    }
  }

  closeModal() {
    this.open = false;
    this.initData = {
      checkedNodes: [...this.checkedNodes],
    };
    this.expandKeys = [];
    this.checkedKeys = [];
    this.checkedNodes = [];
    this.treeData = [...this.originTransformTreeData];
  }

  initTreeCheckedStatus() {
    const { propsStore } = this.rootStore;
    let result: TTXTreeCascaderNode[] = [];
    const initCheckedKeys: string[] =
      this.initData?.checkedNodes.map((node) => {
        let key = node.key as string;
        let newKey = key.includes("_") ? key.split("_")[node.level ?? 1] : key;
        return newKey;
      }) ?? [];
    const txTreeMapHelperMap = TXTreeMapHelper.getInstance().getTXTreeHelperMap(
      propsStore.props.type
    );
    initCheckedKeys.forEach((key) => {
      result = [...result, ...(txTreeMapHelperMap?.get(key) ?? [])];
    });

    this.checkedKeys = result.map((node) => node.key as string);
    this.checkedNodes = result;
  }

  initExpandStatus() {
    const keys = this.generateExpandKeysWithCheckedNodes();
    this.expandKeys = Array.from(keys);
    this.initExpandKeys = Array.from(keys);
  }

  generateExpandKeysWithCheckedNodes() {
    const keyMap = generateNodePath(this.originTransformTreeData);
    const keys = new Set<string>();

    const findParents = (key: string) => {
      const node = keyMap.get(key);
      if (node?.parentId) {
        keys.add(node.parentId);
        findParents(node.parentId);
      }
    };

    this.checkedNodes.forEach((node) => findParents(node.key as string));

    return Array.from(keys);
  }
}
