import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  PropsStore,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import { IFollowUpModalProps } from "../../interface";
import { Computed } from "./Computed";
import { IRefs, IRootStore, ISearchInfo, TLoadingStore } from "./interface";
import { Logic } from "./Logic";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<IFollowUpModalProps>;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const followUpForm = Form.useForm<ISearchInfo>()[0];
  return useLocalObservable(
    () =>
      new RootStore({
        followUpForm,
      })
  );
});
