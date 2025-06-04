import { Service } from "@/utils/Axios";

export const getLiveData = (data: {
  startLocalDateTime: string;
  endLocalDateTime: string;
  page: number;
  size: number;
}) => {
  return Service.post("/api/report/v1/report/ANCHOR_CUSTOMER_DATA/pagination", {
    data,
  });
};

export const exportData = (data: {
  startLocalDateTime: string;
  endLocalDateTime: string;
}) => {
  return Service.post("/api/report/v1/report/ANCHOR_TRANSACTION_DATA/export", {
    data,
  });
};
