import React from 'react';
import { Box } from '@chakra-ui/react';
import { Footer } from '@/components/layout/Footer';
import { Navinderbar } from '@/components/layout/Navbar/Navbar';
import { ContentContainer } from '@/components/common/ContentContainer';

type Props = {
    children: React.ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
    return (
        <>
            <Navinderbar />
            <Box as='main' pt='var(--header-height)' minH='100vh' id='main-content'>
                {children}
            </Box>
            <ContentContainer>
                <Footer />
            </ContentContainer>
        </>
    );
};
