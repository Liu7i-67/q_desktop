import { Button, Form } from "antd";
import { useSelector } from "./store";
import { RedBookSchedulingAuth } from "@/pages/workforce/auth";

const Option = () => {
  const FormItem = Form.Item;
  const { openEditModalCreate } = useSelector((x) => x.logic);

  return (
    <Form className="mb-4" layout="inline">
      <FormItem>
        {RedBookSchedulingAuth.redBookSchedulingShiftCreate && (
          <Button type="primary" onClick={openEditModalCreate}>
            新增班次
          </Button>
        )}
      </FormItem>
    </Form>
  );
};

export default Option;
