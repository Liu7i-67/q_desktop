import { useEffect } from "react";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import type { ITXSearchFormProps } from "./interface";
import { Provider, useStore } from "./store/RootStore";
import { Button, Form } from "antd";
import "./index.css";
import TXFormItemSettingModal from "./TXFormItemSettingModal";
import { FormContent } from "./modules/FormContent";
import { LineSearchBar, SearchBar } from "./modules/SearchBar";

const TXSearchForm = observer(function TXSearchForm_(
  props: ITXSearchFormProps
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { refs, logic } = root;
  const {
    onReset,
    className,
    onSearch,
    loading,
    formKey,
    columnSpan,
    children,
    onValuesChange,
    hideAction,
    ...reset
  } = props;

  useEffect(() => {
    if (
      !refs.contentRef.current ||
      !refs.barRef.current ||
      !refs.formBodyRef.current
    )
      return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newHeight = entry.contentRect.height;
        logic.changeHeight(newHeight);
      }
    });

    observer.observe(refs.contentRef.current);

    refs.formBodyRef.current?.addEventListener("scroll", () => {
      refs.formBodyRef.current!.scrollTop = 0;
    });

    return () => {
      observer.disconnect();
      refs.formBodyRef.current?.removeEventListener("scroll", () => {
        refs.formBodyRef.current!.scrollTop = 0;
      });
    };
  }, []);

  useEffect(() => {
    logic.getLocalSetting(formKey);
  }, [formKey]);

  return (
    <Form
      {...reset}
      className={`tx-search-form ${className || ""}`}
      form={props.form || refs.form}
      size={"middle"}
      onValuesChange={(c, a) => {
        onValuesChange?.(c, a);
        if (!hideAction) {
          return;
        }
        props.onSearch?.(a);
      }}
    >
      <div
        className={`tx-search-form-body ${logic.expand ? "expand" : ""}`}
        ref={refs.formBodyRef}
      >
        <div className="tx-search-form-content-wrapper flex-1 relative">
          <div
            className={"tx-search-form-content border-b-[1px] w-full"}
            ref={refs.contentRef}
          >
            <FormContent children={children} />
            <LineSearchBar />
          </div>
        </div>
        <SearchBar />
      </div>
      <TXFormItemSettingModal
        ref={refs.settingRef}
        afterSave={logic.afterChange}
      />
    </Form>
  );
});

export default observer(function TXSearchFormPage(props: ITXSearchFormProps) {
  return (
    <Provider>
      <TXSearchForm {...props} />
    </Provider>
  );
});

export * from "./interface";
export * from "./modules/TXSearchItemWrapper";
