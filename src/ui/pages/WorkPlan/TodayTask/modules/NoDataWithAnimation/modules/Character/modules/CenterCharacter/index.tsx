import React from "react";
import centerCharacterSvg from "../../../../../../svg/center_character.svg";

export interface ICenterCharacterProps {}

const CenterCharacter: React.FC<ICenterCharacterProps> = (props) => {
  return (
    <>
      <img className="!w-full !h-full" src={centerCharacterSvg} />
    </>
  );
};

export default CenterCharacter;
