# TXTreeCascader 使用注意事项

## 1. 使用场景

- 用于树形结构的级联选择

## 2. 提供的功能

- 内置请求数据源（树）
- 内置处理树结构（包括多维度子树的情况），转成 `TTXTreeCascaderNode` 类型
- 内置回显功能
- 内置模糊查询树功能
- 内置`TXTreeMapHelper`，维护树节点关系

## 3. 使用教程

1. 首先定义 `type`，并拓展 TTXTreeCascaderType

```ts
<TXTreeCascader
  type='xxxType'
/>

export type TTXTreeCascaderType = 'xxxType' | 其余type
```

2. 在 `config` 文件夹下新建文件，定义 `xxxConfig.ts`，类型为 `IConfig`

```ts
// xxxConfig.ts
import { IConfig } from "../interface";

export const xxxConfig: IConfig = {
  title: "选择人员",
  fetchApi: "/api/base/v1/sys-user/dept-tree-and-user",
  request: {},
  placeholder: "请输入人员/部门名称",
  selectedTitle: "已选人员",
  nodeConfig: [
    {
      childrenKey: "childList",
      searchFilterKey: "deptName",
      key: "id",
      parentKey: "parentId",
    },
    {
      childrenKey: "userDTOList",
      searchFilterKey: "userName",
      key: "id",
      parentKey: "parentId",
    },
  ],
};
```

再在 `config/index.ts` 文件中，暴露配置项

```ts
/** @param 配置信息 */
export const configMap = new Map<TTXTreeCascaderType, IConfig>([
  ["xxxType", xxxConfig],
]);
```

**注意**：`nodeConfig` 是每个树节点的配置信息，会在内置转换树结构的逻辑中使用。如果存在多维度子树，则继续在 nodeConfig 中配置即可

3. 转换后的树节点类型是 `TTXTreeCascaderNode`，如果需要拓展新字段，可以传入 `onCustomExtraNodeKey` 函数。其中，透传的node是源树节点，不是转换后的节点

```ts
<TXTreeCascader
  type='xxxType'
  onCustomExtraNodeKey={logic.onCustomExtraNodeKey}
/>

function onCustomExtraNodeKey(node: TRecord) {
  //node是源数据的，不是转换后的
  const newKey = Symbol('newKey')
  return {
    [newKey]: node.id === '2'
  }
}
```

**注意：自定义key时，使用Symbol以防覆盖原key**

## 4.TXTreeMapHelper

TXTreeMapHelper 是个单例对象，用于维护转换前后节点间的映射关系

转换后的树节点key是拼接了祖先节点key

```ts
const tree = [
  {
    key: "1111",
    children: [
      {
        key: "1111_2222",
        children: [
          {
            key: "1111_2222_3333",
          },
        ],
      },
    ],
  },
  {
    key: "4444",
    children: [
      {
        key: "4444_2222",
        children: [
          {
            key: "4444_2222_5555",
          },
        ],
      },
    ],
  },
];
```

在 TXTreeMapHelper 这个 Map 中，map-key 是取转化后树节点下划线分割后最后一位的值。比如 `1111_2222_3333` 下划线分割后最后一位是 `3333`， 这个值就是树节点本身的key（转化前的key）

```ts
{
  'xxxType': {
    ['1111']: [node],
    ['2222']: [node1, node2], //2222的树节点存在了两次
    ['3333']: [node],
    ['4444']: [node],
    ['5555']: [node]
    ...
  },
  //...
}
```
