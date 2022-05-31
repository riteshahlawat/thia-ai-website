import { Container } from '@chakra-ui/react';
import React from 'react';

type Props = { children?: React.ReactNode; py?: number | object };

export const AuthContainer = ({ children, py }: Props) => {
    return (
        <Container maxW='lg' px={[5, 5, 8, 8, 8]} h='full' py={py}>
            {children}
        </Container>
    );
};
