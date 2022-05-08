import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import ContentContainer from './ContentContainer';
import PageContainer from './ContentContainer';
type Props = {};

const Footer = (props: Props) => {
  return (
    <Box as='footer'>
      <ContentContainer>
        <Center>Footer</Center>
      </ContentContainer>
    </Box>
  );
};

export default Footer;
