import { Select } from "antd";
import { FC } from "react";
import type {
  ITXSearchSelectProps,
  IUseMountFetchDataProps,
} from "../interface";
import { useSearchSelectFetch } from "../hook";

export interface ITXSearchUserSelectProps extends ITXSearchSelectProps {
  /** @param 是否允许选择禁用员工 */
  allowDisabed?: boolean;
  /** @param 传递给hook的额外参数 */
  extraHookProps?: Partial<IUseMountFetchDataProps>;
}

const TXSearchUserSelect: FC<ITXSearchUserSelectProps> = (props) => {
  const { allowDisabed, extraHookProps = {}, ...reset } = props;
  const userSearch = useSearchSelectFetch({
    fetchDataApi: "/api/base/v1/sys-user/get-page",
    searchParamKey: "userName",
    transformOptions: (data) =>
      data.map((item) => ({
        label: item.userName,
        value: item.id,
        disabled: allowDisabed ? false : item.enableFlag === false,
        enableFlag: item.enableFlag,
        phoneNumber: item.phoneNumber,
      })),
    ...extraHookProps,
  });

  return (
    <Select
      defaultActiveFirstOption={false}
      filterOption={false}
      showSearch
      allowClear
      maxTagCount={1}
      maxTagTextLength={6}
      optionRender={(option) => {
        return (
          <div>
            <div className="wes">
              <i className="mr-1 iconfont icon-lianxiren1"></i>
              {option.data.enableFlag === false && (
                <i className="text-[red] mr-1 iconfont icon-jinyong"></i>
              )}
              {option.label}
            </div>
            <div className="wes">
              <i className="mr-1 iconfont icon-dianhua"></i>
              <span className="text-gray-400">{option.data.phoneNumber}</span>
            </div>
            {option.data.tips && (
              <div className="wes">
                <i className="mr-1 iconfont icon-neirong"></i>
                <span className="text-gray-400">{option.data.tips}</span>
              </div>
            )}
          </div>
        );
      }}
      {...reset}
      {...userSearch}
    />
  );
};

export default TXSearchUserSelect;
