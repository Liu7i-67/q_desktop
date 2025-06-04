export interface IReqBaseV1UserOrganizationRelationGetPage {
  /**@param 分页current */
  page: number;
  /**@param 分页pageSize */
  size: number;
  /**@param 员工id */
  userId?: string;
}
export interface IResBaseV1UserOrganizationRelationGetPage {
  id?: string;
  orgId?: string;
  orgName?: string;
  orgNames: string;
  userId: string;
  userName: string;
}
