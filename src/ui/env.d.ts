// 声明一个全局命名空间 NodeJS（如果尚未存在）
declare namespace NodeJS {
  // 扩展 ProcessEnv 接口以包含自定义环境变量
  interface ProcessEnv {
    /** @param api地址 */
    PUBLIC_TX_API: string; // 将 TX_API 定义为 string 类型
    /** @param 版本号 */
    PUBLIC_TX_VERSION: string;
    /** @param 是否需要跳过校验 */
    PUBLIC_SKIP_VERIFICATION: string;
  }
}
