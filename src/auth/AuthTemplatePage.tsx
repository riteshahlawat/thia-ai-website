import React from 'react';
import { Box, Center, Container, Heading, Text, useBreakpointValue, useColorModeValue, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Logo from '@/components/common/Logo';

type Props = {
    children: React.ReactNode;
    heading: string;
    text?: string;
};

export const AuthTemplatePage = ({ children, heading, text }: Props) => {
    return (
        <Box
            bg={{
                base: useColorModeValue('thia.gray.50', 'thia.gray.990'),
                md: useColorModeValue('thia.bg-base', 'thia.bg-dark'),
            }}
        >
            <Container maxW='lg' px={[10, 10, 12, 12, 12]} h='full'>
                <Center h='100vh'>
                    <Box
                        w='full'
                        rounded='md'
                        border={{ md: '1px' }}
                        px={{ base: 0, sm: 10 }}
                        py={{ base: 0, sm: 7 }}
                        bg={useColorModeValue('thia.gray.50', 'thia.gray.990')}
                        borderColor={{
                            base: useColorModeValue('thia.gray.100', 'thia.gray.950'),
                            md: useColorModeValue('thia.gray.100', 'thia.gray.950'),
                        }}
                    >
                        <VStack w='full' spacing={{ base: 4, md: 6 }}>
                            <Logo w='50px' isIcon />
                            <VStack spacing={3} textAlign='center'>
                                <Heading size={useBreakpointValue({ base: 'md', md: 'lg' })}>{heading}</Heading>
                                <Text fontSize={useBreakpointValue({ base: '14px', md: '16px' })}>{text}</Text>
                            </VStack>
                            {children}
                        </VStack>
                    </Box>
                </Center>
            </Container>
        </Box>
    );
};
