import { Container } from '@chakra-ui/react';
import React from 'react';

type Props = { children?: React.ReactNode; py?: number | object };

export const ContentContainer = ({ children, py }: Props) => {
    return (
        <Container maxW='container.2xl' px={[5, 5, 8, 8, 8]} h='full' py={py}>
            {children}
        </Container>
    );
};
