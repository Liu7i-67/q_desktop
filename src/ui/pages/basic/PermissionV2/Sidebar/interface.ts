export interface ISidebarProps {
  /** @param 选中的方法 (默认返回第一个id)*/
  onCheck: (id: string, type: "ROLE" | "USER") => void;
}
