import { message } from "antd";
import copy from "copy-to-clipboard";
import { twMerge } from "tailwind-merge";
import { IApiData } from "./Axios";
import { BigNumber } from "./BigNumber";

export function cn(...args: string[]) {
  return twMerge(...args);
}

/**
 * 导出报表后处理下载文件、提示信息
 */

export function exportDownload(data: { code: number; data: any; msg: string }) {
  if (data.code === 200) {
    if (data.data?.fileDTO?.fullPath) {
      const link = document.createElement("a");
      link.href = data.data.fileDTO.fullPath;
      link.download = data.data.fileDTO.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      message.success("导出成功");
    } else if (data.data.exportAsync) {
      message.warning("本次操作后台处理中，请稍后到下载中心下载");
    } else if (data.data.noDataFlag) {
      message.warning("暂无数据");
    } else {
      message.error(data.msg);
    }
  } else {
    message.error(data.msg);
  }
}

/**
 * 格式化金额显示
 * @param {number|string} amount - 输入值(数字或字符串)
 * @symbol - 金额前缀 ￥ $
 * @returns {string} 格式化后的金额字符串
 */
export function formatCurrency(amount: number | string, symbol = "") {
  // 1. 输入有效性检测（过滤非数字和负数）
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (num === 0) {
    return "0元";
  } else if (!num) {
    return "-";
  }

  // 2. 分离整数与小数部分
  const [integer, decimalPart = ""] = num.toString().split(".");

  // 3. 处理小数截断（不补零）
  const truncatedDecimal = decimalPart.slice();
  const showDecimal = truncatedDecimal.length > 0 ? `.${truncatedDecimal}` : "";

  // 4. 千分位格式化整数部分（兼容百万级）
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 5. 拼接最终结果
  return `${symbol}${formattedInteger}${showDecimal}元`;

  // const num = typeof value === 'string' ? parseFloat(value) : Number(value);
  // if (isNaN(num)) return 0;

  // if (Math.abs(num) < 10000) {
  //   return `${num}元`;
  // } else {
  //   // return `${(num / 10000).toFixed(decimal)}万`;
  //   return `${(num.toLocaleString())}元`;
  // }
}

export function handleBeforeInput(e: any) {
  const inputChar = e.data;
  // 使用正则表达式判断是否为数字或英文字符
  if (!/^[a-zA-Z0-9]$/.test(inputChar)) {
    e.preventDefault(); // 拦截非法输入
  }
}

export function logOut() {
  try {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("permissionKey");
    window.location.href = "/#/login";
  } catch (e) {
    console.log(e);
  }
}

// 将时间段转换为十进制（半小时为单位）
export const timeQuantum2system = (times: any) => {
  let timeSlotValue = "0";

  if (times && times[0] && times[1]) {
    const startSlot = times[0].hour() * 2 + (times[0].minute() >= 30 ? 1 : 0);
    let endSlot = times[1].hour() * 2 + (times[1].minute() >= 30 ? 1 : 0);

    // 如果结束时间是 00:00:00，则视为 24:00:00，对应区间索引为 48
    if (
      times[1].hour() === 0 &&
      times[1].minute() === 0 &&
      times[1].second() === 0
    ) {
      endSlot = 48;
    }

    // 创建48位的二进制字符串，初始全为0
    let binaryStr = "0".repeat(48);

    // 将选中时间段的位置设为1
    binaryStr = binaryStr
      .split("")
      .map((_, index) => (index >= startSlot && index < endSlot ? "1" : "0"))
      .reverse()
      .join("");

    // 转换为十进制数
    timeSlotValue = parseInt(binaryStr, 2).toString();
  }
  return timeSlotValue;
};

// 将十进制转换为时间段
export const system2timeQuantum = (timeSlot: string) => {
  // 转换为48位二进制字符串，并反转（因为我们存储时是反转的）
  const binaryStr = parseInt(timeSlot)
    .toString(2)
    .padStart(48, "0")
    .split("")
    .reverse()
    .join("");

  // 找到第一个1和最后一个1的位置
  const startSlot = binaryStr.indexOf("1");
  const endSlot = binaryStr.lastIndexOf("1") + 1; // 加1来包含完整的半小时

  // 转换回小时和分钟
  // 每30分钟一个时间段，所以直接用位置计算时间
  const startHour = Math.floor(startSlot * 0.5);
  const startMinute = startSlot % 2 === 0 ? 0 : 30;
  const endHour = Math.floor(endSlot * 0.5);
  const endMinute = endSlot % 2 === 0 ? 0 : 30;

  return [
    `${startHour.toString().padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`,
    `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`,
  ];
};

export function handleCopy(value: string | number) {
  try {
    copy(typeof value !== "number" ? value : value.toString());
    message.success("已复制到剪切板");
  } catch (e) {
    console.error(e);
    message.warning("复制失败");
  }
}

