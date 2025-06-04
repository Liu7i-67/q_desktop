import { makeAutoObservable } from "@quarkunlimit/qu-mobx";
import { IComputed } from "./interface";
import { RootStore } from ".";
import { ITXColumnType } from "../../interface";
import TXExplainQuestionTooltip from "@/components/TXExplainQuestionTooltip";
import { TXListRow } from "@/components/TXTableRender/TXListRow";
import { TXTagStrs } from "@/components/TXTableRender/TXTagStrs";
import { AddressHelper } from "@/utils/address-helper";
import { TXTime } from "@/components/TXTableRender/TXTime";
import { Badge, TableProps, Tag } from "antd";
import { TXTextCell } from "@/components/TXTableRender/TXTextCell";
import { cn } from "@/utils/tools";
import { TXPercentCell } from "@/components/TXTableRender/TXPercentCell";
import { TXIconTag } from "@/components/TXTableRender/TXIconTag";
import { TXListByRow } from "@/components/TXTableRender/TXListRow/Row";

export class Computed implements IComputed {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get loading() {
    const { loadingStore } = this.rootStore;
    return loadingStore.get("getLocalSetting");
  }

  calcCell(cell: ITXColumnType) {
    let render = cell.render;

    let renderClassName = "";
    if (typeof cell.width === "number") {
      renderClassName = `w-[${cell.width}px]`;
    }

    switch (cell.dataType) {
      case "list":
        {
          const extra = cell.dataExtraProps?.["list"] || {};
          render = (text: string) => (
            <TXListRow
              className={cn(renderClassName, extra.className || "")}
              list={text}
              separator={extra.separator}
            />
          );
        }
        break;
      case "textarea":
        {
          const extra = cell.dataExtraProps?.["textarea"] || {};
          render = (text: string) => {
            return (
              <TXListByRow
                className={cn(renderClassName, extra.className || "")}
                list={text}
                {...extra}
              />
            );
          };
        }
        break;
      case "areaCode":
        {
          const extra = cell.dataExtraProps?.["list"] || {};
          render = (text: string) => (
            <TXListRow
              className={cn(renderClassName, extra.className || "")}
              list={AddressHelper.getInstance().getAreaNamePath(text).join("/")}
              separator={extra.separator}
            />
          );
        }
        break;
      case "tagStr":
        {
          const extra = cell.dataExtraProps?.["tagStr"] || {};
          render = (text: string) => (
            <TXTagStrs className={renderClassName} str={text} {...extra} />
          );
        }
        break;
      case "date":
      case "time":
      case "datetime":
        {
          let format = "YYYY-MM-DD";
          if (cell.dataType === "time") {
            format = "HH:mm:ss";
          } else if (cell.dataType === "datetime") {
            format = "YYYY-MM-DD HH:mm:ss";
          }
          render = (text: string) => (
            <TXTime time={text} format={format} className={renderClassName} />
          );
        }
        break;
      case "iconTag":
        {
          const options = cell.dataExtraProps?.["iconTag"]?.options || {};
          render = (text: string) => {
            const info = options[text as keyof typeof options];
            if (!info) return "-";

            return <TXIconTag {...info}></TXIconTag>;
          };
        }
        break;
      case "tag":
        {
          const options = cell.dataExtraProps?.["tag"]?.options || {};
          const props = cell.dataExtraProps?.["tag"]?.props || {};
          render = (text: string) => {
            const info = options[text as keyof typeof options];
            if (!info) return "-";

            return (
              <Tag {...props} color={info.color}>
                {info.text}
              </Tag>
            );
          };
        }
        break;
      case "badge":
        {
          const options = cell.dataExtraProps?.["badge"]?.options || {};
          render = (text: string) => {
            const info = options[text as keyof typeof options];
            if (!info) return "-";

            return <Badge color={info.color} text={info.text}></Badge>;
          };
        }
        break;
      case "text":
        {
          const extra = cell.dataExtraProps?.["text"] || {};
          render = (text: string) => (
            <TXTextCell
              className={cn(renderClassName, extra.className || "")}
              text={text}
              row={extra.row}
            />
          );
        }
        break;
      case "percent":
        {
          render = (text: string) => {
            return <TXPercentCell percent={text} className={renderClassName} />;
          };
        }
        break;
      default: {
        if (!cell.render) {
          const extra = cell.dataExtraProps?.["text"] || {};
          render = (text: string) => (
            <TXTextCell
              className={cn(renderClassName, extra.className || "")}
              text={text}
              row={extra.row}
            />
          );
        }
      }
    }

    if (cell.toolTipTitle) {
      return {
        ...cell,
        title: (
          <TXExplainQuestionTooltip
            title={cell.title as string}
            toolTipTitle={cell.toolTipTitle}
          />
        ),
        render,
      };
    }
    return { ...cell, render };
  }

  get columns() {
    const res: ITXColumnType[] = [];
    const { propsStore, logic } = this.rootStore;
    if (!Object.keys(logic.localSetting.columns).length) {
      for (let cell of propsStore.props.columns) {
        if (cell.auth === false) {
          continue;
        }
        res.push(this.calcCell(cell as ITXColumnType));
      }

      return res;
    }

    const left: ITXColumnType[] = [];
    const right: ITXColumnType[] = [];

    for (let cell_ of propsStore.props.columns) {
      const cell = { ...cell_ } as ITXColumnType;

      if (cell.auth === false) {
        continue;
      }

      if (typeof cell.key !== "string") {
        res.push(this.calcCell(cell as ITXColumnType));
        continue;
      }
      const history = logic.localSetting.columns[cell.key];
      const newCell = { ...cell, index: -1 } as ITXColumnType;
      if (history) {
        newCell.fixed = history.fixed;
        newCell.hidden = history.hidden;
        newCell.index = history.index || -1;
      }

      if (newCell.fixed === "left") {
        left.push(this.calcCell(newCell));
        continue;
      }

      if (newCell.fixed === "right") {
        right.push(this.calcCell(newCell));
        continue;
      }

      res.push(this.calcCell(newCell));
    }

    left.sort((a, b) => (a.index || 0) - (b.index || 0));
    res.sort((a, b) => (a.index || 0) - (b.index || 0));
    right.sort((a, b) => (a.index || 0) - (b.index || 0));

    return [...left, ...res, ...right];
  }

  get scroll() {
    const { logic, propsStore } = this.rootStore;
    if (!propsStore.props.scroll?.y) {
      return propsStore.props.scroll;
    }

    if (logic.localSetting.fixedY === false) {
      return {
        x: propsStore.props.scroll["x"],
      };
    }

    return propsStore.props.scroll;
  }
}
