import { cn } from "@/utils/tools";
import userHelper from "@/utils/user-helper";
import { Alert } from "antd";
import { useLocation } from "react-router";
import PersonalCenterDrawer from "@/pages/PersonalCenterDrawer";
import Marquee from "react-fast-marquee";
import { observer } from "@quarkunlimit/qu-mobx";
import { useStore } from "./store/RootStore";
import MyBreadcrumb from "./my-breadcrumb";
import { UserCenter } from "./modules/UserCenter";

const WebHeader = observer(function WebHeader_() {
  const global = useStore();
  const { logic, refs } = global;

  const userInfo = userHelper.getInstance();

  const tenantId = userInfo.getTenantId;

  // 判断是否显示alert（在客户管理医院端显示）
  const location = useLocation();
  const showAlert = location.pathname === "/customerMangeHospital/myCustomer";

  const get_logo = () => {
    const host = window.location.host;
    const suffix = host.includes("test") ? "（测试）" : "";
    if (!suffix && host.includes("taoxi")) {
      return {
        title: `讨喜OA${suffix}`,
        logo: "https://resources.taoxiplan.com/logo.png",
      };
    }
    if (!suffix && host.includes("qingyan")) {
      return {
        title: `清颜OA${suffix}`,
        logo: "https://resources.taoxiplan.com/qingyan_logo.png",
      };
    }
    switch (tenantId) {
      case "1":
        return {
          title: `讨喜OA${suffix}`,
          logo: "https://resources.taoxiplan.com/logo.png",
        };
      case "2":
        return {
          title: `清颜OA${suffix}`,
          logo: "https://resources.taoxiplan.com/qingyan_logo.png",
        };
      default:
        return {
          title: `讨喜OA${suffix}`,
          logo: "https://resources.taoxiplan.com/logo.png",
        };
    }
  };

  const { title, logo } = get_logo();

  return (
    <div className={cn("w-full flex justify-between bg-white")}>
      <div className="flex items-center gap-2 cursor-pointer w-[190px]">
        <img
          src={logo}
          width={20}
          height={20}
          className="rounded-full  hover:shadow-lg transition-shadow"
        />
        <h1 className="text-lg">{title}</h1>
      </div>
      <div className="flex flex-1 items-center justify-between">
        <MyBreadcrumb />

        {showAlert && (
          <Alert
            type="warning"
            showIcon
            className={"max-w-[800px] h-[28px] relative -left-[180px]"}
            message={
              <Marquee pauseOnHover autoFill={true} speed={50}>
                <span>
                  请务必遵守讨喜公司沟通规范，按照我方咨询师备注规范联系顾客，
                </span>
                <span className={"text-bold text-red-500"}>
                  请勿擅自违规联系顾客
                </span>
                <span>
                  ，因不按规范联系给顾客造成骚扰引起客户投诉的，自行承担责任，我方有权按规处罚，请广大合作机构自觉遵守，感谢！
                </span>
              </Marquee>
            }
          />
        )}
        <UserCenter />
      </div>
      <PersonalCenterDrawer ref={refs.userRef} />
    </div>
  );
});
export default WebHeader;
