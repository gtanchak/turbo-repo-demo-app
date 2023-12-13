import { AuthProvider } from '@staff.ui/shared-components';
import Head from 'next/head';
import FormList from './FormListing/FormList';
const Form = () => {
  return (
    <>
      <Head>
        <title>Form - staff</title>
      </Head>
      <AuthProvider>
        <FormList />
      </AuthProvider>
    </>
  );
};

export default Form;
