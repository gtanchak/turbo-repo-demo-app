import './styles.css';
import Head from 'next/head';
import {
  GlobalStyles,
  LicenseInfo,
  theme,
  ThemeProvider
} from '@staff.ui/ui-component-library';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  PreLoadingScreen,
  SnackBarProvider
} from '@staff.ui/shared-components';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { persistor, store } from '../store';
import { usePreventReload } from '../Hooks/usePreventReload';
import 'react-quill/dist/quill.snow.css';

LicenseInfo.setLicenseKey(process.env.REACT_APP_MUI_DATA_GRID_LICENCE_KEY);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      onError: (e) => {
        if ('message' in (e as Error)) {
          console.error(e);
        }
      }
    }
  }
});

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const isCreateTemplate = router.route === '/bulk-time/create-time-template';

  const getLayout = Component.getLayout || ((page) => page);
  usePreventReload(isCreateTemplate);
  return (
    <>
      <Head>
        <title>staff</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={<PreLoadingScreen />} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <SnackBarProvider>
                <GlobalStyles
                  styles={{
                    body: {
                      backgroundColor: '#F5F5F5'
                    }
                  }}
                />
                {getLayout(<Component {...pageProps} />)}
              </SnackBarProvider>
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
