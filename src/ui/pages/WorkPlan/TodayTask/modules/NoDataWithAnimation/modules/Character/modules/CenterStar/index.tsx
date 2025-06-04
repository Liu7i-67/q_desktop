import centerCharacterSvgStar from "../../../../../../svg/center_character_star.svg";
import "./index.css";

const CenterStar = () => {
  return (
    <img
      className="absolute top-[25%] left-[36%] translate-x-[-36%] w-[20%] h-[20%] center-character-star-animation"
      src={centerCharacterSvgStar}
    />
  );
};

export default CenterStar;
