import React from 'react';
import Footer from '../modules/layout/Footer';
import Navbar from '../modules/layout/Navbar/Navbar';
import { Box } from '@chakra-ui/react';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <Box as='main' pt='var(--header-height)'>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
