import { useSelector } from "@/pages/customerLead/store";
import { Modal } from "@/components/TXModal";

const CustPeekModal = () => {
  const state = useSelector((x) => x.state);
  const { customerPeekMsg } = state;

  const { closeCustPeekModal } = useSelector((x) => x.logic);

  const name = window.location.host.includes("qingyan") ? "讨喜" : "清颜";

  let repeatMessage: React.ReactNode = "没有重复数据哦~";

  if (typeof customerPeekMsg === "string" && customerPeekMsg) {
    repeatMessage = (customerPeekMsg as string)
      ?.split("\n")
      ?.map((t, tIndex) => {
        return (
          <div key={tIndex} className="mb-1">
            {t}
          </div>
        );
      });
  } else if (customerPeekMsg?.repeatMessage) {
    repeatMessage = customerPeekMsg?.repeatMessage
      ?.split("\n")
      ?.map((t, tIndex) => {
        return (
          <div key={tIndex} className="mb-1">
            {t}
          </div>
        );
      });
  }

  return (
    <Modal
      open={!!customerPeekMsg}
      onCancel={closeCustPeekModal}
      width={450}
      footer={null}
      bodyProps={{
        style: { padding: "16px" },
      }}
      centered
    >
      <div className="font-bold text-[18px] mb-2">查重结果</div>
      <div>{repeatMessage}</div>
      {customerPeekMsg?.historyDispatchInfoDTO
        ?.dispatchedFromOtherTenantFlag && (
        <div className="font-bold text-[18px] my-2">历史派单查重结果</div>
      )}
      {customerPeekMsg?.historyDispatchInfoDTO
        ?.dispatchedFromOtherTenantFlag && (
        <div>该联系方式历史曾被{name}派单，详情请前往老OA系统查看</div>
      )}
    </Modal>
  );
};

export default CustPeekModal;
