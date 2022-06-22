import React from 'react';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Box, useColorModeValue } from '@chakra-ui/react';

type Props = {
    children: React.ReactNode;
};

export const DocsLayout = ({ children }: Props) => {
    return (
        <>
            <Navbar />
            <Box bg={useColorModeValue('thia.gray.50', 'thia.gray.990')}>{children}</Box>
        </>
    );
};
