import React from "react";
import leftCharacterSvg from "../../../../../../svg/left_character.svg";
import "./index.css";

export interface ILeftCharacterProps {}

const LeftCharacter: React.FC<ILeftCharacterProps> = (props) => {
  return (
    <img
      className="relative bottom-1 character-img left-character-animation"
      src={leftCharacterSvg}
    />
  );
};

export default LeftCharacter;
