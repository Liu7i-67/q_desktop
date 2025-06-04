import { Provider } from "./store";
import Tag from "./tag";

const Personal = () => {
  return (
    <>
      <Tag />
    </>
  );
};

export default () => {
  return (
    <Provider>
      <Personal />
    </Provider>
  );
};
