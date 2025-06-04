import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  PropsStore,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import { IAddOrEditDictModalProps } from "../../interface";
import { Computed } from "./Computed";
import {
  IAddOrEditDictModalForm,
  IRefs,
  IRootStore,
  TLoadingStore,
} from "./interface";
import { Logic } from "./Logic";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  propsStore: PropsStore<IAddOrEditDictModalProps>;
  refs: IRefs;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<IAddOrEditDictModalProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const form = Form.useForm<IAddOrEditDictModalForm>()[0];
  return useLocalObservable(
    () =>
      new RootStore({
        form,
      })
  );
});
