import TXAuthContainer from "@/components/TXAuthContainer";
import TXTreeSidebar from "@/components/TXTreeSidebar";
import { observer, useSyncProps } from "@quarkunlimit/qu-mobx";
import { DepartmentAuth } from "./auth";
import type { IDepartmentV2Props } from "./interface";
import AddOrEditTypeModal from "./modules/AddOrEditTypeModal";
import Descriptions from "./modules/Descriptions";
import { Provider, useStore } from "./store/RootStore";

const DepartmentV2 = observer(function DepartmentV2_(
  props: IDepartmentV2Props
) {
  const root = useStore();
  useSyncProps(root, Object.keys(props), props);
  const { logic, refs } = root;

  return (
    <TXAuthContainer auth={DepartmentAuth.deptView}>
      <div className="flex">
        <TXTreeSidebar
          ref={refs.txTreeSidebarRef}
          type="dept"
          createPermission={DepartmentAuth.deptCreate}
          updatePermission={DepartmentAuth.deptUpdate}
          onCreate={(param) => {
            refs.addorEditModalRef.current?.openModal(param);
          }}
          onUpdate={(param) => {
            refs.addorEditModalRef.current?.openModal(param);
          }}
          onSelect={(selectedKeys) => {
            logic.onSelectTreeNode(selectedKeys as string[]);
          }}
        />
        <div className={"w-[calc(100%-310px)]"}>
          <Descriptions />
        </div>
      </div>
      <AddOrEditTypeModal
        ref={refs.addorEditModalRef}
        afterClose={() => {
          refs.txTreeSidebarRef.current?.getTreeData();
        }}
      />
    </TXAuthContainer>
  );
});

export default observer(function DepartmentV2Page(props: IDepartmentV2Props) {
  return (
    <Provider>
      <DepartmentV2 {...props} />
    </Provider>
  );
});

export * from "./interface";
