import { Provider } from "./store";
import Tag from "./tag";

const Team = () => {
  return (
    <>
      <Tag />
    </>
  );
};

export default () => {
  return (
    <Provider>
      <Team />
    </Provider>
  );
};
