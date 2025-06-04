import { RuleObject } from "antd/es/form";
import { StoreValue } from "antd/es/form/interface";

export const phoneValidator = (_: RuleObject, value: StoreValue) => {
  if (!value) {
    return Promise.resolve();
  }

  // 确保输入是纯数字
  if (!/^\d+$/.test(value)) {
    return Promise.reject(new Error("电话号码必须为纯数字"));
  }

  // 检查是否以1开头（国内电话）
  if (/^1/.test(value)) {
    if (value.length !== 11) {
      return Promise.reject(new Error("国内电话请保证长度为11位"));
    }

    // 因为加拿大or美国也会有1开头的11位所以注释严格校验
    // 校验中国大陆手机号规则
    // if (!/^1[3-9]\d{9}$/.test(value)) {
    //   return Promise.reject(new Error("请输入正确的国内手机号"));
    // }

    return Promise.resolve();
  }

  // 国际电话校验
  if (value.length < 5 || value.length > 15) {
    return Promise.reject(new Error("国际电话请保证长度在5-15位"));
  }

  return Promise.resolve();
};
