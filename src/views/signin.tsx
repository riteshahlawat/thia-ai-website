import { Center } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { NextPageWithLayout } from '../NextPageWithLayoutType';

const Signin: NextPageWithLayout = () => {
  return (
    <Center h='100vh' w='100vw'>
      SignIn
    </Center>
  );
};

// custom layout
Signin.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Signin;
