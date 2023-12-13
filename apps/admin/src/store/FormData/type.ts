import { COLORS, FONTS } from '@staff.ui/ui-component-library';
import { TypographyVariant } from '@mui/material';

export interface cssObjectType {
  color?: string;
}

export interface selecteOptionType {
  value: any;
  name: string;
}
export interface RadioOptionsType {
  value?: string;
  label: string;
  isChecked?: boolean;
}

export interface CheckBoxOptionsType {
  value?: string;
  label: string;
  isChecked?: boolean;
}

export interface controlDataType {
  id?: string;
  page?: number;
  dataType: string;
  dataTypeKey?: string;
  dataTypeValue?: any;
  dataTypeHelperText?: string;
  dataTypePlaceholderText?: string;
  dataTarget?: string;
  defaultValue?: string | null;
  required?: boolean;
  prepopulate?: boolean;
  readOnly?: boolean;
  dataManagement?: string;
  value?: any;
  isActive?: boolean;
  style?: cssObjectType;
  options?: Array<selecteOptionType>;
  size?: TypographyVariant;
  headingText?: string;
  GenderOption?: Array<RadioOptionsType>;
  radioOptions?: Array<RadioOptionsType>;
  checkBoxOptions?: Array<CheckBoxOptionsType>;
  dropDownOptions?: Array<CheckBoxOptionsType>;
  imageWidth?: string | number;
  imageHeight?: string | number;
  imageCropPosition?: string;
  CropimageWidth?: string | number;
  CropimageHeight?: string | number;
  imageUrl?: string;
  sentimentType?: string;
  sentimentTypeValue?: string;
  sentimentOptionsValue?: object;
  RatingValue?: object;
  fieldGroupType?: string;
  tabListType?: string;
  property?: string;
  starRatingValue?: number | Float32List;
  embedCode?: string;
  videoWidth?: string;
  file?: string;
  dynamicData: object;
}

export interface customDataType {
  branch?: string;
  job_category?: string;
  recruiter?: string;
  sales_rep?: string;
  candidate_source?: string;
  client_source?: string;
}

export interface headingSizeType {
  h1: { size: string };
  h2: { size: string };
  h3: { size: string };
  h4: { size: string };
  h5: { size: string };
  h6: { size: string };
}
export interface styleFieldsType {
  id?: string;
  form_background?: fieldsPropertyType;
  form?: fieldsPropertyType;
  heading?: fieldsPropertyType;
  button?: fieldsPropertyType;
  paragraph?: fieldsPropertyType;
  labelText?: fieldsPropertyType;
  helperText?: fieldsPropertyType;
  field?: fieldsPropertyType;
  image_video?: fieldsPropertyType;
  divider?: fieldsPropertyType;
}

export interface settingFieldsType {
  showThankYouPage?: boolean;
  thankYouMessageType?: string;
  thankYouMessage?: string;
  notifyTo?: Array<string>;
  expirationDate?: any;
  disOverride?: boolean;
  allowMultiSubmits?: boolean;
  redirectionURL?: string;
}

export interface fieldsPropertyType {
  textColor?: string;
  backgroundColor?: string;
  defaultFont?: string;
  style?: string;
  shadow?: string;
  font?: string;
  color?: string;
  headingSize?: headingSizeType;
  linkColor?: string;
  size?: string;
  textSize?: string;
  borderColor?: string;
  dividerColor?: string;
  theme?: string;
}

export interface formBuilderState {
  formLogo?: string;
  formName?: string;
  companyId?: string;
  formResponseId?: string;
  formId?: string;
  status?: string;
  createdByUserId?: 1234;
  createdByName?: string;
  createdAtDateTime?: string;
  formType?: string;
  hasIdentifiableProperty?: boolean;
  identifiableProperty?: string;
  identifiablePropertyValue?: string;
  primaryObject?: string;
  secondaryObjects?: Array<string>;
  customData?: object;
  dynamicData?: object;
  form: Array<controlDataType>;
  preview: Array<controlDataType>;
  selectedPreview?: string;
  styleAndPreview: Array<styleFieldsType>;
  setting?: settingFieldsType;
}

export interface ObjectPropertyType {
  attributeName: string;
  dataType: string;
  maxLength?: number;
}

export interface formDataState {
  formData: formBuilderState;
  objectPropertyList: {
    IntegratedList: Array<object>;
    associationsList: Array<{ label: string; value: string }>;
  };
  dynamicTag: {
    build: Array<object>;
    setting: object;
  };
}

export type MainFormDataStateType = {
  formData: formBuilderState;
  objectPropertyList: Array<ObjectPropertyType>;
};

export const formDefaultData: Array<controlDataType> = [
  {
    page: 1,
    fieldGroupType: 'structure',
    tabListType: 'basic',
    id: 'form-heading',
    dataType: 'heading',
    size: 'h3',
    dataTypeKey: 'heading',
    headingText: 'Untitled Form',
    dynamicData: {},
    required: false
  },
  {
    page: 1,
    id: 'form-submit',
    dataType: 'submit',
    dataTypeKey: 'submit',
    dataTypeValue: 'Submit',
    dataTarget: '',
    dataManagement: 'not_applicable',
    dynamicData: {},
    value: ''
  }
];

export const defaultData: formBuilderState = {
  formLogo: '',
  formName: 'Untitled Form',
  formType: 'Basic',
  primaryObject: 'NoObject',
  form: formDefaultData,
  preview: formDefaultData,
  selectedPreview: '',
  styleAndPreview: [
    {
      id: 'form_background',
      form_background: { backgroundColor: COLORS.light_gray }
    },
    {
      id: 'form',
      form: {
        defaultFont: FONTS.hind_vadodra,
        backgroundColor: COLORS.white,
        style: '24px',
        shadow: '0px 8px 24px 0px rgba(85,95,97,0.12)',
        theme: COLORS.primary_green
      }
    },
    {
      id: 'heading',
      heading: {
        font: FONTS.montserrat,
        color: COLORS.primary_black,
        headingSize: {
          h1: { size: '32px' },
          h2: { size: '24px' },
          h3: { size: '18px' },
          h4: { size: '16px' },
          h5: { size: '15.4px' },
          h6: { size: '14px' }
        }
      }
    },
    {
      id: 'button',
      button: {
        font: FONTS.hind_vadodra,
        style: '24px',
        textColor: COLORS.white,
        backgroundColor: COLORS.primary_green,
        textSize: '16px'
      }
    }
  ],
  setting: {
    showThankYouPage: true,
    thankYouMessageType: 'h1',
    thankYouMessage: 'Thank you!',
    notifyTo: [],
    expirationDate: null,
    disOverride: true,
    allowMultiSubmits: true,
    redirectionURL: ''
  }
};
