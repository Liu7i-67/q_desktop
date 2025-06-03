import { BrowserWindow, WebContentsView } from 'electron';

/** @interface 页面信息 */
export interface IWebView {
  id: string;
  view: WebContentsView;
  title: string;
}

/** @interface 全局状态信息 */
export interface IGloablStore {
  /** @param 窗口信息 */
  windowList: IBrowserWindowRecord[];
  /** @param 当期展示的窗口 */
  activeWindow: string;
}

/** @interface 窗口信息 */
export interface IBrowserWindowRecord {
  /** @param 窗口 */
  window: BrowserWindow;
  /** @param id */
  id: string;
  /** @param 是否可见 */
  visible: boolean;
  /** @param 视图信息 */
  viewList: IWebView[];
  /** @param 当期展示的视图 */
  activeView: string;
  /** @param 窗口宽度 */
  width: number;
  /** @param 窗口高度 */
  height: number;
}
