import { cn } from "@/utils/tools";
import { Provider } from "@/pages/login/store";
import Form from "@/pages/login/form";

const Login = () => {
  return (
    <div
      className={cn(
        "w-[100vw] h-[100vh] bg-gray-100",
        "flex justify-center items-center"
      )}
    >
      <div className={cn("bg-white shadow-md rounded-xl", "p-16")}>
        <Form />
      </div>
    </div>
  );
};

export default () => {
  return (
    <Provider>
      <Login />
    </Provider>
  );
};
