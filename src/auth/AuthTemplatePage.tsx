import React from 'react';
import { AuthContainer } from './AuthContainer';
import { Box, Center, useColorModeValue } from '@chakra-ui/react';

export const AuthTemplatePage = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Box
            bg={{
                base: useColorModeValue('thia.gray.50', 'thia.gray.990'),
                md: useColorModeValue('thia.bg-base', 'thia.bg-dark'),
            }}
        >
            <AuthContainer>
                <Center h='100vh'>{children}</Center>
            </AuthContainer>
        </Box>
    );
};
