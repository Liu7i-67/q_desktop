import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  PropsStore,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import { useRef } from "react";
import { IDictionaryV2Props } from "../../interface";
import { IAddOrEditDictModalRef } from "../../modules/AddOrEditDictModal/interface";
import { IDictionaryConfigDrawerRef } from "../../modules/DictionaryConfigDrawer/interface";
import { Computed } from "./Computed";
import { IRefs, IRootStore, TLoadingStore } from "./interface";
import { Logic } from "./Logic";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<IDictionaryV2Props>;
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
  const form = Form.useForm()[0];
  const addOrEditDictModalRef = useRef<IAddOrEditDictModalRef>(null);
  const dictionaryConfigDrawerRef = useRef<IDictionaryConfigDrawerRef>(null);
  return useLocalObservable(
    () =>
      new RootStore({
        form,
        addOrEditDictModalRef,
        dictionaryConfigDrawerRef,
      })
  );
});
