import { ITXTreeCascaderRef } from "@/components/TXTreeCascader/interface";
import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  PropsStore,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import { useRef } from "react";
import { IStepFormProps } from "../../interface";
import { Computed } from "./Computed";
import { IRefs, IRootStore, TLoadingStore } from "./interface";
import { Logic } from "./Logic";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  propsStore: PropsStore<IStepFormProps>;
  refs: IRefs;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.propsStore = new PropsStore<IStepFormProps>();
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const steopOneForm = Form.useForm()[0];
  const steopTwoForm = Form.useForm()[0];
  const txTreeCascaderRef = useRef<ITXTreeCascaderRef>(null);
  return useLocalObservable(
    () =>
      new RootStore({
        steopOneForm,
        steopTwoForm,
        txTreeCascaderRef,
      })
  );
});
