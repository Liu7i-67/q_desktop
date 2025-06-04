import { Service } from "@/utils/Axios";
import { IReqGetTestData } from "./interface";

/** @function 演示接口 */
export const get_test_data = (params: IReqGetTestData) => {
  return Service.get("/api/test", {
    params,
  });
};
