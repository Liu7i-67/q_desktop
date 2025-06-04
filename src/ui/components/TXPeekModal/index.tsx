import { Modal } from "@/components/TXModal";
import CollaborationModal from "@/pages/CollaborationModal";
import { IRepeatCustomerListDTO } from "@/service/business/v1/customer/peek";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Button, Space } from "antd";
import { forwardRef, useImperativeHandle } from "react";
import TXTable from "../TXTable";
import { ITXColumnType } from "../TXTable/interface";
import { TXListRow } from "../TXTableRender/TXListRow";
import { ITXPeekModalProps, ITXPeekModalRef } from "./interface";
import HistoryMessage from "./modules/HistoryMessage";
import { Provider, useStore } from "./store/RootStore";

const TXPeekModal = observer(
  forwardRef<ITXPeekModalRef, ITXPeekModalProps>(
    function TXPeekModal_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic, refs, computed, propsStore } = root;

      useImperativeHandle(ref, () => {
        return {
          openModal: logic.openModal,
          closeModal: logic.closeModal,
        };
      });

      const columns = [
        {
          title: "创建时间",
          dataIndex: "createTime",
          key: "createTime",
          render: (createTime: string) => {
            return (
              <TXListRow
                className={"min-w-[50px] max-w-[200px]"}
                list={createTime ? [createTime] : []}
              />
            );
          },
        },
        {
          title: "来源渠道",
          dataIndex: "channelName",
          key: "channelName",
          width: 100,
        },
        {
          title: "电话",
          dataIndex: "phoneNumber",
          key: "phoneNumber",
          render: (phone: string[]) => (
            <TXListRow className={"min-w-[50px] max-w-[200px]"} list={phone} />
          ),
        },
        {
          title: "微信",
          dataIndex: "wechatNumber",
          key: "wechatNumber",
          render: (wechatNumber: string[]) => (
            <TXListRow
              className={"min-w-[50px] max-w-[200px]"}
              list={wechatNumber}
            />
          ),
        },
        {
          title: "创建人",
          dataIndex: "createUserName",
          key: "createUserName",
          render: (text: string) => (
            <TXListRow
              list={text ? [text] : []}
              className="min-w-[50px] max-w-[150px]"
            />
          ),
        },
        {
          title: "所属人",
          dataIndex: "ownerName",
          key: "ownerName",
          render: (text: string) => (
            <TXListRow
              list={text ? [text] : []}
              className="min-w-[50px] max-w-[150px]"
            />
          ),
        },
        ...(propsStore.props.peekType === "customer"
          ? [
              {
                title: "操作",
                dataIndex: "action",
                key: "action",
                fixed: "right",
                render: (text, record) => {
                  return (
                    <Space>
                      <Button
                        type="link"
                        disabled={!record.ownerName}
                        onClick={() => {
                          refs.collaborationModalRef.current?.openModal({
                            existCustomerId: record.id,
                            justAdd: true,
                          });
                          logic.closeModal();
                        }}
                      >
                        添加协作
                      </Button>
                    </Space>
                  );
                },
              } as ITXColumnType<IRepeatCustomerListDTO>,
            ]
          : []),
      ];

      return (
        <>
          <Modal
            title={<span className="text-[20px]">查重结果</span>}
            open={logic.open}
            destroyOnClose
            onCancel={logic.closeModal}
            footer={null}
            width={!logic.repeatData?.repeatCustomerList?.length ? 450 : 900}
            centered={!logic.repeatData?.repeatCustomerList?.length}
          >
            <HistoryMessage />
            {logic.repeatData?.repeatCustomerList?.length ? (
              <TXTable<IRepeatCustomerListDTO>
                tableKey="REPEAT_TABLE"
                loading={computed.loading}
                columns={columns}
                rowKey="id"
                scroll={{
                  x: "max-content",
                  y: "",
                }}
                dataSource={logic.repeatData?.repeatCustomerList ?? []}
              />
            ) : (
              "没有重复数据哦~"
            )}
          </Modal>
          {/* 协作弹窗 */}
          <CollaborationModal
            ref={refs.collaborationModalRef}
            onSuccess={props?.afterClose}
          />
        </>
      );
    }
  )
);

export default observer(
  forwardRef<ITXPeekModalRef, ITXPeekModalProps>(
    function TXPeekModalPage(props, ref) {
      return (
        <Provider>
          <TXPeekModal peekType="customer" {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
