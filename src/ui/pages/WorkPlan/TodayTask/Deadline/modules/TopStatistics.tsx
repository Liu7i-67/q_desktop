import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "../store/RootStore";
import Statistics from "../../modules/Statistics";
import { cn } from "@/utils/tools";

const TopStatistics = observer(() => {
  const root = useStore();
  const { logic } = root;

  return (
    <div
      className={cn(
        "w-full flex justify-between items-center flex-wrap",
        logic.showStatistics ? "" : "hidden"
      )}
    >
      {logic.statisticsData?.map((item, index) => {
        return <Statistics key={index} {...item} />;
      })}
    </div>
  );
});

export default TopStatistics;
