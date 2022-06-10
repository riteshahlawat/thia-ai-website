import { Box, Button, Container, Flex, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { allDocs, Doc } from 'contentlayer/generated';
import { query } from 'firebase/firestore';
import Link from 'next/link';
import React from 'react';
import { ChakraNextLink } from 'src/modules/common/ChakraNextLink';
import { ContentContainer } from 'src/modules/common/ContentContainer';
import { DocsNavigation } from 'src/modules/docs/DocsNavigation';
import { Footer } from 'src/modules/layout/Footer';
import { Navbar } from 'src/modules/layout/Navbar/Navbar';
import { buildDocsTree } from 'src/utils/docs/docsNavigationTree';

type Props = {
    children: React.ReactNode;
};

export const DocsLayout = ({ children }: Props) => {
    const tree = buildDocsTree(allDocs);

    return (
        <>
            <Navbar />
            <ContentContainer>
                <Flex pt='calc(var(--header-height) + 10px)'>
                    <Box
                        p={5}
                        pl={0}
                        w='350px'
                        pos='sticky'
                        top='calc(var(--header-height) + 10px)'
                        maxH='calc(var(--fullHeightWithoutNav) - 10px)'
                    >
                        <Text mb={3}>Documentation</Text>
                        <VStack align='start' fontSize='md'>
                            <DocsNavigation tree={tree} />
                        </VStack>
                    </Box>
                    <Box w='full'>
                        <Flex bg={useColorModeValue('thia.gray.50', 'thia.gray.990')} rounded='2xl'>
                            <Box
                                flexGrow={1}
                                minH='calc(var(--fullHeightWithoutNav) - 10px)'
                                alignContent='center'
                            >
                                <Container py={5} maxW='container.md'>
                                    {children}
                                </Container>
                            </Box>
                            <Box
                                w='200px'
                                p={5}
                                pr={0}
                                pos='sticky'
                                top={0}
                                display={{ base: 'none', xl: 'block' }}
                            >
                                <Text casing='capitalize'> On This Page</Text>
                            </Box>
                        </Flex>
                        <Footer />
                    </Box>
                </Flex>
            </ContentContainer>
        </>
    );
};
