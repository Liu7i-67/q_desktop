export interface IReqBusinessV1TaskStrategySuggestionList {
  customerId?: string;
}

export interface IResBusinessV1TaskStrategySuggestion {
  priority: boolean;
  priorityFlag?: any;
  taskCreateCondition?: any;
  /** @param 任务描述 */
  taskDesc: string;
  taskEndTime?: any;
  taskStartTime?: any;
  /** @param 策略id */
  taskStrategyId: string;
  /** @param 策略名称 */
  taskStrategyName: string;
}
