import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { EUserType } from "@/utils/user-helper/interface";
import { observer } from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import { ReactNode } from "react";
import { useStore } from "../store/RootStore";

export interface IOrgSelectProps {
  value?: { value: string; label: ReactNode };
  onChange?: (value: { value: string; label: ReactNode }) => void;
}

const OrgSelect = observer(function OrgSelect_(props: IOrgSelectProps) {
  const { value, onChange } = props;
  const root = useStore();
  const { logic, refs } = root;

  const currentUserType = Form.useWatch("userType", refs.addForm);

  const orgListProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/organization/get-page",
    searchParamKey: "orgName",
    request: {
      enableFlag: true,
    },
    transformOptions: (data) =>
      data.map((item) => ({
        label: item.orgName,
        value: item.id,
      })),
    initFetch: false,
    refreshFetch: logic.open && currentUserType === EUserType.ORG,
  });

  if (currentUserType !== EUserType.ORG) return null;

  return (
    <Form.Item
      label={"关联机构："}
      name="orgName"
      key="orgName"
      rules={[{ required: true, message: "关联机构为必选项" }]}
    >
      <TXSearchSelect
        {...orgListProps}
        value={value}
        onChange={onChange}
        labelInValue
        placeholder="请选择机构"
      />
    </Form.Item>
  );
});

export default OrgSelect;
