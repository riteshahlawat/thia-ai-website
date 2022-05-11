import { Box } from '@chakra-ui/react';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar/Navbar';
import ContentContainer from './ContentContainer';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <ContentContainer>
        <Box pt={24}>{children}</Box>
      </ContentContainer>
      <Footer />
    </>
  );
};

export default Layout;
