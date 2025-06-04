import { IResBaseV1ChannelTree } from "@/service/base/v1/channel/tree";
import { ITreeItem } from "@/utils/interface";

export interface IExtraInfo {
  /** @param 是否仅展示分类 */
  onlyDir?: boolean;
}

export const getChannelTreeItem = (
  t: IResBaseV1ChannelTree,
  extra: IExtraInfo
) => {
  const children: ITreeItem[] = [];
  const { onlyDir } = extra;

  if (!onlyDir) {
    for (let cc of t.channelChildList || []) {
      children.push({
        title: cc.channelName,
        value: cc.id,
      });
    }
  }

  for (let c of t.childList || []) {
    const item = getChannelTreeItem(c, extra)
    if (!item) {
      continue
    }
    children.push(item);
  }

  const out: ITreeItem = {
    title: t.typeName,
    value: onlyDir ? t.id : `type_${t.id}`,
  };

  if (onlyDir || children?.length) {
    out.children = children;
  }

  if (!out.children) {
    return null
  }

  return out;
};

export const getChannelTreeData = (
  list: IResBaseV1ChannelTree[],
  extra: IExtraInfo
) => {
  const output: ITreeItem[] = [];

  for (let t of list) {
    const item = getChannelTreeItem(t, extra)
    if (!item) {
      continue
    }
    output.push(item);
  }
  return output;
};
