import { Descriptions, DescriptionsProps } from "antd";
import { useSelector } from "../store";
import { Tag } from "antd";
import { handleDecimalPrecision } from "@/utils/tools";

const Description = () => {
  const { descriptionData } = useSelector((x) => x.state);
  console.log(descriptionData);
  const items: DescriptionsProps["items"] = [
    {
      key: "phoneNumber",
      label: "成交客户电话",
      children: descriptionData?.phoneNumber?.join(", "),
    },
    {
      key: "wechatNumber",
      label: "成交客户微信",
      children: descriptionData?.wechatNumber || "-",
    },
    {
      key: "dealDate",
      label: "成交时间",
      children: descriptionData?.dealDate,
    },
    {
      key: "orgName",
      label: "成交机构",
      children: descriptionData?.orgName || "-",
    },
    // 成交项目和金额可能有多组，需要动态生成
    ...(descriptionData?.dealItemDTOList || [])
      .map((item: any, index: number) => [
        {
          key: `dataName${index + 1}`,
          label: `成交项目${index + 1}`,
          children: item.dataName,
        },
        {
          key: `amount${index + 1}`,
          label: `上报成交金额${index + 1}`,
          children: item.amount + "元",
        },
      ])
      .flat(),

    {
      key: "createUserName",
      label: "提交员工",
      children: descriptionData?.createUserName || "-",
    },
    {
      key: "createTime",
      label: "提交时间",
      children: descriptionData?.createTime,
    },
    {
      key: "dealStatus",
      label: "交易状态",
      children: (
        <Tag
          color={
            {
              UN_CONFIRMED: "warning",
              CONFIRMED: "success",
              CANCELED: "error",
            }[
              descriptionData?.dealStatus as
                | "UN_CONFIRMED"
                | "CONFIRMED"
                | "CANCELED"
            ]
          }
        >
          {{
            UN_CONFIRMED: "待确认",
            CONFIRMED: "已确认",
            CANCELED: "已作废",
          }[
            descriptionData?.dealStatus as
              | "UN_CONFIRMED"
              | "CONFIRMED"
              | "CANCELED"
          ] || "-"}
        </Tag>
      ),
    },
    {
      key: "confirmAmount",
      label: "确认成交金额",
      children: descriptionData?.dealItemDTOList ? (
        <Tag bordered={false} color="red">
          {handleDecimalPrecision(
            descriptionData.dealItemDTOList.reduce(
              (total: number, item: any) => total + (item.amount || 0),
              0
            )
          ) + "元"}
        </Tag>
      ) : (
        "-"
      ),
    },
    {
      key: "memo",
      label: "上报成交备注",
      children: descriptionData?.memo || "-",
    },
  ];
  return (
    <Descriptions
      column={2}
      bordered
      items={items}
      labelStyle={{ width: "150px" }}
      contentStyle={{ minWidth: "300px" }}
    />
  );
};

export default Description;
