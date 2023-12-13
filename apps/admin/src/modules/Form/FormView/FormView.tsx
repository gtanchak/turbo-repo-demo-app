import { FormLogoContainer } from '@staff.ui/shared-components';
import {
  Backdrop,
  Card,
  CardContent,
  Loader,
  Paper,
  Stack,
  ThemeProvider,
  Typography
} from '@staff.ui/ui-component-library';
import { FormProvider } from 'react-hook-form';
import { staffFooterLogo } from '@staff.ui/assets';
import {
  dropAreaContainer,
  formBuilderContainer,
  formContainer
} from './useStyles';
import { useFormView } from './useFormView';
import { controlDataType } from '../Create/Component/DropArea/type';
import { useCreate } from '../Create/useCreate';

import styleAndPreviewTheme from '../Create/styleAndPreviewTheme';
import {
  chipText,
  logoContainerMain,
  logoContainerSub
} from '../Create/Component/DropArea/StylePreview/FooterLogo/useStyles';
import ThankYouScreen from '../Create/Component/DropArea/StylePreview/ThankYouScreen/ThankYouScreen';

const FormView = (data?: { submit?: boolean }) => {
  const { renderControls, form } = useCreate();
  const {
    handleFormSubmit,
    isLoading,
    isSuccess,
    formData,
    getCookiesForBasicForm
  } = useFormView();
  const customColorPalette = (styleAndPreview) => {
    const object = styleAndPreview.reduce((result, currentObject) => {
      return Object.assign(result, currentObject);
    }, {});

    return styleAndPreviewTheme(object);
  };
  const formSubmitted = isSuccess || formData?.isCompleted; //this check is to show the afterscreeen when user submits the form
  const view = 'desktop - view';
  const hasCookie = !!getCookiesForBasicForm(); // this cookie is to identify wheather user already submitted the form or not

  return (
    <div className={` flex flex-col items-center justify-center relative`}>
      <FormProvider {...form}>
        <ThemeProvider
          theme={{ ...customColorPalette(formData.styleAndPreview) }}
        >
          <Paper
            className={`${formBuilderContainer(view)} `}
            variant={'formBuilderContainer'}
          >
            <>
              {!formSubmitted && (
                <FormLogoContainer
                  imageurl={formData?.formLogo}
                  remove={false}
                  className={'mt-10'}
                />
              )}
              <Card className={`${formContainer}`} variant="formCard">
                <CardContent>
                  {(isSuccess || isLoading) &&
                    !formData.setting.showThankYouPage && (
                      <Backdrop
                        sx={{
                          color: '#fff',
                          zIndex: (theme) => theme.zIndex.drawer + 1
                        }}
                        open={true}
                      >
                        <Loader />
                      </Backdrop>
                    )}
                  <Stack className={dropAreaContainer()}>
                    {(formSubmitted || hasCookie) &&
                    formData.setting.showThankYouPage ? (
                      <ThankYouScreen
                        message={formData.setting.thankYouMessage}
                      />
                    ) : (
                      formData?.form?.map((control: controlDataType) => {
                        return renderControls(
                          control,
                          data.submit && handleFormSubmit,
                          isLoading
                        );
                      })
                    )}
                  </Stack>
                </CardContent>
              </Card>
              <Stack
                className={`absolute right-[2%] bottom-[2%] ${logoContainerMain}`}
              >
                <Stack className={logoContainerSub}>
                  <Typography className={chipText}>Powered by</Typography>
                  <staffFooterLogo />
                </Stack>
              </Stack>
            </>
          </Paper>
        </ThemeProvider>
      </FormProvider>
    </div>
  );
};

export default FormView;
