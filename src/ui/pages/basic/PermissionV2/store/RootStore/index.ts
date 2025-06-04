import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable,
  PropsStore,
} from "@quarkunlimit/qu-mobx";
import { IPermissionV2Props } from "../../interface";
import { IRootStore, TLoadingStore, IRefs } from "./interface";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { Form } from "antd";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<IPermissionV2Props>;
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
  const [searchForm] = Form.useForm();
  return useLocalObservable(
    () =>
      new RootStore({
        searchForm,
      })
  );
});
