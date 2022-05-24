import { Center } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { EmptyLayout } from '../src/layouts/EmptyLayout';
import { NextPageWithLayout } from '../src/types/NextPageWithLayoutType';

const Signin: NextPageWithLayout = () => {
  return (
    <Center h='100vh' w='100vw'>
      SignIn
    </Center>
  );
};

// custom layout
Signin.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>;
};

export default Signin;
