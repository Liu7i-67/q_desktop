import Table from "./table";
import Option from "./option";
import TeamDetailDra from "./teamDetailDraw";
import TeamPersonalDetailDraw from "./teamPersonalDetailDraw";
import TeamChannelDetailDraw from "./teamChannelDetailDraw";

const PersonalPerformance = () => {
  return (
    <>
      <Option />
      <Table />
      <TeamDetailDra />
      <TeamPersonalDetailDraw />
      <TeamChannelDetailDraw />
    </>
  );
};

export default PersonalPerformance;
