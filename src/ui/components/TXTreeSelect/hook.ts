import { Service } from "@/utils/Axios";
import { deleteEmptyKey, to } from "@/utils/tools";
import { useMount } from "@quarkunlimit/react-hooks";
import { TreeDataNode } from "antd";
import { useEffect, useState } from "react";
import {
  IUseTXTreeSelectFetchProps,
  IUseTXTreeSelectFetchResult,
} from "./interface";

export const useTXTreeSelectFetch = (
  props: IUseTXTreeSelectFetchProps
): IUseTXTreeSelectFetchResult => {
  const {
    fetchDataApi,
    request,
    transformTree,
    initFetch = true,
    refreshFetch,
  } = props;

  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);

  const fetchData = async () => {
    const [err, res] = await to(
      (() => {
        return Service.get(fetchDataApi, {
          params: deleteEmptyKey({
            ...request,
          }),
        });
      })()
    );
    if (!(err || !res)) {
      const data = transformTree(res?.data ?? []);
      setTreeData(data);
    }
  };

  useEffect(() => {
    if (refreshFetch) {
      fetchData();
    }
  }, [refreshFetch]);

  useMount(() => {
    if (initFetch) {
      fetchData();
    }
  });

  return { treeData };
};
