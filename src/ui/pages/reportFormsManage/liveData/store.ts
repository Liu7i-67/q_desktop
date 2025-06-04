import { createStore } from "@quarkunlimit/tiny";
import { useColumns } from "@/pages/reportFormsManage/liveData/columns";
import {
  exportData,
  getLiveData,
} from "@/pages/reportFormsManage/liveData/services";
import { useImmer, useImmerApi } from "@quarkunlimit/immer";
import { useMethods } from "@quarkunlimit/react-hooks";
import { Form, message } from "antd";
import { exportDownload } from "@/utils/tools";
import { SorterResult } from "antd/es/table/interface";
import { useRef } from "react";
import { ILiveDataDetailDrawerRef } from "@/pages/LiveDataDetailDrawer/interface";

function LiveDataStore() {
  const detailRef = useRef<ILiveDataDetailDrawerRef>(null);
  const [state, setState] = useImmer({
    page: 1,
    size: 20,
    dataSource: [] as any[],
    total: 0,
    sortBy: "",
    sortByAsc: false,
  });

  const runGetLiveData = useImmerApi(getLiveData, {
    onSuccess(data) {
      const resp = data?.data?.data;
      if (!resp) {
        return;
      }

      setState((d) => {
        d.dataSource = resp?.records ?? [];
        d.total = resp?.total ?? 0;
      });
    },
  });

  const runExportData = useImmerApi(exportData, {
    onSuccess(data) {
      if (!data?.data) {
        message.error("导出失败");
        return;
      }
      exportDownload(data.data);
    },
  });
  const form = Form.useForm()[0];
  const columns = useColumns(state, detailRef, form);

  const logic = useMethods({
    getTableData(
      page?: number,
      size?: number,
      extra?: {
        orderFieldName?: string;
        orderDesc?: boolean;
      }
    ) {
      if (page || size) {
        setState((d) => {
          d.page = page ?? 1;
          d.size = size ?? 20;
        });
      }
      const { date, liverStreamerIdList } = form.getFieldsValue();
      const request = {
        startLocalDateTime: date?.[0]
          ?.startOf("day")
          ?.format("YYYY-MM-DD HH:mm:ss"),
        endLocalDateTime: date?.[1]
          ?.endOf("day")
          ?.format("YYYY-MM-DD HH:mm:ss"),
        page: page ?? state.page,
        size: size ?? state.size,
        orderFieldName: state.sortBy || undefined,
        orderDesc: state.sortBy ? !state.sortByAsc : undefined,
        liverStreamerIdList: liverStreamerIdList || [],
        ...(extra || {}),
      };
      runGetLiveData.run(request);
    },
    /** @function 重置时 */
    handleReset() {
      setState((o) => {
        o.page = 1;
        o.sortBy = "";
        o.sortByAsc = false;
      });
      logic.getTableData(1, state.size, {
        orderFieldName: undefined,
        orderDesc: undefined,
      });
    },

    /** @function 排序改变时 */
    handleChangeSort(sort: SorterResult<any>) {
      let sortBy = (sort.field as string) || "";
      let sortByAsc = sort.order ? sort.order === "ascend" : false;
      setState((o) => {
        o.sortBy = sortBy;
        o.sortByAsc = sortByAsc;
      });
      logic.getTableData(1, state.size, {
        orderFieldName: sortBy || undefined,
        orderDesc: sortBy ? !sortByAsc : undefined,
      });
    },
    handleExport() {
      const { date, liverStreamerIdList } = form.getFieldsValue();

      const request = {
        startLocalDateTime: date?.[0]
          ?.startOf("day")
          ?.format("YYYY-MM-DD HH:mm:ss"),
        endLocalDateTime: date?.[1]
          ?.endOf("day")
          ?.format("YYYY-MM-DD HH:mm:ss"),
        orderFieldName: state.sortBy || undefined,
        orderDesc: state.sortBy ? !state.sortByAsc : undefined,
        liverStreamerIdList: liverStreamerIdList || [],
      };
      runExportData.run(request);
    },
  });

  return {
    columns,
    state,
    logic,
    form,
    api: {
      runGetLiveData,
      runExportData,
    },
    detailRef,
  };
}

export const { Provider, useSelector } = createStore(LiveDataStore);
