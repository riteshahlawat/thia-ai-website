import { Box, Container } from '@chakra-ui/react';
import React from 'react';

type Props = { children?: React.ReactNode };

const PageLayout = ({ children }: Props) => {
  return <Container maxW='xl'>{children}</Container>;
};

export default PageLayout;
