import React from "react";
import BlueBg from "../svg/blue_bg.svg";
import GreenBg from "../svg/green_bg.svg";
import RedBg from "../svg/red_bg.svg";
import PurpleBg from "../svg/purple_bg.svg";
import BlueIcon from "../svg/blue_icon.svg";
import GreenIcon from "../svg/green_icon.svg";
import RedIcon from "../svg/red_icon.svg";
import PurpleIcon from "../svg/purple_icon.svg";

export interface IStatisticsCardProps {
  title: string;
  value: string | number;
  color?: "blue" | "green" | "red" | "purple";
  background?: string;
  icon?: string;
}

const bgMap: Record<string, string> = {
  blue: BlueBg,
  green: GreenBg,
  red: RedBg,
  purple: PurpleBg,
};

const iconMap: Record<string, string> = {
  blue: BlueIcon,
  green: GreenIcon,
  red: RedIcon,
  purple: PurpleIcon,
};

const StatisticsCard: React.FC<IStatisticsCardProps> = ({
  title,
  value,
  color,
  background,
  icon,
}) => {
  const resolvedBackground = background || (color ? bgMap[color] : "");
  const resolvedIcon = icon || (color ? iconMap[color] : "");

  return (
    <div
      className="w-[270px] h-[90px] mb-[10px] flex justify-between items-center px-[40px] shadow-[0px_0px_14px_0px_rgba(0,0,0,0.1)] rounded-[8px] bg-no-repeat bg-[length:100%_100%]"
      style={{ backgroundImage: `url(${resolvedBackground})` }}
    >
      <div>
        <div className="text-[32px] font-bold text-[#333]">{value}</div>
        <div className="text-[#666]">{title}</div>
      </div>
      {resolvedIcon && <img src={resolvedIcon} width={58} height={74} />}
    </div>
  );
};

export default StatisticsCard;
