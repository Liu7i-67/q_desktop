import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import { Tooltip } from "antd";

export const UserBtn = observer(function UserBtn_() {
  const root = useStore();
  const { refs } = root;
  return (
    <Tooltip title="根据渠道负责人选择渠道">
      <div
        className="w-[32px] h-full rounded-md flex items-center justify-center cursor-pointer absolute right-[24px]"
        onClick={() => {
          refs.userRef.current?.openModal();
        }}
      >
        <i
          className="iconfont icon-lianxiren1 text-[#d0d0d0]"
          style={{
            fontSize: "20px",
          }}
        ></i>
      </div>
    </Tooltip>
  );
});
