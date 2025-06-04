import { Radio } from "antd";
import { useSelector } from "../store";

export const TeamDetailDrawOption = function TeamDetailDrawOption_() {
  const userEnableFlag = useSelector((x) => x.state.userEnableFlag);
  const changeUserEnableFlag = useSelector((x) => x.logic.changeUserEnableFlag);
  return (
    <div className="flex items-center">
      <div>员工是否启用：</div>
      <Radio.Group
        optionType="button"
        value={userEnableFlag}
        onChange={(e) => {
          changeUserEnableFlag(e.target.value);
        }}
        options={[
          {
            value: undefined,
            label: "全部",
          },
          {
            value: true,
            label: "是",
          },
          {
            value: false,
            label: "否",
          },
        ]}
      ></Radio.Group>
    </div>
  );
};
