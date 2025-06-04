import blueLongLine from "../../../../svg/blue_long_line.svg";
import blueShortLineSvg from "../../../../svg/blue_short_line.svg";
import blueStarSvg from "../../../../svg/blue_star.svg";
import greenLineSvg from "../../../../svg/green_line.svg";
import lightBlueLineSvg from "../../../../svg/light_blue_line.svg";
import readLineSvg from "../../../../svg/red_line.svg";
import readRoundSvg from "../../../../svg/red_round.svg";
import successStarSvg from "../../../../svg/success_star.svg";
import yellowStarSvg from "../../../../svg/yellow_star.svg";
import CheckMarkAnimation from "./CheckMark";
import "./index.css";

const Finish = () => {
  return (
    <div className="absolute bottom-2 flex justify-center items-center finish-animation">
      <div className="relative">
        <CheckMarkAnimation />
        <img
          className="absolute top-0 -right-6 finish-first-runing-img-animation"
          src={readLineSvg}
          width={14}
          height={14}
        />
        <img
          className="absolute bottom-4 -left-6 finish-first-runing-img-animation"
          src={readRoundSvg}
          width={14}
          height={14}
        />
        <img
          className="absolute bottom-0 -right-6 finish-first-runing-img-animation"
          src={blueShortLineSvg}
          width={12}
          height={12}
        />
        <img
          className="absolute top-0 -left-6 finish-first-runing-img-animation"
          src={blueStarSvg}
          width={14}
          height={14}
        />
        <img
          className="absolute -top-8 left-4 finish-first-runing-img-animation"
          src={blueLongLine}
          width={14}
          height={14}
        />
        <img
          className="absolute top-10 -left-10 -rotate-90 finish-first-runing-img-animation"
          src={greenLineSvg}
          width={14}
          height={14}
        />
        <img
          className="absolute -bottom-8 left-4 rotate-90 finish-first-runing-img-animation"
          src={greenLineSvg}
          width={14}
          height={14}
        />
        <img
          className="absolute -top-8 right-4 finish-first-runing-img-animation"
          src={greenLineSvg}
          width={14}
          height={14}
        />
        <img
          className="absolute bottom-10 -right-10 finish-first-runing-img-animation"
          src={lightBlueLineSvg}
          width={14}
          height={14}
        />
        <img
          className="absolute -bottom-6 right-2 rotate-[150deg] finish-first-runing-img-animation"
          src={readLineSvg}
          width={14}
          height={14}
        />
        <img
          className="absolute -bottom-4 -left-6 rotate-[165deg] finish-first-runing-img-animation"
          src={yellowStarSvg}
          width={14}
          height={14}
        />
        <img
          className="absolute top-8 -right-10 finish-first-runing-img-animation"
          src={yellowStarSvg}
          width={14}
          height={14}
        />

        <img
          className="absolute top-0 right-4 finish-second-runing-img-animation"
          src={successStarSvg}
          width={14}
          height={14}
        />
        <img
          className="absolute top-2 right-0 finish-second-runing-img-animation"
          src={successStarSvg}
          width={20}
          height={20}
        />
        <img
          className="absolute top-8 -right-1 finish-second-runing-img-animation"
          src={successStarSvg}
          width={14}
          height={14}
        />
        <img
          className="absolute bottom-8 -left-1 finish-second-runing-img-animation"
          src={successStarSvg}
          width={14}
          height={14}
        />
        <img
          className="absolute bottom-2 left-0 finish-second-runing-img-animation-slowly"
          src={successStarSvg}
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

export default Finish;
