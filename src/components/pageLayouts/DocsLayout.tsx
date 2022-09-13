import React from 'react';
import { Navinderbar } from '@/components/layout/Navbar/Navbar';
import { Box, useColorModeValue } from '@chakra-ui/react';

type Props = {
    children: React.ReactNode;
};

export const DocsLayout = ({ children }: Props) => {
    return (
        <>
            <Navinderbar />
            <Box bg={useColorModeValue('thia.gray.50', 'thia.gray.990')}>{children}</Box>
        </>
    );
};
