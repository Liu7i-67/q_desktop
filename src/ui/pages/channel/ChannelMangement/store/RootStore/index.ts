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
import { IRefs, IRootStore, ISearchInfo, TLoadingStore } from "./interface";
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
  const txTreeSidebarRef = useRef<IITXTreeSidebarRef>(null);
  const addorEditModalRef = useRef<IAddOrEditTypeModalRef>(null);
  const editModalRef = useRef<IEditModalRef>(null);
  const form = Form.useForm<ISearchInfo>()[0];
  return useLocalObservable(
    () =>
      new RootStore({
        txTreeSidebarRef,
        addorEditModalRef,
        editModalRef,
        form,
      })
  );
});
