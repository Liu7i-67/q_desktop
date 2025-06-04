import { Service } from "@/utils/Axios";
import { IOption, TRecord } from "@/utils/interface";
import { deleteEmptyKey, to } from "@/utils/tools";
import { useMount } from "@quarkunlimit/react-hooks";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { IUseMountFetchDataProps, IUseMountFetchDataResult } from "./interface";

/**
 * 初始化请求下拉框接口
 * @param props
 * @returns
 */
export const useSearchSelectFetch = (
  props: IUseMountFetchDataProps
): IUseMountFetchDataResult => {
  const {
    fetchDataApi,
    request,
    searchParamKey,
    transformOptions,
    refreshFetch,
    initFetch = true,
  } = props;

  const [data, setData] = useState<IOption[]>([]);
  const isMount = useRef<boolean>(false);
  const originData = useRef<IOption[]>([]);

  const fetchData = async (otherRequest?: TRecord) => {
    const [err, res] = await to(
      (() => {
        return Service.get(fetchDataApi, {
          params: deleteEmptyKey({
            page: 1,
            size: 100,
            ...request,
            ...otherRequest,
          }),
        });
      })()
    );
    if (!(err || !res)) {
      const data = transformOptions(res?.data?.records ?? res?.data ?? []);
      setData(data);
      if (!isMount.current) {
        originData.current = data;
        isMount.current = true;
      }
    }
  };

  const onSearch = debounce((value: string) => {
    if (value.trim()) {
      fetchData({
        [searchParamKey]: value,
      });
    } else {
      setData(originData.current);
    }
  }, 500);

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

  return {
    options: data,
    onSearch,
  };
};
