import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  PropsStore,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { IRootStore, TLoadingStore, IRefs, ISearchInfo } from "./interface";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { IFollowUpRecordLineProps } from "../../interface";
import { Form } from "antd";
import { useRef } from "react";
import { ITaskSettingCheckModalRef } from "@/pages/CustomerDrawer/TaskSettingCheckModal/interface";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<IFollowUpRecordLineProps>;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<IFollowUpRecordLineProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const followUpForm = Form.useForm<ISearchInfo>()[0];
  const checkRef = useRef<ITaskSettingCheckModalRef>(null);
  return useLocalObservable(() => new RootStore({ followUpForm, checkRef }));
});
