import { createSlice } from '@reduxjs/toolkit';
import { defaultData, formDataState } from './type';

const initialState: formDataState = {
  objectPropertyList: { IntegratedList: [], associationsList: [] },
  formData: {
    ...defaultData
  },
  dynamicTag: {
    build: [],
    setting: {}
  }
};

const formData = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    getFormData: (state, { payload }) => {
      return {
        ...state,
        formData: {
          ...state.formData,
          form: [...payload.data.form],
          preview: [...payload.data.form]
        }
      };
    },
    getSettingData: (state, { payload }) => {
      return {
        ...state,
        formData: {
          ...state.formData,
          setting: payload.data.setting
        }
      };
    },
    getStyleAndPreviewData: (state, { payload }) => {
      return {
        ...state,
        formData: {
          ...state.formData,
          styleAndPreview: payload.data.styleAndPreview
        }
      };
    },
    getFormDetail: (state, { payload }) => {
      const { formLogo, formName, formType, primaryObject, shareLinkCode } =
        payload.data || {};

      return {
        ...state,
        formData: {
          ...state.formData,
          formLogo: formLogo ? formLogo : state.formData.formLogo,
          formName:
            formName || formName === '' ? formName : state.formData.formName,
          formType: formType ? formType : state.formData.formType,
          primaryObject: primaryObject
            ? primaryObject
            : state.formData.primaryObject,
          shareLinkCode: shareLinkCode && shareLinkCode,
          preview: [...state.formData.form]
        }
      };
    },
    removeFormLogoHandler: (state) => {
      return {
        ...state,
        formData: {
          ...state.formData,
          formLogo: ''
        }
      };
    },

    getFormAllDetails: (state, { payload }) => {
      const { config, ...formData } = payload.data.formData || {};
      const { style, ...newConfig } = payload.data.formData.config || {};

      return {
        ...state,

        formData: {
          ...formData,
          preview: formData.form,
          setting: config ? { ...newConfig } : state.formData.setting,
          styleAndPreview: config ? [...style] : state.formData.styleAndPreview
        }
      };
    },

    setPreviewData: (state, { payload }) => {
      const { selectedPreview, previewData } = payload || {};

      return {
        ...state,

        formData: {
          ...state.formData,
          preview: previewData,
          selectedPreview
        }
      };
    },
    getCreateFormDetails: (state, { payload }) => {
      const { config, form, formLogo, formType, ...formData } =
        payload.data.formData || {};

      return {
        ...state,

        formData: {
          ...state.formData,
          ...formData
          // styleAndPreview: [...config.style]
        }
      };
    },
    getIntegratedList: (state, { payload }) => {
      const { objectName, items } = payload.data.integrated || {};
      return {
        ...state,
        objectPropertyList: {
          ...state.objectPropertyList,
          IntegratedList: [
            ...state.objectPropertyList.IntegratedList,
            {
              id: objectName,
              title: objectName,

              controls: items
            }
          ]
        }
      };
    },
    getIntegratedAssociationList: (state, { payload }) => {
      const item = payload.data.association || {};
      return {
        ...state,
        formData: {
          ...state.formData,
          secondaryObjects: item.map((val) => val.value)
        },
        objectPropertyList: {
          ...state.objectPropertyList,
          associationsList: item
        }
      };
    },
    clearFormStateData: (state) => {
      return {
        ...state,
        formData: { ...defaultData },
        objectPropertyList: { IntegratedList: [], associationsList: [] },
        dynamicTag: { build: [], setting: {} }
      };
    },
    setDynamicTag: (state, { payload }) => {
      const { data } = payload || {};
      return {
        ...state,
        dynamicTag: {
          ...state.dynamicTag,
          ...data
        }
      };
    },
    clearIntegratedData: (state) => {
      return {
        ...state,
        objectPropertyList: { IntegratedList: [], associationsList: [] }
      };
    }
  }
});

export const {
  getFormData,
  getStyleAndPreviewData,
  clearFormStateData,
  getFormDetail,
  getFormAllDetails,
  getSettingData,
  getCreateFormDetails,
  getIntegratedList,
  getIntegratedAssociationList,
  clearIntegratedData,
  removeFormLogoHandler,
  setDynamicTag,
  setPreviewData
} = formData.actions;

export default formData.reducer;
