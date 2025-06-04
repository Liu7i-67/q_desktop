import TXAuthContainer from "@/components/TXAuthContainer";
import TXTreeSidebar from "@/components/TXTreeSidebar";
import { observer } from "@quarkunlimit/qu-mobx";
import { useEffect } from "react";
import { ChannelAuth } from "./auth";
import type { IChannelMangementProps } from "./interface";
import AddOrEditTypeModal from "./modules/AddOrEditTypeModal";
import EditModal from "./modules/EditModal";
import { SearchHeader } from "./modules/SearchHeader";
import { TableList } from "./modules/TableList";
import { Provider, useStore } from "./store/RootStore";

const ChannelMangement = observer(function ChannelMangement_(
  props: IChannelMangementProps
) {
  const root = useStore();
  const { logic, refs } = root;

  useEffect(() => {
    logic.getList();
  }, []);

  return (
    <TXAuthContainer auth={ChannelAuth.channelView}>
      <div className="flex">
        <TXTreeSidebar
          ref={refs.txTreeSidebarRef}
          type="channel"
          createPermission={ChannelAuth.channelTypeCreate}
          updatePermission={ChannelAuth.channelTypeUpdate}
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
          <SearchHeader />
          <TableList />
        </div>
      </div>
      <AddOrEditTypeModal
        ref={refs.addorEditModalRef}
        afterClose={() => {
          refs.txTreeSidebarRef.current?.getTreeData();
        }}
      />
      <EditModal ref={refs.editModalRef} afterClose={logic.getList} />
    </TXAuthContainer>
  );
});

export default observer(function ChannelMangementPage(
  props: IChannelMangementProps
) {
  return (
    <Provider>
      <ChannelMangement {...props} />
    </Provider>
  );
});

export * from "./interface";
