import { Button, Empty } from "antd";
import { Link } from "react-router";

export const Page404 = function Page404_() {
  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center flex-col">
      <Empty description="页面好像不见了" />
      <Link to="/">
        <Button className="mt-4">返回首页</Button>
      </Link>
    </div>
  );
};
