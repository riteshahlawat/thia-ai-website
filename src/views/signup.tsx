import React from 'react';
import type { ReactElement } from 'react';
import { NextPageWithLayout } from '../NextPageWithLayoutType';
import { Center } from '@chakra-ui/react';

const SignUp: NextPageWithLayout = () => {
  return (
    <Center h='100vh' w='100vw'>
      SignUp
    </Center>
  );
};

// custom layout
SignUp.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default SignUp;