/**
 * 遍历树，根据 id 找 label
 */
export function findLabelsByIds(tree: any[], ids: string[]): Array<any> {
  const nodes: any[] = [];
  const idSet = new Set(ids); // 使用 Set 来提高查找效率

  const traverse = (node: any) => {
    if (idSet.has(node.value)) {
      nodes.push({
        label: node.label || "",
        value: node.value,
      }); // 如果 label 不存在，则添加空字符串
      idSet.delete(node.value);
    }
    if (node.children) {
      node.children.forEach(traverse);
    }
  };

  tree.forEach(traverse);

  return nodes;
}

/**
 * 移除 request 对象的 undefined key
 * @param request
 * @returns
 */
export const deleteEmptyKey = (request: { [key: string]: any }) => {
  const newRequest = {
    ...request,
  };
  Object.keys(newRequest).forEach(
    (key) =>
      newRequest.hasOwnProperty(key) &&
      (newRequest[key] === undefined || newRequest[key] === "") &&
      delete newRequest[key]
  );
  return newRequest;
};

/**
 * 判断一个对象是否是空对象
 */
export function isEmptyObject<T extends Record<string, any>>(obj: T): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * 校验数据的 enableFlag 存在且为 false 或者 null
 * @param item
 */
export const JudgeEnableFlag = (item: { [key in string]: any }): boolean => {
  return item.enableFlag === false || item.enableFlag === null;
};

/**
 * 处理小数精度问题
 * @param value
 * @param fixedNum
 */
export const handleDecimalPrecision = (
  value: number | string,
  fixedNum?: number
): string => {
  return parseFloat(String(value)).toFixed(fixedNum || 2);
};

/**
 * @handleJudgeCustomerIdSmallThanTwoH 判断客户id是否小于20000
 */
export const handleJudgeCustomerIdSmallThanTwoH = (id: string) => {
  if (id.length <= 5) {
    return Number(id) < 20000;
  }
  return false;
};

/**
 * @transformTreeByDeleteKey 删除树的某个key
 */
export const transformTreeByDeleteKey = (
  tree: any[],
  key: string,
  judgeDeleteFn: (node: any) => boolean
) => {
  // 创建一个新数组来存储修改后的节点
  const newTree = tree.map((node) => {
    // 克隆当前节点
    const newNode = { ...node };

    if (judgeDeleteFn(newNode)) {
      delete newNode[key];
    } else {
      newNode.children = transformTreeByDeleteKey(
        newNode.children,
        key,
        judgeDeleteFn
      );
    }
    // 如果不是，但节点有子节点，则递归处理子节点
    // 返回修改后的节点
    return newNode;
  });

  // 返回新的数组树
  return newTree;
};

export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U | null, T | undefined]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        Object.assign(err as any, errorExt);
      }

      return [err, undefined];
    });
}

export const showErrorInfo = (info: {
  err: Error | null;
  res: IApiData | undefined;
  msg?: string;
}) => {
  const { err, res, msg = "网络异常【10000】" } = info;
  // @ts-ignore
  return message.warning(err?.message || err?.msg || res?.msg || msg);
};

/**
 * 通用文件下载方法
 * @param url 文件地址
 * @param filename 保存的文件名
 * @param useBlob 是否使用 Blob 下载（默认 false）
 */
export const downloadFile = (
  url: string,
  filename: string,
  useBlob: boolean = false
) => {
  if (useBlob) {
    // 使用 Blob 下载
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      if (xhr.status === 200) {
        const blob = xhr.response;

        if ((window.navigator as any).msSaveOrOpenBlob) {
          // 兼容 IE
          (navigator as any).msSaveBlob(blob, filename);
        } else {
          const link = document.createElement("a");
          const body = document.body;

          const url = window.URL.createObjectURL(blob);
          link.href = url;
          link.download = filename;

          link.style.display = "none";
          body.appendChild(link);
          link.click();
          body.removeChild(link);

          window.URL.revokeObjectURL(url);
        }
      }
    };
    xhr.send();
  } else {
    // 直接链接下载
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const usePartialBoolean = (
  value: boolean | undefined,
  defaultValue: boolean
) => {
  if (value !== undefined) {
    return value;
  }
  return defaultValue;
};

let a = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
export const nanoid = (e = 21) => {
  let t = "",
    r = crypto.getRandomValues(new Uint8Array(e));
  for (let n = 0; n < e; n++) t += a[63 & r[n]];
  return t;
};

export const classNames = (params: { [key: string]: boolean | undefined }) => {
  return Object.keys(params)
    .filter((key) => params[key])
    .join(" ");
};

export const getRate100 = (val: number) => {
  if (typeof val !== "number") {
    return val;
  }
  return new BigNumber(val).multipy(100).getNumber();
};
