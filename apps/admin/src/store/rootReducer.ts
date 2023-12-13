import { combineReducers } from '@reduxjs/toolkit';
import bulkTimeSlice from './bulkTime/bulkTimeSlice';
import ImportTime from './ImportTime';
import StepperSlice from './Stepper/StepperSlice';
import AuthDetailSlice from './AuthDetails/authDetailSlice';
import FormDataSlice from './FormData/FormDataSlice';
import salesSlice from './sales/salesSlice';
import checkoutStepperSlice from './checkoutStepper';

const rootReducer = combineReducers({
  bulkTimeStepper: StepperSlice,
  importTime: ImportTime,
  bulkTime: bulkTimeSlice,
  authDetails: AuthDetailSlice,
  formData: FormDataSlice,
  sales: salesSlice,
  checkoutStepper: checkoutStepperSlice
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
