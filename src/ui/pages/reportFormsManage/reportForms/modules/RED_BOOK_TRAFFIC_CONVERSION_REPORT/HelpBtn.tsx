import { Button } from "antd";

export const HelpBtn = function HelpBtn_() {
  return (
    <Button
      onClick={() => {
        window.open(
          "https://doc.weixin.qq.com/sheet/e3_Ab0APwZoAFcCNc0qYM4ipRxi58gAO?scode=ADEAfwdSAA0Vwcja28Ab0APwZoAFc&tab=BB08J2"
        );
      }}
    >
      查看报表字段统计逻辑
    </Button>
  );
};
