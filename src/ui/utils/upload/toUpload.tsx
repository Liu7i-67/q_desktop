import { message } from "antd";
import { ImageFile } from ".";
import { baseUrl } from "../Axios";
import LocalHelper from "../LocalHelper";

export const toUpload = async (fileList?: ImageFile[]) => {
  const outPut: ImageFile[] = [];
  if (!fileList) {
    return outPut;
  }
  for (let f of fileList) {
    if (!f.file) {
      outPut.push(f);
      continue;
    }

    let baseURL: string = baseUrl;

    try {
      const file = f.file;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("purposeEnum", "CUSTOMER_LEADS");

      const response = await fetch(`${baseURL}/api/base/v1/file/upload`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token") || "",
          "X-Frontend-Version-Judge":
            process.env.NODE_ENV === "production" &&
            process.env.PUBLIC_SKIP_VERIFICATION !== "true" &&
            !LocalHelper.getInstance().diy?.bypassVersion
              ? "true"
              : "",
          "X-Frontend-Version": JSON.stringify({
            webOaVersion: process.env.PUBLIC_TX_VERSION,
          }),
          tenantId: window.location.host.includes("qingyan") ? "2" : "1",
        },
        body: formData,
      });

      const result = await response.json();
      outPut.push({
        fileName: result.data.fileName,
        fullPath: result.data.fullPath,
        fullThumbnailPath: result.data.fullThumbnailPath,
        path: result.data.path,
        thumbnailPath: result.data.thumbnailPath,
      });
    } catch (error) {
      message.error("文件上传失败");
      return false;
    }
  }

  return outPut;
};
