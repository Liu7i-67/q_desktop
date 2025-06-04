import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";

const RestPasswordInfo = observer(function RestPasswordInfo_() {
  const root = useStore();
  const { logic } = root;
  return (
    <div className="flex flex-col gap-3 px-6 py-4">
      <div className="flex items-center gap-1">
        <div>新密码：</div>
        <div>
          {logic.initData?.password ?? ""}
          <span
            className="text-[#1677ff] ml-2 cursor-pointer"
            onClick={logic.onCopyPassword}
          >
            复制
          </span>
        </div>
      </div>
      <div className="text-[#00000069]">
        密码已重置成功！请妥善保存新密码，避免遗忘或泄露给他人。
      </div>
    </div>
  );
});

export default RestPasswordInfo;
