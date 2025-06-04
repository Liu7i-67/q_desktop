export interface IReqBaseV1LiveStreamerUpdate {
  /** @param 主播id*/
  id?: string;
  /** @param 主播姓名 */
  anchorName: string;
  /** @param 是否启用 */
  enableFlag?: boolean;
  /** @param 备注 */
  memo?: string;
}
