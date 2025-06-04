import { Modal } from "@/components/TXModal";
import { useSelector } from "./store";
import React, { useMemo, useRef } from "react";
import { Button } from "antd";
import CollaborationModal from "@/pages/CollaborationModal";
import { ICollaborationModalRef } from "@/pages/CollaborationModal/interface";

export const RepeatModal = function RepeatModal_() {
  const { isModalOpen, repeatResult } = useSelector((x) => x.state);
  const { closeModal } = useSelector((x) => x.logic);
  const collRef = useSelector((x) => x.collRef);

  const name = window.location.host.includes("qingyan") ? "讨喜" : "清颜";

  let repeatMessage: React.ReactNode = "没有重复数据哦~";
  if (typeof repeatResult === "string" && repeatResult) {
    repeatMessage = (repeatResult as string)?.split("\n")?.map((t, tIndex) => {
      return (
        <div key={tIndex} className="mb-1">
          {t}
        </div>
      );
    });
  } else if (repeatResult?.repeatMessage) {
    repeatMessage = repeatResult?.repeatMessage
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
      open={isModalOpen}
      onCancel={closeModal}
      width={450}
      footer={null}
      bodyProps={{
        style: { padding: "16px" },
      }}
      centered
    >
      <div className="font-bold text-[18px] mb-2">查重结果</div>
      <div>{repeatMessage}</div>
      {repeatResult?.historyDispatchInfoDTO?.dispatchedFromOtherTenantFlag && (
        <div className="font-bold text-[18px] my-2">历史派单查重结果</div>
      )}
      {repeatResult?.historyDispatchInfoDTO?.dispatchedFromOtherTenantFlag && (
        <div>该联系方式历史曾被{name}派单，详情请前往老OA系统查看</div>
      )}
      {repeatResult?.existCustomerId && (
        <div className="pt-4">
          <Button
            type="primary"
            onClick={() => {
              collRef.current?.openModal({
                existCustomerId: repeatResult?.existCustomerId || "",
              });
              closeModal();
            }}
          >
            添加协作
          </Button>
        </div>
      )}
    </Modal>
  );
};
