# TXTableAction

1. 使用场景
   表格中的操作列
2. 注意事项
   a. 默认平铺3个按钮，超过3个则展示前两个和更多按钮
   b. 接受每个按钮单独处理onClick事件，但不推荐
   c. 推荐给每个操作定义type，通过onAction统一处理点击事件

## 推荐的写法

推荐给每个操作定义type，通过onAction统一处理点击事件

```ts
const s = {
      title: "操作",
      key: "action",
      width: 160,
      fixed: "right",
      render: (text: string, record) => {
        return (
          <Observer>
            {() => {
              return (
                <TXTableAction
                  className="w-[160px]"
                  onAction={(action) => logic.recordAction(record, action)}
                  actions={[
                    {
                      type: "MESSAGE",
                      label: "留言",
                      auth: true,
                    },
                    {
                      type: "EDIT",
                      label: "修改状态",
                      auth: true,
                    },
                    {
                      type: "FEEDBACK",
                      label: "机构反馈",
                      auth: true,
                    },
                    {
                      type: "DEAL",
                      label: "成交",
                      disabled: computed.isInvalid,
                      auth: true,
                      disabledTips: "无效客户不支持成交",
                    },
                    {
                      type: "DELETE",
                      label: "删除",
                      auth: MyCustomerAuth.customerDispatchDelete,
                    },
                  ]}
                />
              );
            }}
          </Observer>
        );
      },
    },
```

## 不推荐的写法

不推荐给每个按钮添加onClick操作

```ts
const x = {
  title: "操作",
  key: "action",
  fixed: "right",
  width: 180,
  render: (_: string, record: IResBusinessV1CustomerGetPage) => {
    return (
      <Observer>
        {() => {
          const isInvalid = record.customerType === "INVALID_CUSTOMER";

          return (
            <TXTableAction
              className="w-[180px]"
              maxCount={4}
              actions={[
                {
                  label: "派单",
                  disabled: isInvalid,
                  auth: MyCustomerAuth.customerDispatch,
                  disabledTips: "无效客户不允许派单",
                  onClick: () => {
                    refs.editDispatchRecordRef.current?.openModal({
                      customerId: record.id,
                      phoneNumber: record.phoneNumber,
                    });
                  },
                },
                {
                  label: "详情",
                  onClick: () => {
                    refs.customerDrawerRef.current?.openDrawer({
                      customerId: record.id,
                    });
                  },
                  auth: true,
                },
                {
                  label: "编辑",
                  onClick: () => {
                    refs.editRef.current?.openModal({ id: record.id });
                  },
                  auth: MyCustomerAuth.customerUpdate,
                },
                {
                  label: "协作",
                  onClick: () => {
                    refs.collRef.current?.openModal({
                      existCustomerId: record.id,
                    });
                  },
                  auth: MyCustomerAuth.customerCollab,
                },
                {
                  label: "合并",
                  onClick: () => {
                    refs.mergeCustomerModalRef.current?.openModal({
                      id: record.id,
                    });
                  },
                  auth: MyCustomerAuth.customerMerge,
                },
              ]}
            />
          );
        }}
      </Observer>
    );
  },
};

```
