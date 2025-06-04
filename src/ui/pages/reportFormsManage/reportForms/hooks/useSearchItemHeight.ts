import useTargetSize from "@/hooks/useTargetSize";
import { useCallback, useEffect, useState } from "react";

/**
 * @useTagHeight 获取报表中心顶部 Tag 的总高度
 */
const useTagHeight = (initHeight?: number) => {
  const { width } = useTargetSize();
  const [tagHeight, setTagHeight] = useState<number>(initHeight || 0);

  const getHeight = useCallback(() => {
    const container = document.querySelector("#reportForm_tag_container");
    if (container) {
      return container.clientHeight;
    }
    return initHeight || 0;
  }, [width]);

  useEffect(() => {
    const h = getHeight();
    setTagHeight(h);
  }, [getHeight]);

  return {
    tagHeight,
  };
};

export default useTagHeight;
