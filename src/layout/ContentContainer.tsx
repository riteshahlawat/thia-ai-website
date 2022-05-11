import { Container } from '@chakra-ui/react';
import React from 'react';

type Props = { children?: React.ReactNode };

const ContentContainer = ({ children }: Props) => {
  return (
    <Container maxW='container.2xl' px={[4, 4, 8, 8, 8]}>
      {children}
    </Container>
  );
};

export default ContentContainer;
