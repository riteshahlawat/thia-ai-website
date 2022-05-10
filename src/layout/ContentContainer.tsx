import { Container } from '@chakra-ui/react';
import React from 'react';

type Props = { children?: React.ReactNode };

const ContentContainer = ({ children }: Props) => {
  return (
    <Container maxW='container.2xl' px={{ base: 4, md: 6 }}>
      {children}
    </Container>
  );
};

export default ContentContainer;
