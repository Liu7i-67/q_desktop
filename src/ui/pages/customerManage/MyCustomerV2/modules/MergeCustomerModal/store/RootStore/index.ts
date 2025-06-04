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
import { IMergeCustomerModalProps } from "../../interface";
import { Form } from "antd";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  propsStore: PropsStore<IMergeCustomerModalProps>;
  refs: IRefs;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<IMergeCustomerModalProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const [mergeSearchForm] = Form.useForm();
  return useLocalObservable(
    () =>
      new RootStore({
        mergeSearchForm,
      })
  );
});
