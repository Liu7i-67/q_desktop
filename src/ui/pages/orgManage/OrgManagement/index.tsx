import TXAuthContainer from "@/components/TXAuthContainer";
import TXTreeSidebar from "@/components/TXTreeSidebar";
import { observer, useWhen } from "@quarkunlimit/qu-mobx";
import { OrganizationAuth } from "./auth";
import type { IOrgManagementProps } from "./interface";
import AddOrEditTypeModal from "./modules/AddOrEditTypeModal";
import EditModal from "./modules/EditModal";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import { Provider, useStore } from "./store/RootStore";

const OrgManagement = observer(function OrgManagement_(
  props: IOrgManagementProps
) {
  const root = useStore();
  const { refs, logic } = root;

  useWhen(
    () => true,
    () => {
      logic.initCityTree();
    }
  );

  return (
    <TXAuthContainer auth={OrganizationAuth.organizationView}>
      <div className="flex">
        <TXTreeSidebar
          ref={refs.txTreeSidebarRef}
          type="org"
          createPermission={OrganizationAuth.organizationTypeCreate}
          updatePermission={OrganizationAuth.organizationTypeUpdate}
          deletePermission={OrganizationAuth.organizationTypeDelete}
          onCreate={(param) => {
            refs.addOrEditTypeModalRef.current?.openModal(param);
          }}
          onUpdate={(param) => {
            refs.addOrEditTypeModalRef.current?.openModal(param);
          }}
          onSelect={(selectedKeys) => {
            logic.onSelectTreeNode(selectedKeys as string[]);
          }}
        />
        <div className={"w-[calc(100%-310px)]"}>
          <SearchHeader />
          <TableList />
        </div>
      </div>
      <AddOrEditTypeModal
        ref={refs.addOrEditTypeModalRef}
        afterClose={() => {
          refs.txTreeSidebarRef.current?.getTreeData();
        }}
      />
      <EditModal ref={refs.editModalRef} afterClose={logic.getList} />
    </TXAuthContainer>
  );
});

export default observer(function OrgManagementPage(props: IOrgManagementProps) {
  return (
    <Provider>
      <OrgManagement {...props} />
    </Provider>
  );
});

export * from "./interface";
