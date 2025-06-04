import { createStore } from "@quarkunlimit/tiny";
import { useMethods } from "@quarkunlimit/react-hooks";
import { useImmer } from "@quarkunlimit/immer";

function XhsWorkforceStore() {
  const [state, setState] = useImmer({
    activeTab: "schedule",
  });

  const logic = useMethods({
    // 设置当前选中的tab
    setActiveTab: (tab: string) => {
      setState((draft) => {
        draft.activeTab = tab;
      });
    },
  });
  return {
    state,
    logic,
  };
}

export const { useSelector, Provider } = createStore(XhsWorkforceStore);
