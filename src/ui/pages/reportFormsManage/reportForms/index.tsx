import { useEffect } from "react";
import { Provider, useSelector } from "./store";
import Tag from "./tag";

const ReportForms = () => {
  const { getDeptTree, getChannelType, getChannelGroup } = useSelector(
    (state) => state.logic
  );

  useEffect(() => {
    getDeptTree();
    getChannelType();
    getChannelGroup();
  }, []);

  return (
    <>
      <Tag />
    </>
  );
};

export default () => {
  return (
    <Provider>
      <ReportForms />
    </Provider>
  );
};
