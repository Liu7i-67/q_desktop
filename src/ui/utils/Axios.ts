import { logOut } from "@/utils/tools";
import { message } from "antd";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
  CreateAxiosDefaults,
} from "axios";
import { once } from "lodash";
import LocalHelper from "./LocalHelper";
enum ECode {
  SUCCESS = 200,
  ERRO = 500,
}

let timer409: NodeJS.Timeout;

LocalHelper.getInstance().init();

export const baseUrl =
  LocalHelper.getInstance().diy?.tx_api ||
  (process.env.NODE_ENV === "production"
    ? "http://192.168.160.2:20011"
    : process.env.PUBLIC_TX_API);

const autoCancelTokenMaps = new Map<string, IAxiosRequestConfig>();

export interface IApiData {
  data: any;
  code: ECode;
  msg: string;
}

interface IData extends AxiosResponse {
  data: IApiData;
}

interface IAxiosRequestConfig extends AxiosRequestConfig {
  _cancel?: Canceler;
  _autoCancel?: boolean;
}

const requestInterceptor = async (config: IAxiosRequestConfig) => {
  const host = window.location.host;
  config.headers!["X-Frontend-Version"] = JSON.stringify({
    webOaVersion: process.env.PUBLIC_TX_VERSION,
  });
  config.headers!["tenantId"] = host.includes("qingyan") ? 2 : 1;

  if (
    process.env.NODE_ENV === "production" &&
    process.env.PUBLIC_SKIP_VERIFICATION !== "true" &&
    !LocalHelper.getInstance().diy?.bypassVersion
  ) {
    config.headers!["X-Frontend-Version-Judge"] = "true";
  }

  if (config.url && !config.url.includes("login")) {
    config.headers!.Authorization = window.localStorage.getItem("token") || "";
  }
  if (config._autoCancel) {
    config.cancelToken = new axios.CancelToken((c) => {
      config._cancel = c;
    });
    const key = `${config.method}-${config.baseURL}${config.url}`;

    if (autoCancelTokenMaps.has(key)) {
      autoCancelTokenMaps.get(key)?._cancel?.();
    }
    autoCancelTokenMaps.set(key, config);
  }

  return config;
};
const requestInterceptorError = (err: AxiosError) => err;
const responseInterceptor = (response: AxiosResponse) => {
  if (response.headers["refresh-token"]) {
    window.localStorage.setItem("token", response.headers["refresh-token"]);
  }

  const key = `${response.config.method}-${response.config.url}`;
  if (autoCancelTokenMaps.has(key)) {
    autoCancelTokenMaps.delete(key);
  }

  return response;
};
const _logout = once(logOut);
const responseInterceptorError = (err: AxiosError) => {
  if (err.response) {
    switch (err.response.status) {
      case 401:
        message.error("登录过期!,1.5s自动退出");
        setTimeout(() => {
          _logout();
        }, 1500);
        break;
      case 404:
        message.error("系统更新中，请稍后重试");
        break;
      case 409:
        if (timer409) {
          clearTimeout(timer409);
        } else {
          message.error("当前页面版本和服务端不匹配，3s后自动刷新当前页面");
        }

        timer409 = setTimeout(() => {
          window.location.href =
            window.location.href + "?t=" + new Date().getTime();
          window.location.reload();
        }, 3000);
      case 503:
        message.warning("系统更新中，请稍后再试~");
        break;
      default:
        break;
    }
    return Promise.reject(err.response.data);
  }
  return Promise.reject(err.response);
};

class Axios {
  private static instance: Axios;
  public session!: AxiosInstance;

  constructor() {
    this.init();
  }

  private async init() {
    let baseURL: string = baseUrl;
    const options: CreateAxiosDefaults = {
      baseURL,
      withCredentials: true,
    };
    this.session = axios.create(options);
    this.session.interceptors.request.use(
      // @ts-ignore
      requestInterceptor,
      requestInterceptorError
    );
    this.session.interceptors.response.use(
      responseInterceptor,
      responseInterceptorError
    );
  }

  static getInstance() {
    if (!Axios.instance) {
      Axios.instance = new Axios();
    }
    return Axios.instance;
  }

  public checkResponse(response: IData): Promise<IApiData> {
    return new Promise((resolve, reject) => {
      const { data } = response;
      const { code, msg } = data;
      if (code !== ECode.SUCCESS) {
        message.error(msg);
        return reject({ code, msg, data: data?.data });
      }
      return resolve(data);
    });
  }

  /**
   * get方法
   * @param url api接口
   */

  get(api: string, params?: IAxiosRequestConfig) {
    return this.session(
      Object.assign({ method: "get", url: api }, params)
    ).then((response: IData) => {
      return this.checkResponse(response);
    });
  }

  /**
   * post方法
   * @param url api接口
   * @param param 参数
   */
  post(api: string, params?: IAxiosRequestConfig) {
    return this.session(
      Object.assign({ method: "post", url: api }, params)
    ).then((response: IData) => {
      return this.checkResponse(response);
    });
  }

  /**
   * put方法
   * @param url  api接口
   * @param param 参数
   */
  put(api: string, params?: IAxiosRequestConfig) {
    return this.session(
      Object.assign({ method: "put", url: api }, params)
    ).then((response: IData) => {
      return this.checkResponse(response);
    });
  }

  /**
   * delete方法
   * @param url  api接口
   */
  delete(api: string, params?: IAxiosRequestConfig) {
    return this.session(
      Object.assign({ method: "delete", url: api }, params)
    ).then((response: IData) => {
      return this.checkResponse(response);
    });
  }

  /**
   * patch方法
   * @param url api接口
   * @param param 参数
   */
  patch(api: string, params?: IAxiosRequestConfig) {
    return this.session(
      Object.assign({ method: "patch", url: api }, params)
    ).then((response: IData) => {
      return this.checkResponse(response);
    });
  }
}

export const Service = new Axios();
