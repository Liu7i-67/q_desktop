import { ImageFile } from "@/utils/upload";

export interface IReqBusinessV1CustomerDispatchHandle {
  dispatchId: string;
  dispatchStatus?: string;
  operateImg?: ImageFile[];
  memo?: string;
  /** @param 是否强制修改 */
  forceHandleFlag?: boolean;
}
