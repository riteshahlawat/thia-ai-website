import { Container } from '@chakra-ui/react';
import React from 'react';

type Props = { children?: React.ReactNode; [key: string]: any };

export const ContentContainer = ({ children, ...rest }: Props) => {
    return (
        <Container maxW='container.xl' px={[3, 5, 8, 8, 8]} h='full' {...rest}>
            {children}
        </Container>
    );
};
