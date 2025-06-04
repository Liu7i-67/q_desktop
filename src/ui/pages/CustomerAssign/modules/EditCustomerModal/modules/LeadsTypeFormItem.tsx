import TXSearchSelect, {
  useSearchSelectFetch,
} from "@/components/TXSearchSelect";
import { observer } from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import { useStore } from "../store/RootStore";

export interface ILeadsTypeFormItemPropsValue {
  leadsTypeValue?: string;
  channelId?: string;
  liveStreamerId?: string;
  platformId?: string;
}

export interface ILeadsTypeFormItemProps {
  value?: ILeadsTypeFormItemPropsValue;
  onChange?: (value?: Partial<ILeadsTypeFormItemPropsValue>) => void;
}

const LeadsTypeFormItem = observer(function LeadsTypeFormItem(
  props: ILeadsTypeFormItemProps
) {
  const root = useStore();
  const { logic, refs } = root;
  const { channelId, liveStreamerId, platformId } = props.value ?? {};
  const leadsType = Form.useWatch("leadsType", refs.editForm);

  const channelProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/channel/get-page",
    searchParamKey: "channelName",
    initFetch: false,
    refreshFetch: logic.open,
    transformOptions: (data) =>
      data.map((item) => ({ label: item.channelName, value: item.id })),
  });

  const streamerProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/live-streamer/get-page",
    searchParamKey: "streamerName",
    initFetch: false,
    refreshFetch: logic.open,
    transformOptions: (data) =>
      data.map((item) => ({ label: item.streamerName, value: item.id })),
  });

  const platFormProps = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/platform/get-page",
    searchParamKey: "platformName",
    initFetch: false,
    refreshFetch: logic.open && leadsType === "ECOMMERCE",
    transformOptions: (data) =>
      data.map((item) => ({ label: item.platformName, value: item.id })),
  });

  return (
    <>
      {leadsType === "PLACE" && (
        <Form.Item
          name="channelId"
          label="渠道"
          rules={[{ required: true, message: "请选择渠道" }]}
        >
          <TXSearchSelect
            {...channelProps}
            value={channelId}
            labelInValue
            placeholder="请选择渠道"
            onChange={(value) => {
              props.onChange?.({
                channelId: value,
              });
            }}
          />
        </Form.Item>
      )}
      {leadsType === "ECOMMERCE" && (
        <>
          <Form.Item
            name="liveStreamerId"
            label="主播"
            rules={[{ required: true, message: "请选择主播" }]}
          >
            <TXSearchSelect
              {...streamerProps}
              labelInValue
              value={liveStreamerId}
              placeholder="请选择主播"
              onChange={(value) => {
                props.onChange?.({
                  liveStreamerId: value,
                });
              }}
            />
          </Form.Item>
          <Form.Item
            name="platformId"
            label="平台"
            rules={[{ required: true, message: "请选择平台" }]}
          >
            <TXSearchSelect
              labelInValue
              {...platFormProps}
              value={platformId}
              placeholder="请选择平台"
              onChange={(value) => {
                props.onChange?.({
                  platformId: value,
                });
              }}
            />
          </Form.Item>
        </>
      )}
    </>
  );
});

export default LeadsTypeFormItem;
