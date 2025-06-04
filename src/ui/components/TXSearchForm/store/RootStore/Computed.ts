import { makeAutoObservable, toJS } from "@quarkunlimit/qu-mobx";
import { IComputed } from "./interface";
import { RootStore } from "./";
import { ReactNode } from "react";
import React from "react";

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get children() {
    const { propsStore, logic } = this.rootStore;

    if (
      !Array.isArray(propsStore.props.children) ||
      !Object.keys(logic.localSetting.columns).length
    ) {
      return propsStore.props.children;
    }

    const out: { index: number; dom: ReactNode }[] = [];

    for (let c of propsStore.props.children) {
      const name = c.props?.name as string;
      const disabledSetting = c.props?.disabledSetting as boolean;
      if (!React.isValidElement(c) || disabledSetting || !name) {
        out.push({
          index: -1,
          dom: c,
        });
        continue;
      }

      const record = logic.localSetting.columns[name];
      if (record?.hidden) {
        continue;
      }
      out.push({
        index: record?.index ?? -1,
        dom: c,
      });
    }

    out.sort((a, b) => (a.index || 0) - (b.index || 0));

    return out.map((c) => c.dom);
  }
}
