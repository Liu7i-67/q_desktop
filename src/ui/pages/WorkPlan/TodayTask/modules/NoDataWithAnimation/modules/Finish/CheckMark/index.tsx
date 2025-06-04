import React from "react";
import checkMarkSvg from "../../../../../svg/check_mark.svg";
import checkMarkLightSvg from "../../../../../svg/check_mark_light.svg";
import greenRoundSvg from "../../../../../svg/green_round.svg";
import "./index.css";

export interface SuccessAnimationProps {}

const CheckMarkAnimation: React.FC<SuccessAnimationProps> = (props) => {
  return (
    <div className="chark-mark-animation-container">
      <div className="relative overflow-hidden rounded-[50%]">
        <img className="z-10" src={greenRoundSvg} width={80} height={80} />
        <img src={checkMarkLightSvg} className="check-mark-animation" />
        <img
          className="absolute z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          src={checkMarkSvg}
          width={55}
          height={55}
        />
      </div>
    </div>
  );
};

export default CheckMarkAnimation;
