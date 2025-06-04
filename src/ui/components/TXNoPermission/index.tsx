import React from "react";
import { Empty } from "antd";

export const TXNoPermission = React.memo(() => {
  return (
    <div className="h-full flex justify-center items-center">
      <Empty description="该用户暂无权限，请联系管理员配置！" />
    </div>
  );
});

export default TXNoPermission;
