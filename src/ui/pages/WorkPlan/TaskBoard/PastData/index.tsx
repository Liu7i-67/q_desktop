import { observer, useSyncProps, useWhen } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { IPastDataProps } from "./interface";
import { classNames } from "@/utils/tools";
import { SearchRow } from "./modules/SearchRow";
import { TXOverviewFold } from "@/components/TXOverviewFold";
import { OverviewRow } from "./modules/OverviewRow";
import { SubTabRow } from "./modules/SubTabRow";
import { lazy, Suspense } from "react";
import { Spin } from "antd";

const PastListOfConsultants = lazy(() => import("../PastListOfConsultants"));
const PastListOfDpts = lazy(() => import("../PastListOfDpts"));

const PastData = observer(function PastData_(props: IPastDataProps) {
  const root = useStore();
  const { logic, computed } = root;
  useSyncProps(root, Object.keys(props), props);

  useWhen(
    () => true,
    () => {
      logic.init();
    }
  );

  return (
    <div
      className={classNames({
        hidden: !props.visible,
      })}
    >
      <SearchRow />
      <TXOverviewFold
        title="数据总览"
        tips="看板仅展示在职咨询师的任务完成情况，且任务数量均按客户维度去重统计"
        className="mt-[16px] "
        onFold={logic.onFold}
      >
        <Spin spinning={computed.totalLoading}>
          <OverviewRow />
        </Spin>
      </TXOverviewFold>
      <SubTabRow />
      <Suspense fallback="加载中...">
        {logic.renderSet.has("ListOfConsultants") && (
          <PastListOfConsultants
            height={logic.childHeight}
            taskId={logic.taskId}
            endDate={logic.endDate}
            visible={logic.active === "ListOfConsultants"}
          />
        )}
        {logic.renderSet.has("ListOfDpts") && (
          <PastListOfDpts
            height={logic.childHeight}
            taskId={logic.taskId}
            endDate={logic.endDate}
            visible={logic.active === "ListOfDpts"}
          />
        )}
      </Suspense>
    </div>
  );
});

export default observer(function PastDataPage(props: IPastDataProps) {
  return (
    <Provider>
      <PastData {...props} />
    </Provider>
  );
});
