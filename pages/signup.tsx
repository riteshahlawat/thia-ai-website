import React from 'react';
import type { ReactElement } from 'react';
import { NextPageWithLayout } from '../src/types/NextPageWithLayoutType';
import { Center } from '@chakra-ui/react';
import { EmptyLayout } from '../src/layouts/EmptyLayout';

const SignUp: NextPageWithLayout = () => {
  return (
    <Center h='100vh' w='100vw'>
      SignUp
    </Center>
  );
};

// custom layout
SignUp.getLayout = function getLayout(page: ReactElement) {
  return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignUp;
