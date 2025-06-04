import { Provider } from "./store";
import XhsWorkforceTabs from "./tab";

const XhsWorkforce = () => {
  return <XhsWorkforceTabs />;
};

export default () => {
  return (
    <Provider>
      <XhsWorkforce />
    </Provider>
  );
};
