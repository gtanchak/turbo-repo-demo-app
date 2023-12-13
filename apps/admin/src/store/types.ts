export interface BulkTimeStapperStateType {
  activeStep: number;
  activeComponent: number;
  totalNestedStep: number;
  activeNestedStep: number;
  componentList: string[];
  isBack: boolean;
  isNextButtonDisabled: boolean;
  isBackButtonDisabled: boolean;
  data?: any;
}

export interface MainStateType {
  bulkTimeStepper: BulkTimeStapperStateType;
}
