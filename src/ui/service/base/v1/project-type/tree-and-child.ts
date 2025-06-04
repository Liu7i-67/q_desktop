export interface IResBaseV1PlatformProjectTypeTreeAndChild {
  childList: IResBaseV1PlatformProjectTypeTreeAndChild[];
  createTime: string;
  id: string;
  memo: string;
  parentId?: any;
  projectDTOList: IResBaseV1PlatformProjectTypeTreeAndChildProjectDTO[];
  typeName: string;
  updateTime: string;
}

interface IResBaseV1PlatformProjectTypeTreeAndChildProjectDTO {
  createTime?: any;
  enableFlag?: any;
  id: string;
  memo?: any;
  projectCode?: any;
  projectName: string;
  typeFullName?: any;
  typeId: string;
  updateTime?: any;
}
