import { observer, useSyncProps, useWhen } from "@quarkunlimit/qu-mobx";
import { Provider, useStore } from "./store/RootStore";
import { ISidebarProps } from "./interface";
import SearchHeader from "./modules/SearchHeader";
import SidebarList from "./modules/SidebarList";

const Sidebar = observer(function Sidebar_(props: ISidebarProps) {
  const root = useStore();
  const { logic } = root;
  useSyncProps(root, Object.keys(props), props);

  useWhen(
    () => true,
    () => logic.getList()
  );

  return (
    <div className="p-2">
      <SearchHeader />
      <SidebarList />
    </div>
  );
});

export default observer(function SidebarPage(props: ISidebarProps) {
  return (
    <Provider>
      <Sidebar {...props} />
    </Provider>
  );
});
