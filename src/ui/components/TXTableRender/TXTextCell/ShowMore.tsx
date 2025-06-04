import { Tooltip } from "antd";
import { Content } from "./Content";
export interface IShowMoreProps {
  /** @param 字符串 */
  text?: string | number;
  showMore: boolean;
  /** @param 展示几行 默认为1行 */
  row?: number;
}

export const ShowMore = function ShowMore_(props: IShowMoreProps) {
  const { text = "", showMore = false, row = 1 } = props;

  if (!showMore) {
    return <Content text={text} />;
  }

  return (
    <Tooltip
      title={
        <div className="max-w-[400px] max-h-[400px] overflow-y-auto">
          <Content text={text} />
        </div>
      }
    >
      <div className={`wes-${row}`}>
        <Content text={text} />
      </div>
    </Tooltip>
  );
};
