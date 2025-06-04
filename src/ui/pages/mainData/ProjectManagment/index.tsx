import TXAuthContainer from "@/components/TXAuthContainer";
import TXTreeSidebar from "@/components/TXTreeSidebar";
import { observer } from "@quarkunlimit/qu-mobx";
import { ProjectManagementAuth } from "./auth";
import type { IProjectManagment } from "./interface";
import AddOrEditTypeModal from "./modules/AddOrEditTypeModal";
import EditModal from "./modules/EditModal";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import { Provider, useStore } from "./store/RootStore";

const ProjectManagment = observer(function ProjectManagment_(
  props: IProjectManagment
) {
  const root = useStore();
  const { refs, logic } = root;

  return (
    <TXAuthContainer auth={ProjectManagementAuth.projectView}>
      <div className="flex">
        <TXTreeSidebar
          ref={refs.txTreeSidebarRef}
          type="mainData"
          createPermission={ProjectManagementAuth.projectTypeCreate}
          updatePermission={ProjectManagementAuth.projectTypeUpdate}
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

export default observer(function ProjectManagmentPage(
  props: IProjectManagment
) {
  return (
    <Provider>
      <ProjectManagment {...props} />
    </Provider>
  );
});

export * from "./interface";
