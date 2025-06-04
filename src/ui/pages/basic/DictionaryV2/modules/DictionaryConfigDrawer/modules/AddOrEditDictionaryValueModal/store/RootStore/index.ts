import { IReqBaseV1SysDictValueSave } from "@/service/base/v1/sys-dict-value/save";
import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  PropsStore,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import { IAddOrEditDictionaryValueModalProps } from "../../interface";
import { Computed } from "./Computed";
import { IRefs, IRootStore, TLoadingStore } from "./interface";
import { Logic } from "./Logic";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  propsStore: PropsStore<IAddOrEditDictionaryValueModalProps>;
  refs: IRefs;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<IAddOrEditDictionaryValueModalProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const form = Form.useForm<Required<IReqBaseV1SysDictValueSave>>()[0];
  return useLocalObservable(
    () =>
      new RootStore({
        form,
      })
  );
});
