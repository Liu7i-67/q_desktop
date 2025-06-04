import React from "react";
import Character from "./modules/Character";
import Finish from "./modules/Finish";
import Fire from "./modules/Fire/index";

export interface INoDataWithAnimationProps {}

const NoDataWithAnimation: React.FC<INoDataWithAnimationProps> = () => {
  return (
    <div className="w-[292px] h-[164px] relative">
      <Fire />
      <div className="flex justify-center items-center">
        <Character />
      </div>
      <div className="flex justify-center">
        <Finish />
      </div>
    </div>
  );
};

export default NoDataWithAnimation;
