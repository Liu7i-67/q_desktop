import { observer } from "@quarkunlimit/qu-mobx";
import { Navigate, useLocation } from "react-router";
import UserHelper from "@/utils/user-helper";

export const Redirect = observer(function Redirect_() {
  const location = useLocation();
  const flag: boolean = UserHelper.getInstance().checkPermission("workSpace");

  if (location.pathname !== "/") {
    return null;
  }

  return <Navigate to={flag ? "/welcome" : "/welcome"} />;
});
