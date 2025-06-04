import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  PropsStore,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { IRootStore, TLoadingStore, IRefs } from "./interface";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IFollowUpTodayProps } from "../../interface";
import { useRef } from "react";
import { ICustomerDrawerRef } from "@/pages/CustomerDrawer/interface";
import { Form } from "antd";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<IFollowUpTodayProps>;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<IFollowUpTodayProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const customerRef = useRef<ICustomerDrawerRef>(null);
  const [searchForm] = Form.useForm();
  return useLocalObservable(() => new RootStore({ customerRef, searchForm }));
});
