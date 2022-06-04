import React from 'react';
import { Box } from '@chakra-ui/react';
import { Footer } from '../modules/layout/Footer';
import { Navbar } from '../modules/layout/Navbar/Navbar';
import { ContentContainer } from 'src/modules/common/ContentContainer';

type Props = {
    children: React.ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
    return (
        <>
            <Navbar />
            <Box as='main' pt='var(--header-height)' minH='100vh'>
                {children}
            </Box>
            <ContentContainer>
                <Footer />
            </ContentContainer>
        </>
    );
};
