import React from "react";
import rightCharacterSvg from "../../../../../../svg/right_character.svg";
import "./index.css";

export interface IRightCharacterProps {}

const RightCharacter: React.FC<IRightCharacterProps> = (props) => {
  return (
    <img
      className="-rotate-12 relative bottom-3 character-img right-character-animation"
      src={rightCharacterSvg}
    />
  );
};

export default RightCharacter;
