import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable,
  PropsStore,
} from "@quarkunlimit/qu-mobx";
import { IPlatformManageV2Props } from "../../interface";
import { IRootStore, TLoadingStore, IRefs } from "./interface";
import { Logic } from "./Logic";
import { Computed } from "./Computed";
import { Form } from "antd";
import { useRef } from "react";
import { IEditModalRef } from "../../modules/EditModal/interface";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  propsStore: PropsStore<IPlatformManageV2Props>;
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
  const editRef = useRef<IEditModalRef>(null);

  return useLocalObservable(
    () =>
      new RootStore({
        searchForm,
        editRef,
      })
  );
});
