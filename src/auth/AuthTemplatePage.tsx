import React from 'react';
import {
    Box,
    Center,
    Container,
    Heading,
    Text,
    useBreakpointValue,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import Image from 'next/image';

type Props = {
    children: React.ReactNode;
    heading: string;
    text: string;
};

export const AuthTemplatePage = ({ children, heading, text }: Props) => {
    return (
        <Box
            bg={{
                base: useColorModeValue('thia.gray.50', 'thia.gray.990'),
                md: useColorModeValue('thia.bg-base', 'thia.bg-dark'),
            }}
        >
            <Container maxW='lg' px={[5, 5, 8, 8, 8]} h='full'>
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
                        <VStack w='full' spacing={{ base: 4, md: 6 }}>
                            <Box display='block' width='60px' height='60px'>
                                <Image
                                    src='/icon.png'
                                    width='100%'
                                    height='100%'
                                    layout='responsive'
                                />
                            </Box>
                            <VStack spacing={{ base: '3', md: '5' }} textAlign='center'>
                                <Heading size={useBreakpointValue({ base: 'md', md: 'lg' })}>
                                    {heading}
                                </Heading>
                                <Text fontSize={useBreakpointValue({ base: '14px', md: '16px' })}>
                                    {text}
                                </Text>
                            </VStack>
                            {children}
                        </VStack>
                    </Box>
                </Center>
            </Container>
        </Box>
    );
};
