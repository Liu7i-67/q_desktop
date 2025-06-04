import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { Drawer } from "@/components/TXDrawer";
import { ICustomerDrawerProps, ICustomerDrawerRef } from "./interface";
import { forwardRef, Suspense, useImperativeHandle } from "react";
import { Tabs } from "antd";
import "./index.css";
import { Header } from "./modules/Header";
import React from "react";

const BaseInfo = React.lazy(() => import("./BaseInfo"));
const OrderDispatchRecord = React.lazy(() => import("./OrderDispatchRecord"));
const TransactionRecord = React.lazy(() => import("./TransactionRecord"));
const FollowUpRecordLine = React.lazy(() => import("./FollowUpRecordLine"));
const CustomerRecord = React.lazy(() => import("./CustomerRecord"));
const VisitRecord = React.lazy(() => import("./VisitRecord"));
const OrganizationRecord = React.lazy(() => import("./OrganizationRecord"));

const CustomerDrawer = observer(
  forwardRef<ICustomerDrawerRef, ICustomerDrawerProps>(
    function CustomerDrawer_(props, ref) {
      const root = useStore();
      useSyncProps(root, Object.keys(props), props);
      const { logic } = root;

      useImperativeHandle(ref, () => {
        return {
          openDrawer: logic.openDrawer,
          closeDrawer: logic.closeDrawer,
        };
      });

      return (
        <Drawer
          open={logic.open}
          width={1200}
          destroyOnClose
          title={<Header />}
          onClose={logic.closeDrawer}
          className="tx-customer-drawer"
          styles={{
            body: {
              padding: "8px 0px 0px 0",
              display: "flex",
              flexDirection: "column",
            },
            header: {
              borderBottom: "none",
              padding: 0,
            },
          }}
        >
          <Tabs
            items={logic.tabs}
            type="card"
            activeKey={logic.activeKey}
            // @ts-ignore
            onChange={logic.changeActiveKey}
            tabBarStyle={{
              marginBottom: 0,
            }}
          />
          <div className="flex-1 overflow-y-auto p-[8px]">
            <Suspense fallback="页面加载中...">
              {logic.renderSet.has("BASE_INFO") && (
                <BaseInfo
                  show={logic.activeKey === "BASE_INFO"}
                  detail={logic.detail}
                />
              )}
              {logic.renderSet.has("DISPATCH_RECORD") && (
                <OrderDispatchRecord
                  show={logic.activeKey === "DISPATCH_RECORD"}
                  detail={logic.detail}
                />
              )}
              {logic.renderSet.has("TRANSACTION_RECORD") && (
                <TransactionRecord
                  show={logic.activeKey === "TRANSACTION_RECORD"}
                  detail={logic.detail}
                />
              )}
              {logic.renderSet.has("FOLLOW_UP_RECORD") && (
                <FollowUpRecordLine
                  show={logic.activeKey === "FOLLOW_UP_RECORD"}
                  detail={logic.detail}
                />
              )}
              {logic.renderSet.has("CUSTOMER_RECORD") && (
                <CustomerRecord
                  show={logic.activeKey === "CUSTOMER_RECORD"}
                  detail={logic.detail}
                />
              )}
              {logic.renderSet.has("VISIT_RECORD") && (
                <VisitRecord
                  show={logic.activeKey === "VISIT_RECORD"}
                  detail={logic.detail}
                />
              )}
              {logic.renderSet.has("ORGANIZATION_RECORD") && (
                <OrganizationRecord
                  show={logic.activeKey === "ORGANIZATION_RECORD"}
                  detail={logic.detail}
                />
              )}
            </Suspense>
          </div>
        </Drawer>
      );
    }
  )
);

export default observer(
  forwardRef<ICustomerDrawerRef, ICustomerDrawerProps>(
    function CustomerDrawerPage(props, ref) {
      return (
        <Provider>
          <CustomerDrawer {...props} ref={ref} />
        </Provider>
      );
    }
  )
);
