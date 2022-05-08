import { Container } from '@chakra-ui/react';
import React from 'react';

type Props = { children?: React.ReactNode };

const ContentContainer = ({ children }: Props) => {
  return (
    <Container maxW='container.xl' p={{ md: 3 }}>
      {children}
    </Container>
  );
};

export default ContentContainer;
