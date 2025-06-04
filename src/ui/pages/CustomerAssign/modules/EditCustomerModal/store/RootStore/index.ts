import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  PropsStore,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import { IEditCustomerModalProps } from "../../interface";
import { Computed } from "./Computed";
import { IRefs, IRootStore, TLoadingStore } from "./interface";
import { Logic } from "./Logic";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  propsStore: PropsStore<IEditCustomerModalProps>;
  refs: IRefs;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<IEditCustomerModalProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const editForm = Form.useForm()[0];
  return useLocalObservable(
    () =>
      new RootStore({
        editForm,
      })
  );
});
