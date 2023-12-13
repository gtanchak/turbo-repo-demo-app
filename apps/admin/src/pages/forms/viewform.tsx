import { NextPage } from 'next';
import { AuthProvider } from '@staff.ui/shared-components';
import Head from 'next/head';
import FormView from '../../modules/Form/FormView/FormView';

const Create: NextPage = () => (
  <>
    <Head>
      <title>Form - staff</title>
    </Head>
    <AuthProvider>
      <FormView />
    </AuthProvider>
  </>
);

export default Create;
