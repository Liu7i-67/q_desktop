import Option from "@/pages/reportFormsManage/liveData/option";
import Table from "@/pages/reportFormsManage/liveData/table";
import { Provider } from "@/pages/reportFormsManage/liveData/store";
import LiveDataDetailDrawer from "@/pages/LiveDataDetailDrawer";
import { useSelector } from "./store";

const LiveData = () => {
  const detailRef = useSelector((r) => r.detailRef);
  return (
    <div>
      <Option />
      <Table />
      <LiveDataDetailDrawer ref={detailRef} />
    </div>
  );
};

export default () => {
  return (
    <Provider>
      <LiveData />
    </Provider>
  );
};
