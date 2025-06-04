import { FC, ReactNode } from "react";
import TXNoPermission from "../TXNoPermission";

export interface ITXAuthContainerProps {
  /**
   * @auth 当前权限
   */
  auth: boolean;
  /**
   * @children 子组件
   */
  children?: ReactNode | ReactNode[];
}

const TXAuthContainer: FC<ITXAuthContainerProps> = (props) => {
  const { auth, children } = props;
  return auth ? children : <TXNoPermission />;
};

export default TXAuthContainer;
