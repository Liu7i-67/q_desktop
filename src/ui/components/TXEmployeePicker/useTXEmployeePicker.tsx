import { useCallback, useEffect, useRef, useState } from "react";
import { ITXDept } from "./interface";
import { to } from "@/utils/tools";
import { getConfig } from "./config";
import { IOption } from "@/utils/interface";

export type TEmployeePicker =
  // 启用的员工，禁用的不可选
  | "USER"
  // 客户所属人
  | "OWNER_OF_THE_CUSTOMER"
  // 任务所属人多选;
  | "TASK_OWNER"
  // 任务所属人单选
  | "TASK_OWNER_CALENDAR";

export type TEmployeeModalPicker = Extract<TEmployeePicker, "TASK_OWNER">;

export interface IUseEmployeePickerProps {
  /** @param 展示类型 默认为客户所属人 */
  type?: TEmployeePicker;
}

export const useTXEmployeePicker = (props?: IUseEmployeePickerProps) => {
  const { type = "OWNER_OF_THE_CUSTOMER" } = props || {};

  const [treeData, setTreeData] = useState<ITXDept[]>([]);
  // 人员和组织的关系映射
  const dataMap = useRef<Map<string, string[]>>();
  // 组织和下级虚假人员的关系
  const orgMap = useRef<Map<string, string[]>>();
  // 真实id和内容的映射关系
  const infoMap = useRef<Map<string, ITXDept>>();
  const lastCheck = useRef<string>("");

  const config = getConfig(type);

  /** @function 获取数据 */
  const getDeptTreeAndUserData = useCallback(async () => {
    const [err, res] = await to(config.api(config.extraParams));
    if (err || !res) {
      return [];
    }
    const data = config.formatRes(res);

    setTreeData(data.list);
    dataMap.current = data.map;
    orgMap.current = data.orgMap;
    infoMap.current = data.infoMap;
  }, [config]);

  /** @function 获取真实的数据 */
  const getRealValue = useCallback(
    (value?: string[] | string | IOption | IOption[], noDir?: boolean) => {
      if (!value) {
        return value;
      }

      if (!Array.isArray(value)) {
        let fakeValue: string;
        if (typeof value === "string") {
          fakeValue = value;
        } else {
          fakeValue = value.value;
        }

        lastCheck.current = fakeValue;
        const [prefix, id] = fakeValue.split("___");
        const realValue = id || prefix;

        if (noDir && orgMap.current?.has(realValue)) {
          return undefined;
        }
        if (typeof value === "string") {
          return realValue;
        }
        return {
          ...value,
          value: realValue,
        };
      }

      const ids = new Set<string>();
      const outList: (string | IOption)[] = [];

      for (let v of value) {
        let text: string;
        if (typeof v === "string") {
          text = v;
        } else {
          text = v.value;
        }
        const [prefix, id] = text.split("___");
        const realValue = id || prefix;

        if (noDir && orgMap.current?.has(realValue)) {
          continue;
        }
        if (ids.has(realValue)) {
          continue;
        }
        ids.add(realValue);

        if (typeof v === "string") {
          outList.push(realValue);
        } else {
          outList.push({
            ...v,
            value: realValue,
          });
        }
      }

      return outList;
    },
    []
  );

  /** @function 获取用于展示的value */
  const getShowValue = useCallback(
    (value?: string[] | string | IOption | IOption[]) => {
      if (!value) {
        return value;
      }

      if (typeof value === "string") {
        const realValue = dataMap.current?.get?.(value);
        if (realValue?.includes(lastCheck.current)) {
          return lastCheck.current;
        }

        return realValue?.[0];
      }

      if (!Array.isArray(value)) {
        const fakeValue = value.value;
        const realValue = dataMap.current?.get?.(fakeValue);
        if (realValue?.includes(lastCheck.current)) {
          return {
            ...value,
            value: lastCheck.current,
          };
        }

        return {
          ...value,
          value: realValue?.[0],
        };
      }

      const isString = typeof value[0] === "string";

      const outList: (string | IOption)[] = [];

      const haveReadSet = new Set<string>();

      for (let v of value) {
        const realValue = isString ? v : (v as IOption).value;

        const orgList = orgMap.current?.get?.(realValue as string);

        if (orgList) {
          for (let cv of orgList) {
            if (haveReadSet.has(cv)) {
              continue;
            }
            haveReadSet.add(realValue as string);
            const list = dataMap.current?.get(cv);
            for (let fakeValue of list || []) {
              if (isString) {
                outList.push(fakeValue);
              } else {
                outList.push({
                  ...(v as IOption),
                  value: fakeValue,
                });
              }
            }
          }

          continue;
        }

        const list = dataMap.current?.get?.(realValue as string);
        haveReadSet.add(realValue as string);
        for (let fakeValue of list || []) {
          if (isString) {
            outList.push(fakeValue);
          } else {
            outList.push({
              ...(v as IOption),
              value: fakeValue,
            });
          }
        }
      }

      return outList;
    },
    []
  );

  useEffect(() => {
    getDeptTreeAndUserData();
  }, []);

  return {
    props: {
      treeData,
      ...config.extraProps,
    },
    getRealValue,
    getShowValue,
    infoMap,
  };
};
