import Info from "@/components/deal-confirm-modal/deal-info/info";
import DealItemTable from "@/components/deal-confirm-modal/deal-item-table/deal-item-table";
import Sidebar from "@/components/deal-confirm-modal/sider-bar/side-bar";
import { Provider, useSelector } from "@/components/deal-confirm-modal/store";
import {
  CanceledIcon,
  ConfirmedIcon,
} from "@/components/deal-confirm-modal/svg";
import { EDealStatus, EModalType } from "@/components/deal-confirm-modal/types";
import { cn } from "@/utils/tools";
import { Button, Spin } from "antd";
import { Modal } from "@/components/TXModal";
import { useEffect } from "react";

interface IProps {
  /**
   * @dealId 成交id
   */
  dealId: string;
  /**
   * @visible 显隐控制
   */
  visible: boolean;
  /**
   * @onClose 关闭弹窗
   */
  onClose: () => void;
  /**
   * @type 弹窗类型
   */
  type: EModalType;
  /**
   * @onAfterSaveSuccess 确认按钮调接口成功后的回调
   */
  onAfterSaveSuccess?: Function;
}

const DealConfirmModal = (props: IProps) => {
  const { dealId, visible, onClose, type, onAfterSaveSuccess } = props;

  const {
    onCloseModal,
    setDealId,
    getCustDealInfo,
    setCurrentType,
    handleDealConfrimModalSave,
  } = useSelector((x) => x.logic);

  const state = useSelector((x) => x.state);

  const { dealInfo, currentType } = state;

  const { runGetCustDealInfo } = useSelector((x) => x.api);

  useEffect(() => {
    if (dealId && dealId !== "") {
      setDealId(dealId);
      getCustDealInfo(dealId);
    }
    setCurrentType(type);
  }, [dealId, type]);

  return (
    <>
      <Modal
        // destroyOnClose={true}
        open={visible}
        width={800}
        title={"成交详情"}
        className={cn(
          "relative",
          type !== EModalType.Info ? "translate-x-[-160px]" : ""
        )}
        onCancel={() => {
          onClose && onClose();
        }}
        footer={() => {
          return (
            <div>
              <Button
                className={"mr-2"}
                onClick={() => {
                  onClose?.();
                  onCloseModal();
                }}
              >
                关闭
              </Button>
              {currentType !== EModalType.Info && (
                <Button
                  type={"primary"}
                  disabled={[
                    EDealStatus.CONFIRMED,
                    EDealStatus.CANCELED,
                  ].includes(dealInfo.dealStatus)}
                  loading={runGetCustDealInfo.loading}
                  onClick={() => {
                    handleDealConfrimModalSave(onAfterSaveSuccess);
                  }}
                >
                  保存
                </Button>
              )}
            </div>
          );
        }}
      >
        {dealInfo.dealStatus === EDealStatus.CONFIRMED &&
          type === EModalType.Confirm && (
            <div className={" absolute bottom-6 right-0 z-20"}>
              <ConfirmedIcon />
            </div>
          )}
        {dealInfo.dealStatus === EDealStatus.CANCELED &&
          type === EModalType.Cancel && (
            <div className={" absolute bottom-6 right-0 z-20"}>
              <CanceledIcon />
            </div>
          )}
        <Spin spinning={runGetCustDealInfo.loading}>
          <div className={cn("p-4 z-10", "h-[60vh] overflow-y-auto")}>
            <Info />
            <DealItemTable />
          </div>
        </Spin>
      </Modal>
      {(type === EModalType.Confirm && <Sidebar />) ||
        (type === EModalType.Cancel && <Sidebar />)}
    </>
  );
};

export default (props: IProps) => {
  return (
    <Provider>
      <DealConfirmModal {...props} />
    </Provider>
  );
};
