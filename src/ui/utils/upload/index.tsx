import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, message, Upload } from "antd";
import { useState } from "react";
import { baseUrl } from "../Axios";
import { Modal } from "@/components/TXModal";

export interface ImageFile {
  fileName: string;
  fullPath: string;
  fullThumbnailPath: string;
  path: string;
  thumbnailPath: string;
  file?: File;
}

interface ImageUploadProps {
  value?: ImageFile[];
  onChange?: (value: ImageFile[]) => void;
  maxSize?: number;
  maxCount?: number;
}

export const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // 成功读取文件时触发
    reader.onload = () => {
      resolve(reader.result);
    };

    // 读取文件出错时触发
    reader.onerror = (error) => {
      reject(error);
    };

    // 开始读取文件并转换为 Data URL（Base64）
    reader.readAsDataURL(file);
  });
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  value = [],
  onChange,
  maxSize = 2,
  maxCount = 1,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");

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
      const base64 = await fileToBase64(file);

      // 只添加新上传的文件结果
      const newFile = {
        file: file,
        fileName: "",
        fullPath: "",
        fullThumbnailPath: base64 as string,
        path: "",
        thumbnailPath: "",
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

export default ImageUpload;

export * from "./toUpload";
export * from "./asyncUpload";
