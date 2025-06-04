import { Modal } from "@/components/TXModal";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, message, Upload } from "antd";
import { useState } from "react";
import { baseUrl } from "../Axios";
import LocalHelper from "../LocalHelper";

interface ImageFile {
  fileName: string;
  fullPath: string;
  fullThumbnailPath: string;
  path: string;
  thumbnailPath: string;
}

/**
 * org：机构管理
 * doctor：客户管理（医院）
 * report：报表
 * customer：客户
 * customerLead：客户线索
 */
export type TUplodaType =
  | "org"
  | "doctor"
  | "report"
  | "customer"
  | "customerLead"; // customerLead 2025-4-25 已废弃

interface ImageUploadProps {
  uploadType: TUplodaType;
  value?: ImageFile[];
  onChange?: (value: ImageFile[]) => void;
  maxSize?: number;
  maxCount?: number;
}

export const AsyncImageUpload: React.FC<ImageUploadProps> = ({
  value = [],
  onChange,
  maxSize = 2,
  maxCount = 1,
  uploadType,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");

  const uploadPurposeEnumValue = {
    org: "ORGANIZATION_PHOTO",
    doctor: "DOCTOR_PHOTO",
    report: "REPORT",
    customer: "CUSTOMER",
    // 2025-4-25 线索已废弃
    customerLead: "CUSTOMER_LEADS",
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("只能上传图片文件！");
      return false;
    }

    const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
    if (!isLtMaxSize) {
      message.error(`图片必须小于 ${maxSize}MB!`);
      return false;
    }

    return false;
  };

  const handleUpload = async (info: { fileList: any[] }) => {
    const fileList = info.fileList;
    setLoading(true);

    if (fileList.length === 0) {
      return;
    }
    let baseURL: string = baseUrl;

    try {
      const file = fileList[fileList.length - 1].originFileObj; // 只处理最新上传的文件
      const formData = new FormData();
      formData.append("file", file);
      // formData.append("purposeEnum", "CUSTOMER_LEADS");

      /**上传图片时，需要指定 uploadType，处理 purposeEnum 对应的值，方便后端处理*/
      formData.append("purposeEnum", uploadPurposeEnumValue[uploadType]);

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

      // 只添加新上传的文件结果
      const newFile = {
        fileName: result.data.fileName,
        fullPath: result.data.fullPath,
        fullThumbnailPath: result.data.fullThumbnailPath,
        path: result.data.path,
        thumbnailPath: result.data.thumbnailPath,
      };

      onChange?.([...value, newFile]);
    } catch (error) {
      message.error("文件上传失败");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (index: number) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange?.(newValue);
  };

  const handlePreview = (fileUrl: string) => {
    setPreviewImageUrl(fileUrl);
    setPreviewVisible(true);
  };

  const handlePreviewCancel = () => {
    setPreviewImageUrl("");
    setPreviewVisible(false);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {value.map((image, index) => {
          return (
            <div key={index} className="relative w-[102px] h-[102px]">
              <img
                src={image.fullThumbnailPath}
                alt={`uploaded-${index}`}
                className="w-full h-full object-cover rounded"
                onClick={() =>
                  handlePreview(image.fullPath || image.fullThumbnailPath)
                }
              />
              <div
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black/50 
                       text-white cursor-pointer flex items-center justify-center 
                       hover:bg-black/70 transition-colors leading-none text-sm"
                onClick={() => handleRemove(index)}
              >
                <span className="-mt-0.5">×</span>
              </div>
            </div>
          );
        })}

        {value.length < maxCount && (
          <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleUpload}
            className="w-[102px] h-[102px]"
          >
            <div className="flex flex-col items-center justify-center">
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="mt-2">上传图片</div>
            </div>
          </Upload>
        )}
      </div>
      <Modal
        centered
        open={previewVisible}
        footer={null}
        onCancel={handlePreviewCancel}
      >
        <Image src={previewImageUrl} />
      </Modal>
    </>
  );
};
