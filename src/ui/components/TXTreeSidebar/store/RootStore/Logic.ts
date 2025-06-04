import { Service } from "@/utils/Axios";
import { IResDetail, TRecord } from "@/utils/interface";
import { deleteEmptyKey, to } from "@/utils/tools";
import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { message, TreeDataNode } from "antd";
import { Key } from "react";
import {
  childListNameObj,
  deleteApiObj,
  searchNameKeyObj,
  treeDataApiObj,
  treeDataRequestObj,
} from "../../constant";
import { RootStore } from "./";
import { ILogic, TLoadingStore, TNode } from "./interface";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  originTree: TRecord[];
  expandKeys: Key[];
  treeData: TNode[];
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.originTree = [];
    this.expandKeys = [];
    this.treeData = [];
    this.getTreeData = withRequest(this.getTreeData, "getTreeData");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getTreeData() {
    const { propsStore } = this.rootStore;
    const fetchApi = treeDataApiObj[propsStore.props.type];
    const request = treeDataRequestObj[propsStore.props.type];
    const [err, res] = await to(
      (() => {
        return Service.get(fetchApi, {
          params: deleteEmptyKey({
            ...request,
          }),
        });
      })()
    );
    runInAction(() => {
      if (!(err || !res)) {
        this.originTree = res?.data ?? [];
        this.transformTree();
      }
    });
  }

  async deleteTreeNode(node: TreeDataNode) {
    const { propsStore } = this.rootStore;
    const deleteApi = deleteApiObj[propsStore.props.type];
    const idList = [node.key];
    if (deleteApi) {
      const [err, res] = await to(
        (() => {
          return Service.delete(deleteApi, {
            data: idList,
            headers: {
              "Content-Type": "application/json",
            },
          }) as Promise<IResDetail<boolean>>;
        })()
      );
      runInAction(() => {
        if (!(err || !res)) {
          message.success("删除成功");
          this.getTreeData();
        } else {
          message.error(res?.msg ?? "删除失败");
        }
      });
    }
  }

  matchSearch(node: TRecord, searchValue: string) {
    const { propsStore } = this.rootStore;
    const nameKey = searchNameKeyObj[propsStore.props.type];
    return Boolean(
      node[nameKey]?.toLowerCase().includes(searchValue.toLowerCase()) ||
        node[nameKey]?.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  getFilteredNodesAndExpandedKeys(
    searchValue: string
  ): [TRecord[], React.Key[]] {
    const { propsStore } = this.rootStore;
    const expandedKeys: Set<React.Key> = new Set();
    const childName = childListNameObj[propsStore.props.type];

    // 递归处理节点
    const processNode = (node: TRecord, parentMatched = false): any | null => {
      const currentMatches = this.matchSearch(node, searchValue) ?? false;
      // 处理子节点
      let filteredChildren: TRecord[] = [];
      if (node[childName]?.length) {
        filteredChildren = node[childName]
          .map((child: TRecord) => processNode(child, currentMatches))
          .filter(Boolean);
      }

      // 判断是否保留该节点
      const shouldKeep =
        currentMatches || filteredChildren.length > 0 || parentMatched;

      if (shouldKeep) {
        expandedKeys.add(node.id);
        return {
          ...node,
          [childName]:
            filteredChildren.length > 0 ? filteredChildren : node[childName],
        };
      }

      return null;
    };

    const filteredNodes: TRecord[] = this.originTree
      .map((node) => processNode(node))
      .filter(Boolean);

    return [filteredNodes, Array.from(expandedKeys)];
  }

  transformTree(tree?: TRecord[]) {
    const { propsStore } = this.rootStore;
    const nameKey = searchNameKeyObj[propsStore.props.type];
    const childrenName = childListNameObj[propsStore.props.type];
    function loop(nodes: TRecord[]) {
      return nodes.map((node) => {
        const beforeNode = {
          ...node,
        };
        delete beforeNode[childrenName];
        const newNode: TNode = {
          key: node.id,
          title: node[nameKey] ?? "",
          data: beforeNode,
        };
        if (Array.isArray(node[childrenName])) {
          newNode.children = loop(node[childrenName]);
        }
        return newNode;
      });
    }

    const newTree = loop(tree ?? this.originTree);
    this.treeData = newTree;
  }

  handleSearch(value: string) {
    if (value) {
      const [filteredData, keys] = this.getFilteredNodesAndExpandedKeys(value);
      this.setExpandedKeys(keys);
      this.transformTree(filteredData);
    } else {
      this.setExpandedKeys([]);
      this.transformTree();
    }
  }

  setExpandedKeys(key: Key[]) {
    this.expandKeys = key;
  }
}
