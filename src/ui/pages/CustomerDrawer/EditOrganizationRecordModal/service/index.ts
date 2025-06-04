import { Service } from "@/utils/Axios";
import { IReqBusinessV1OrganizationcontactrecordSave } from "@/service/business/v1/organizationcontactrecord/save";
import { IReqBusinessV1OrganizationcontactrecordUpdate } from "@/service/business/v1/organizationcontactrecord/update";

/** @function 新增机构联系记录 */
export const save_org_contact_record = (
  data: IReqBusinessV1OrganizationcontactrecordSave
) => {
  return Service.post("/api/business/v1/organizationcontactrecord/save", {
    data,
  });
};

/** @function 修改机构联系记录 */
export const update_org_contact_record = (
  data: IReqBusinessV1OrganizationcontactrecordUpdate
) => {
  return Service.put("/api/business/v1/organizationcontactrecord/update", {
    data,
  });
};
