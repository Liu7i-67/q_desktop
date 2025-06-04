import { Password, Tenant, UserName } from "@/pages/login/svg";
import { Button, Checkbox, Form as AntdForm, Input, Select } from "antd";
import { useSelector } from "@/pages/login/store";
import { useMount } from "@quarkunlimit/react-hooks";

const Form = () => {
  const { login } = useSelector((x) => x.logic);
  const { runLogin } = useSelector((x) => x.api);

  const FormItem = AntdForm.Item;
  const form = useSelector((x) => x.form);
  return (
    <AntdForm
      form={form}
      layout={"vertical"}
      className={"w-[320px] select-none"}
    >
      <FormItem
        rules={[
          {
            required: true,
            message: "请输入账号",
          },
        ]}
        label={
          <div className={"flex items-center"}>
            <UserName />
            <p className={"ml-1"}>账号：</p>
          </div>
        }
        name={"userAccount"}
        key={"userAccount"}
      >
        <Input onPressEnter={login} />
      </FormItem>
      <FormItem
        rules={[
          {
            required: true,
            message: "请输入密码",
          },
        ]}
        label={
          <div className={"flex items-center"}>
            <Password />
            <p className={"ml-1"}>密码：</p>
          </div>
        }
        name={"password"}
        key={"password"}
      >
        <Input.Password onPressEnter={login} />
      </FormItem>
      {/* <FormItem
        rules={[{
          required: true,
          message: '请选择登录企业',
        }]}
        label={
          <div className={'flex items-center'}>
            <Tenant />
            <p className={'ml-1'}>企业：</p>
          </div>
        }
        name={'tenant_id'}
        key={'tenant_id'}
      >
        <Select
          options={[
            { label: '讨喜', value: 0 },
            { label: '清颜', value: 1 },
          ]}
        />
      </FormItem> */}
      <FormItem name={"is_remember"} key={"is_remember"}>
        <Checkbox>记住我</Checkbox>
      </FormItem>
      <FormItem>
        <Button
          loading={runLogin.loading}
          className="w-full"
          type={"primary"}
          onClick={login}
        >
          登录
        </Button>
      </FormItem>
    </AntdForm>
  );
};

export default Form;
