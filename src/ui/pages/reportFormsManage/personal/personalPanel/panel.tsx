import TXExplainQuestionTooltip from "@/components/TXExplainQuestionTooltip";
import { Card, Col, Row, Spin, Statistic } from "antd";
import { useSelector } from "../store";

const Panel = () => {
  const { panelData } = useSelector((state) => state.state);
  const { runGetPanelData } = useSelector((x) => x.api);

  return (
    <Spin spinning={runGetPanelData.loading}>
      <div className="p-4 h-[calc(100vh-300px)] overflow-y-auto">
        {/* 业绩相关指标 */}
        <Card title="业绩指标" style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]}>
            <Col span={4}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="当期确认业绩"
                    toolTipTitle="统计当前登录人在指定时间范围内创建或参与协作，成交状态是已确认的成交，按照合作比率分配的确认金额"
                  />
                }
                value={panelData.gmvOfConfirm}
                precision={2}
                prefix="¥"
              />
            </Col>
            <Col span={4}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="当期上报业绩"
                    toolTipTitle="统计当前登录人在指定时间范围内创建或参与协作，成交状态不是已作废的成交，按照合作比率分配的成交金额"
                  />
                }
                value={panelData.gmvOfCreate}
                precision={2}
                prefix="¥"
              />
            </Col>
            <Col span={4}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="当期成交单量"
                    toolTipTitle="统计当前登录人在指定时间范围内创建或参与协作，成交状态不是已作废的成交数量"
                  />
                }
                value={panelData.numberOfBillingDeal}
              />
            </Col>
            <Col span={4}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="当期客单价"
                    toolTipTitle="当期上报业绩 / 当期成交单量"
                  />
                }
                value={
                  (panelData.gmvOfCreate ?? 0) /
                  (panelData.numberOfBillingDeal &&
                  panelData.numberOfBillingDeal !== "0"
                    ? Number(panelData.numberOfBillingDeal)
                    : 1)
                }
                precision={2}
                prefix="¥"
              />
            </Col>
            <Col span={4}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="当期派单人次"
                    toolTipTitle="统计当前登录人在指定时间范围内创建的派单数量"
                  />
                }
                value={panelData?.timesOfCustomerDispatch}
              />
            </Col>
            <Col span={4}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="当期派单人数"
                    toolTipTitle="统计当期登录人所在部门的员工在指定时间范围内派单派出的客户数量"
                  />
                }
                value={panelData.numberOfCustomerDispatch}
              />
            </Col>
          </Row>
        </Card>

        {/* 客户相关指标 */}
        <Card title="客户指标" style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="客户总数"
                    toolTipTitle="统计归属人是当前登录人的客户总数"
                  />
                }
                value={panelData?.totalNumberOfCustomer}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="当期客户数"
                    toolTipTitle="统计在指定时间范围内创建，归属人是当前登录人的客户数量"
                  />
                }
                value={panelData?.numberOfCurrentCustomer}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="当期无效客户数"
                    toolTipTitle="统计在指定时间范围内创建，归属人是当前登录人，目前客户类型是无效客户的客户数量"
                  />
                }
                value={panelData?.numberOfCurrentCustomerInvalid}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="当期协作客户数"
                    toolTipTitle="统计在指定时间范围内创建，目前客户的协作人有当前登录人的客户数量"
                  />
                }
                value={panelData?.numberOfCurrentCustomerCollaborate}
              />
            </Col>
          </Row>
        </Card>

        {/* 微信相关指标 */}
        <Card title="微信指标" style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="微信通过客户总数"
                    toolTipTitle="统计归属人是当前登录人，目前微信通过状态为已通过的客户总数"
                  />
                }
                value={panelData?.totalNumberOfCustomerWechatPass}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="当期微信通过客户数"
                    toolTipTitle="统计在指定时间范围内创建，归属人是当前登录人，目前微信通过状态为已通过的客户数量"
                  />
                }
                value={panelData?.numberOfCurrentCustomerWechatPass}
              />
            </Col>
          </Row>
        </Card>

        {/* 线索相关指标 */}
        {/* <Card title="线索指标" style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="线索总数"
                    toolTipTitle="统计分配给当前登录人的客户线索总数"
                  />
                }
                value={panelData?.totalNumberOfCustomerLeads}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="当期线索数"
                    toolTipTitle="统计在指定时间内分配，分配给当前登录人的客户数量"
                  />
                }
                value={panelData?.numberOfCurrentCustomerLeads}
              />
            </Col>
          </Row>
        </Card> */}

        {/* 跟进相关指标 */}
        <Card title="跟进指标">
          <Row gutter={[16, 16]}>
            {/* <Col span={6}>
            <Statistic
              title='客户跟进数量'
              value={panelData?.numberOfPeopleFollow}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title='目标跟进数量'
              value={panelData?.numberOfPeopleTargetFollow}
            />
          </Col> */}
            <Col span={12}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="当期待跟进客户数"
                    toolTipTitle="统计在指定时间范围内创建，归属人是当前登录人，目前没有客户跟进的客户数量"
                  />
                }
                value={panelData?.numberOfCurrentCustomerWaitFollow}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title={
                  <TXExplainQuestionTooltip
                    title="当期已跟进客户数"
                    toolTipTitle="统计在指定时间范围内创建，归属人是当前登录人，目前已有客户跟进的客户数量"
                  />
                }
                value={panelData?.numberOfCurrentCustomerFollowFinish}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </Spin>
  );
};

export default Panel;
