import { IITXTreeSidebarRef } from "@/components/TXTreeSidebar/store/RootStore/interface";
import {
  createContainer,
  LoadingStore,
  makeAutoObservable,
  useLocalObservable,
} from "@quarkunlimit/qu-mobx";
import { Form } from "antd";
import { useRef } from "react";
import { IAddOrEditTypeModalRef } from "../../modules/AddOrEditTypeModal/interface";
import { IEditModalRef } from "../../modules/EditModal/interface";
import { Computed } from "./Computed";
import { IRefs, IRootStore, TLoadingStore } from "./interface";
import { Logic } from "./Logic";

export class RootStore implements IRootStore {
  logic: Logic;
  computed: Computed;
  loadingStore: TLoadingStore;
  refs: IRefs;
  constructor(refs: IRefs) {
    this.refs = refs;
    this.loadingStore = new LoadingStore();
    this.logic = new Logic(this);
    this.computed = new Computed(this);
    makeAutoObservable(this, { refs: false }, { autoBind: true });
  }
}

export const { Provider, useStore } = createContainer(() => {
  const form = Form.useForm()[0];
  const addOrEditTypeModalRef = useRef<IAddOrEditTypeModalRef>(null);
  const txTreeSidebarRef = useRef<IITXTreeSidebarRef>(null);
  const editModalRef = useRef<IEditModalRef>(null);
  return useLocalObservable(
    () =>
      new RootStore({
        form,
        addOrEditTypeModalRef,
        txTreeSidebarRef,
        editModalRef,
      })
  );
});
