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
                <Center h='100vh'>
                    <Box
                        w='full'
                        rounded='md'
                        border={{ md: '1px' }}
                        p={{ base: 0, sm: 12 }}
                        bg={useColorModeValue('thia.gray.50', 'thia.gray.990')}
                        borderColor={{
                            base: useColorModeValue('thia.gray.100', 'thia.gray.950'),
                            md: useColorModeValue('thia.gray.100', 'thia.gray.950'),
                        }}
                    >
                        {children}
                    </Box>
                </Center>
            </AuthContainer>
        </Box>
    );
};
