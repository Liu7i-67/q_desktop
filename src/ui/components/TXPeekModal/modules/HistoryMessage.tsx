import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import UserHelper from "@/utils/user-helper";

const HistoryMessage = observer(function HistoryMessage_() {
  const root = useStore();
  const { logic } = root;

  const name = UserHelper.getInstance().tenantId === "2" ? "讨喜" : "清颜";

  return (
    logic.repeatData?.historyDispatchInfoDTO?.dispatchedFromOtherTenantFlag && (
      <div className="my-4">
        <span className="font-bold text-[16px] ">历史派单查重结果</span>:
        该联系方式历史曾被{name}派单，详情请前往老OA系统查看
      </div>
    )
  );
});

export default HistoryMessage;
