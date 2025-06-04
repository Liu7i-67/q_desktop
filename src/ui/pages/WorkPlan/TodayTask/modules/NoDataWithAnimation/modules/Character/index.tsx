import React from "react";
import "./index.css";
import CenterCharacter from "./modules/CenterCharacter/index";
import CenterStar from "./modules/CenterStar/index";
import LeftCharacter from "./modules/LeftCharacter/index";
import RightCharacter from "./modules/RightCharacter/index";

export interface ICharacterProps {}

const Character: React.FC<ICharacterProps> = (props) => {
  return (
    <div className="character-animation">
      <LeftCharacter />
      <CenterStar />
      <CenterCharacter />
      <RightCharacter />
    </div>
  );
};

export default Character;
