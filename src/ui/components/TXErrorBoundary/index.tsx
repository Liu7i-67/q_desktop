import React from "react";

interface IProps {
  onError?: () => void;
  fallback?: () => React.ReactNode;
  children: React.ReactNode;
}
class TXErrorBoundary extends React.Component<IProps> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    this.props?.onError?.();
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props?.fallback ? (
        this.props.fallback()
      ) : (
        <div>发生了异常</div>
      );
    }

    return this.props.children;
  }
}
export default TXErrorBoundary;
