import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  PropsStore,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import { useRef } from "react";
import { IEmployeeV2Props } from "../../interface";
import { IEditEmployeeModalRef } from "../../modules/EditEmployeeModal/interface";
import { IRestPasswordInfoModalRef } from "../../modules/RestPasswordInfoModal/interface";
import { Computed } from "./Computed";
import { IRefs, IRootStore, TLoadingStore } from "./interface";
import { Logic } from "./Logic";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<IEmployeeV2Props>;
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
  const editEmployeeModalRef = useRef<IEditEmployeeModalRef>(null);
  const resetPasswordInfoRef = useRef<IRestPasswordInfoModalRef>(null);
  return useLocalObservable(
    () =>
      new RootStore({
        form,
        editEmployeeModalRef,
        resetPasswordInfoRef,
      })
  );
});
