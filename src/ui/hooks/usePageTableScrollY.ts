import { useCallback } from "react";
import useTargetSize from "./useTargetSize";

export interface IProps {
  /**
   * @isExpand 条件搜索表单是否展开
   */
  isExpand?: boolean;
  /**
   * @hasPagination 表格展示分页
   */
  hasPagination?: boolean;
  /**
   * @gapWithFormAndTable 搜索表单和 table 的间距
   */
  gapWithFormAndTable?: number;
  /**
   * @extraHeight 额外的高度, 某些页面可能存在额外的布局元素, 需要减去这些元素的高度
   */
  extraHeight?: number;
}

/**
 * @usePageTableScrollY 计算路由页面 layout 中 table 的 scroll 属性
 */
const usePageTableScrollY = (
  props?: IProps
): {
  scrollY: string;
} => {
  const {
    isExpand = false,
    hasPagination = false,
    gapWithFormAndTable = 16,
    extraHeight = 0,
  } = props || {};
  const { width, height } = useTargetSize();
  const { height: tableHeaderHeight } = useTargetSize(
    document.querySelector(".ant-table-header")
  );

  /**
   * @getFormHeight 获取搜索表单 form 高度
   */
  const getFormHeight = useCallback(() => {
    const form = document.querySelector(".ant-form");
    return form ? form.getBoundingClientRect()?.height : 33.5;
  }, [isExpand, width, height]);

  /**
   * @getPaginationHeight 获取 table 分页高度
   */
  const getPaginationHeight = useCallback(() => {
    const paginationHeight = hasPagination
      ? document.querySelector(".ant-pagination")?.getBoundingClientRect()
          ?.height || 32
      : 0;
    // 默认分页和 table 的间距
    const paginationTopMargin = 16;
    return paginationHeight ? paginationHeight + paginationTopMargin : 0;
  }, [hasPagination, width, height]);

  const scrollYNumber =
    64 +
    // header 的高度
    32 +
    // antd-layout-content 的上下margin
    30 +
    // ant-breadcrumb 高度 + marginBottom
    32 +
    // layout 中, form + table 的父级 div 的上下padding
    getFormHeight() +
    gapWithFormAndTable +
    tableHeaderHeight +
    // ant-table-header的高度
    getPaginationHeight() +
    64 +
    // pagination 距离底部的预留距离
    extraHeight;

  return { scrollY: `calc(100vh - ${scrollYNumber}px)` };
};

export default usePageTableScrollY;
