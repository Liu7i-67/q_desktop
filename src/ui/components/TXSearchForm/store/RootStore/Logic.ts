import {
  makeAutoObservable,
  runInAction,
  toJS,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from "./";
import { getData, ILocalFormData } from "@/utils/DataBase";
import { TFormKey } from "../../formKey";
import { IBaseFormItem } from "../../TXFormItemSettingModal/interface";
import React from "react";
export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  expand = false;
  renderExpand = false;
  haveInit: boolean = false;
  localSetting: ILocalFormData = {
    columns: {},
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.getLocalSetting = withRequest(this.getLocalSetting, "getLocalSetting");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changeHeight(num: number) {
    this.renderExpand = num > 48;
    if (!this.renderExpand) {
      this.expand = false;
    }
  }
  changeExpand() {
    this.expand = !this.expand;
  }

  onReset() {
    const { refs, propsStore } = this.rootStore;
    const form = propsStore.props.form || refs.form;
    form?.resetFields?.();
    propsStore.props.onReset?.();
    this.expand = false;
  }

  onSearch() {
    const { refs, propsStore } = this.rootStore;
    const form = propsStore.props.form || refs.form;
    const values = form?.getFieldsValue?.();
    propsStore.props.onSearch?.(values);
    this.expand = false;
  }

  afterChange(setting: ILocalFormData) {
    this.localSetting = setting;
  }

  openSetting() {
    const { refs, propsStore } = this.rootStore;
    if (
      !propsStore.props.formKey ||
      !Array.isArray(propsStore.props.children)
    ) {
      return;
    }

    const columns: IBaseFormItem[] = [];

    for (let c of toJS(propsStore.props.children)) {
      // 检查 c 是否为 React 元素
      if (React.isValidElement(c)) {
        // @ts-ignore
        if (!c.props?.name || !c.props?.label || c.props?.disabledSetting) {
          continue;
        }

        columns.push({
          // @ts-ignore
          name: c.props?.name,
          // @ts-ignore
          label: c.props?.label,
        });
      }
    }

    refs.settingRef.current?.openModal({
      formKey: propsStore.props.formKey,
      columns,
      columnSpan: propsStore.props.columnSpan,
    });
  }

  async getLocalSetting(formKey?: TFormKey) {
    this.haveInit = false;
    if (!formKey) {
      this.haveInit = true;
      return;
    }
    const data = (await getData("SEARCH")) || {};
    const oldData: ILocalFormData | undefined = data[formKey];
    if (!oldData) {
      runInAction(() => {
        this.haveInit = true;
      });
      return;
    }
    runInAction(() => {
      this.localSetting = oldData;
      this.haveInit = true;
    });
  }
}
