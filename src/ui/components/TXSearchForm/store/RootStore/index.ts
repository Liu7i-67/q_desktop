import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable,
  PropsStore,
} from "@quarkunlimit/qu-mobx";
import { IRootStore, TLoadingStore, IRefs } from "./interface";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { ITXSearchFormProps } from "../../interface";
import { useRef } from "react";
import { Form } from "antd";
import { ITXFormItemSettingModalRef } from "../../TXFormItemSettingModal/interface";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<ITXSearchFormProps>;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<ITXSearchFormProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const contentRef = useRef<HTMLDivElement>(null);
  const formBodyRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const settingRef = useRef<ITXFormItemSettingModalRef>(null);
  const [form] = Form.useForm();
  return useLocalObservable(
    () => new RootStore({ contentRef, form, formBodyRef, settingRef, barRef })
  );
});
