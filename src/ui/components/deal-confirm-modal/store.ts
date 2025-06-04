import { createStore } from "@quarkunlimit/tiny";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import {
  cancel_deal,
  confirm_deal,
  getCustDealInfo,
  review,
} from "@/components/deal-confirm-modal/services";
import {
  EModalType,
  IDealInfo,
  IDealItem,
} from "@/components/deal-confirm-modal/types";
import { useColumns } from "@/components/deal-confirm-modal/deal-item-table/columns";
import { Form, message } from "antd";
import { useRef } from "react";

function DealConfirmModalStore() {
  /**
   * @onAfterSaveSuccessRef 弹窗确认按钮接口成功后的回调
   */
  const onAfterSaveSuccessRef = useRef<any>();

  /**
   * @runGetCustDealInfo 获取成交信息
   */
  const runGetCustDealInfo = useImmerApi(getCustDealInfo, {
    onSuccess(res) {
      const { data } = res.data;
      setState((d) => {
        d.dealInfo = data ?? {};
        d.dealItemList = data?.dealItemDTOList ?? [];
      });
    },
  });
  /**
   * @runConfirmDeal 确认成交
   */
  const runConfirmDeal = useImmerApi(confirm_deal, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        confirmForm.resetFields();
        logic.onCloseModal();
        onAfterSaveSuccessRef.current?.();
        message.success("确认成功");
      } else {
        message.error(data.msg);
      }
    },
  });
  /**
   * @runCancelDeal 成交取消
   */
  const runCancelDeal = useImmerApi(cancel_deal, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        cancelForm.resetFields();
        logic.onCloseModal();
        onAfterSaveSuccessRef.current?.();
        message.success("作废成功");
      } else {
        message.error(data.msg);
      }
    },
  });
  /**
   * @runReview 成交审查
   */
  const runReview = useImmerApi(review, {
    onSuccess(value) {
      const { data } = value;
      if (data.code === 200) {
        onAfterSaveSuccessRef.current?.();
        message.success("审查成功");
      } else {
        message.error(data.msg);
      }
    },
  });

  const [state, setState] = useImmer({
    /**
     * @currentDealId 当前的成交id
     */
    currentDealId: "" as string,
    /**
     * @dealItemList 成交项目数据
     */
    dealItemList: [] as IDealItem[],
    /**
     * @dealInfo 成交列表
     */
    dealInfo: {} as IDealInfo,
    /**
     * @currentType 当前弹窗的类型
     */
    currentType: EModalType.Info,
  });

  const logic = useMethods({
    /**
     * @setCurrentType 设置当前弹窗的类型
     * @param type
     */
    setCurrentType(type: EModalType) {
      setState((d) => {
        d.currentType = type;
      });
    },
    /**
     * @setDealId 设置当前成交id
     * @param dealId
     */
    setDealId(dealId: string) {
      setState((d) => {
        d.currentDealId = dealId;
      });
    },
    /**
     * @onCloseModal 关闭弹窗事件
     */
    onCloseModal() {
      setState((d) => {
        d.currentDealId = "";
      });
      confirmForm.resetFields();
      cancelForm.resetFields();
    },
    /**
     * @getCustDealInfo 获取成交信息
     */
    getCustDealInfo(dealId?: string) {
      const id = dealId ?? state.currentDealId;
      if (!id || id === "" || JSON.stringify(id) == "{}") {
        return;
      }
      runGetCustDealInfo.run({ dealId: id });
    },
    /**
     * @onChangeModalType 切换弹窗类型
     * @param type
     */
    onChangeModalType(type: EModalType) {
      setState((d) => {
        d.currentType = type;
      });
    },
    /**
     * @handleDealConfrimModalSave 成交详情弹窗保存按钮回调
     * @dealId 成交id
     */
    handleDealConfrimModalSave(onAfterSaveSuccess?: Function) {
      if (onAfterSaveSuccess) {
        onAfterSaveSuccessRef.current = onAfterSaveSuccess;
      }
      switch (state.currentType) {
        case EModalType.Review:
          logic.handleSaveReview();
          break;
        case EModalType.Confirm:
          logic.handleSaveConfrim();
          break;
        case EModalType.Cancel:
          logic.handleSaveCancel();
          break;
        default:
          break;
      }
    },
    /**
     * @handleSaveConfrim 确认成交
     */
    handleSaveConfrim() {
      const values = confirmForm.getFieldsValue();
      const { confirmAmount } = values;
      if (typeof confirmAmount !== "number") {
        message.error("请填写确认金额");
        return;
      }
      const request = {
        ...values,
        id: state.currentDealId,
      };
      runConfirmDeal.run(request);
    },
    /**
     * @handleSaveConfrim 成交取消
     */
    handleSaveCancel() {
      const values = cancelForm.getFieldsValue();
      const { operateMemo } = values;
      if (!operateMemo) {
        message.error("请输入作废原因");
        return;
      }
      const request = {
        ...values,
        id: state.currentDealId,
      };
      runCancelDeal.run(request);
    },
    /**
     * @handleSaveReview 成交审查
     */
    handleSaveReview() {
      runReview.run({
        id: state.currentDealId,
        pendingReviewFlag: true,
      });
    },
  });

  /**
   * @columns 成交项目表格
   */
  const columns = useColumns();
  /**
   * @confirmForm 确认成交form
   */
  const confirmForm = Form.useForm()[0];
  /**
   * @cancelForm 成交取消form
   */
  const cancelForm = Form.useForm()[0];

  return {
    state,
    logic,
    columns,
    confirmForm,
    cancelForm,
    api: {
      runGetCustDealInfo,
    },
  };
}

export const { useSelector, Provider } = createStore(DealConfirmModalStore);
