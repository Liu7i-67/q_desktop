import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Skeleton } from "antd";
import React from "react";

export const FormContent = observer(function FormContent_(props: {
  children?: React.ReactNode | React.ReactNode[];
}) {
  const root = useStore();
  const { logic } = root;

  if (!logic.haveInit) {
    return <Skeleton />;
  }

  if (
    !Array.isArray(props.children) ||
    !Object.keys(logic.localSetting.columns).length
  ) {
    return props.children;
  }

  const out: { index: number; dom: React.ReactNode }[] = [];

  for (let c of props.children) {
    if (
      !React.isValidElement(c) ||
      c.props?.disabledSetting ||
      !c?.props?.name
    ) {
      out.push({
        index: -1,
        dom: c,
      });
      continue;
    }

    const record = logic.localSetting.columns[c?.props?.name];
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
});
