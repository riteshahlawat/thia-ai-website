import React from 'react';
import { Box } from '@chakra-ui/react';
import { Footer } from '../modules/layout/Footer';
import { Navbar } from '../modules/layout/Navbar/Navbar';

type Props = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
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
