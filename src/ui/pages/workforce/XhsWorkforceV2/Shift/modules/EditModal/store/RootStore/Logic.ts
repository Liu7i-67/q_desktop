import {
  makeAutoObservable,
  runInAction,
  withRequest,
} from "@quarkunlimit/qu-mobx";
import { ILogic, TLoadingStore } from "./interface";
import { RootStore } from ".";
import { IInitData } from "../../interface";
import dayjs from "dayjs";
import { save_shift, update_shift } from "../../service";
import { showErrorInfo, to } from "@/utils/tools";
import { message } from "antd";
import type { Color } from "antd/es/color-picker";

export class Logic implements ILogic {
  loadingStore: TLoadingStore;
  rootStore: RootStore;
  open = false;
  initData: IInitData | null = null;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.loadingStore = rootStore.loadingStore;
    this.onSubmit = withRequest(this.onSubmit, "onSubmit");
    makeAutoObservable(this, {}, { autoBind: true });
  }

  openModal(initData?: IInitData) {
    this.open = true;
    this.initData = initData || null;
    if (initData) {
      const values = {
        ...initData,
        timeSlot: [
          dayjs(initData?.startTime, "HH:mm:ss"),
          dayjs(initData?.endTime, "HH:mm:ss"),
        ],
        scheduleType: initData?.scheduleType === 0 ? "LITTLE_RED_BOOK" : "",
      };
      this.rootStore.refs.editForm.setFieldsValue(values);
    }
  }

  closeModal() {
    this.open = false;
    this.initData = null;
    this.rootStore.refs.editForm.resetFields();
  }

  async onSubmit() {
    const values = await this.rootStore.refs.editForm.validateFields();
    const { timeSlot, frontendExtension, ...rest } = values;
    const payload = {
      ...rest,
      startTime: timeSlot?.[0]?.format("HH:mm:ss"),
      endTime: timeSlot?.[1]?.format("HH:mm:ss"),
      frontendExtension:
        typeof frontendExtension === "string"
          ? frontendExtension
          : `#${(frontendExtension as Color)?.toHex?.()}`,
    };
    const isEdit = Boolean(this.initData?.id);
    const [err, res] = await to(
      isEdit
        ? update_shift({ ...payload, id: this.initData?.id })
        : save_shift(payload)
    );

    if (err || !res || res.code !== 200) {
      showErrorInfo({
        err,
        res,
        msg: res?.msg || (isEdit ? "修改失败" : "新增失败"),
      });
      return;
    }

    runInAction(() => {
      this.closeModal();
      this.rootStore.propsStore.props.afterClose?.();
      message.success(isEdit ? "修改成功" : "新增成功");
    });
  }
}
