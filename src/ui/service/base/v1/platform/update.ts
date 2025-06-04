export interface IReqBaseV1PlatformUpdate {
  /** @parma 平台id */
  id?: string;
  /** @parma 平台名称 */
  platformName: string;
  /** @parma 是否启用 */
  enableFlag?: boolean;
  /** @parma 备注 */
  memo?: string;
}
