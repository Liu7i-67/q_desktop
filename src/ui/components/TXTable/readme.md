# TXTable 使用注意事项

## 1. 使用场景

- 用于展示列表数据

## 2. 提供的功能

- 支持用户配置表格大小
- 支持用户配置展示的字段
- 支持用户配置展示的字段顺序
- 内置`TXExplainQuestionTooltip`,使用`toolTipTitle`属性传入提示文字即可

```ts
{
    title: "上报业绩-按成交创建时间",
    toolTipTitle:
        "统计指定员工在指定时间范围内创建或参与协作，成交状态不是已作废的成交，按照合作比率分配的成交金额",
    dataIndex: "amountOfDealByDealCreateTime",
    key: "amountOfDealByDealCreateTime",
    width: 200,
    render: (text) => `¥${text?.toLocaleString()}`,
}
```

## 3. 注意事项

1. 表格必须传入`tableKey`属性，且参数值必须唯一，该参数用于存储表格的配置信息
2. `columns`必须要设置`key`属性，且必须为字符串，否则无法对字段进行配置
3. 如果`columns`的`title`传入了`ReactNode`类型，则需要设置`filterTitle`属性用于对字段进行过滤

## 4. 支持dataType便捷处理返回值展示

> 参考`pages/HospitalMyCustomer/modules/TableList.tsx`

**注意事项**

1. 使用`dataType`时`width`只能是数值类型，如`width:200`
2. 如果`dataType`对应的组件需要传递一些参数，通过`dataExtraProps`属性传入，数据类型见`IDataExtraProps`
3. 设置`dataType`后`render`属性将失效

已支持的数据类型如下：

- `text`：字符串，使用`TXTextCell`进行展示，默认超过一行折叠，`hover`展示全部，使用时可以通过`dataExtraProps["text"]["row"]`配置展示的行数，目前支持1、2、3行，当列表项没有`render`且没有`dataType`时视为`text`类型
- `list`：字符串或者字符串数组，使用`TXListRow`进行展示
- `areaCode`: 所属城市展示，从`AddressHelper`中获取地区代码的内容进行展示，使用`TXListRow`进行展示
- `tagStr`: 展示为多个`tag`，数据为字符串数组拼接成的字符串，使用`TXTagStrs`进行展示，默认切割符号为`,`，其他分割符号请通过`dataExtraProps["tagStr"]`自行配置
- `date`、`time`、`datetime`: 展示时间，使用`TXTime`进行展示，`date`对应`YYYY-MM-DD`，`time`对应`HH:mm:ss`，`datetime`对应`YYYY-MM-DD HH:mm:ss`
- `tag`: 展示状态值对应的文字和颜色相关的`tag`，使用时必须通过`dataExtraProps["tag"]["options"]`配置状态值和颜色、中文的对应关系
- `percent`: 展示百分比，使用`TXPercentCell`进行展示
