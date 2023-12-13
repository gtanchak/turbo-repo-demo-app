import { useGetFormResponse } from '@staff.ui/services';
import { useSnackBar } from '@staff.ui/shared-components';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useAppSelector } from '../../../Hooks/useAppSelector';
export const useFormView = () => {
  const { formData } = useAppSelector((state: any) => state.formData);
  const { formId, setting, formType, formResponseId } = formData || {};
  const { setSnackbarConfig } = useSnackBar();
  const router = useRouter();
  const cookieKey = router?.query?.share as string;

  const {
    mutate: formSubmit,
    isLoading,
    isSuccess
  } = useGetFormResponse({
    onSuccess: (data: any) => {
      setSnackbarConfig({
        open: true,
        message: 'Form submitted successfully!',
        severity: 'success'
      });
      if (!setting.showThankYouPage && setting.redirectionURL) {
        const urlIsValid = setting.redirectionURL.includes('http');
        router.replace(
          `${
            urlIsValid
              ? setting.redirectionURL
              : 'https://' + `${setting.redirectionURL}`
          }`
        );
      }
      if (!setting?.allowMultiSubmits && formType === 'Basic') {
        setCookieForBasicForm();
      }
    },
    onError(e: any) {
      setSnackbarConfig({
        open: true,
        message: e?.message || 'Something went wrong, please try again',
        severity: 'error'
      });
    }
  });

  const handleFormSubmit = (params) => {
    const { formlogo, ...newObject } = params;
    delete newObject['submit'];
    delete newObject['heading'];
    delete newObject['sentimentOptionsValue'];

    for (const key in newObject) {
      if (key.includes('structure')) {
        delete newObject['key'];
      } else {
        if (typeof newObject[key] === 'undefined') {
          newObject[key] = '';
        }
      }
    }
    formSubmit({ ...newObject, formId, formType, formResponseId });
  };

  const setCookieForBasicForm = () => {
    Cookies.set(cookieKey, cookieKey, {
      expires: 365 * 10 //For 1 year
    });
  };
  const getCookiesForBasicForm = () => {
    return Cookies.get(cookieKey);
  };

  return {
    handleFormSubmit,
    setCookieForBasicForm,
    getCookiesForBasicForm,
    isLoading,
    isSuccess,
    formData
  };
};
