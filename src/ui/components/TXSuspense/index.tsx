import { Spin } from "antd";
import { ReactNode, Suspense } from "react";
interface IProps {
  fallback?: ReactNode;
  fallbackLoading?: boolean;
  children: React.ReactNode;
}
const TXSuspense = ({ children, fallback, fallbackLoading }: IProps) => {
  const fallbackNode = fallback ? fallback : fallbackLoading ? <Spin /> : null;
  return <Suspense fallback={fallbackNode}>{children}</Suspense>;
};
export default TXSuspense;
