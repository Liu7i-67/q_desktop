# TXSearchForm

## 1. 使用场景

- 用于展示列表的搜索项

## 2. 提供的功能

- 内置布局优化、表单项宽度展示设置
- 支持用户配置搜索项是否展示
- 支持用户配置搜索项展示顺序

##　3. 注意事项

1. 如果需要搜索表单可配置，必须提供唯一的`formKey`
2. 对于列表项的处理参照`./Example.tsx`
   - 非表单元素需要使用`TXSearchItemWrapper`包裹并设置`disabledSetting`为`true`
   - 对于`label`为空的表单元素，需要使用`TXSearchItemWrapper`包裹并设置于表单相同的`name`,提供一个在配置时展示的`label`
