import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { IFollowUpRecordLineProps } from "./interface";
import { classNames } from "@/utils/tools";
import { LeftForm } from "./modules/LeftForm";
import { LeftTips } from "./modules/LeftTips";
import TaskSettingCheckModal from "../TaskSettingCheckModal";
import { useEffect } from "react";
import { useScroll } from "@/hooks/useScroll";
import { List } from "./modules/List";
import "./index.css";

const FollowUpRecordLine = observer(function FollowUpRecordLine_(
  props: IFollowUpRecordLineProps
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { refs, logic } = root;
  const { show, detail } = props;

  const sc = useScroll({
    onScrollToBottom: logic.nextPage,
  });

  useEffect(() => {
    if (show && detail?.id) {
      logic.getList();
      logic.getSuggest();
    }
  }, [show, detail]);

  return (
    <div
      className={classNames({
        "p-2 flex h-[calc(100vh-130px)] gap-[16px] follow-up-record-line": true,
        hidden: !show,
      })}
    >
      <div className="w-[350px] overflow-y-auto overflow-x-hidden">
        <LeftTips />
        <LeftForm />
      </div>
      <div
        className="bg-[#f7f8fc] flex-1 rounded-xl overflow-y-auto overflow-x-hidden pr-4 pl-8 py-2"
        ref={sc.ref}
        onScroll={sc.handleScroll}
      >
        <List />
      </div>
      <TaskSettingCheckModal
        ref={refs.checkRef}
        afterClose={logic.afterClose}
      />
    </div>
  );
});

export default observer(function FollowUpRecordLinePage(
  props: IFollowUpRecordLineProps
) {
  return (
    <Provider>
      <FollowUpRecordLine {...props} />
    </Provider>
  );
});
