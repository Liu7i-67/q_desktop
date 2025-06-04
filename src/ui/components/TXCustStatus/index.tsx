import { ECustomerStatus } from "@/components/TXCustStatus/types";

interface ITXCustStatusProps {
  status: ECustomerStatus;
}

const TXCustStatus = (props: ITXCustStatusProps) => {
  const render = () => {
    switch (props.status) {
      case ECustomerStatus.EMPTY:
        return (
          <div
            style={{
              fontSize: `12px`,
              color: "#6b7280",
              backgroundColor: "#e5e7eb",
              padding: "2px 6px",
              borderRadius: "6px",
              border: `1px solid #6b7280`,
            }}
          >
            新客
          </div>
        );
      case ECustomerStatus.IN_PROGRESS:
        return (
          <div
            style={{
              fontSize: `12px`,
              color: "#3b82f6",
              backgroundColor: "#dbeafe",
              padding: "2px 6px",
              borderRadius: "6px",
              border: `1px solid #3b82f6`,
            }}
          >
            跟进中
          </div>
        );
      case ECustomerStatus.DEAL:
        return (
          <div
            style={{
              fontSize: `12px`,
              color: "#22c55e",
              backgroundColor: "#dcfce7",
              padding: "2px 6px",
              borderRadius: "6px",
              border: `1px solid #22c55e`,
            }}
          >
            成交
          </div>
        );
      case ECustomerStatus.REPEAT_PURCHASE:
        return (
          <div
            style={{
              fontSize: `12px`,
              color: "#f59e0b",
              backgroundColor: "#fef3c7",
              padding: "2px 6px",
              borderRadius: "6px",
              border: `1px solid #f59e0b`,
            }}
          >
            复购
          </div>
        );
    }
  };

  return <div>{render()}</div>;
};

export * from "./types";

export default TXCustStatus;
