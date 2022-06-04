import { Box, Button, Container, Flex, Text, VStack } from '@chakra-ui/react';
import { allDocs } from 'contentlayer/generated';
import Link from 'next/link';
import React from 'react';
import { ChakraNextLink } from 'src/modules/common/ChakraNextLink';
import { ContentContainer } from 'src/modules/common/ContentContainer';
import { Footer } from 'src/modules/layout/Footer';
import { Navbar } from 'src/modules/layout/Navbar/Navbar';

type Props = {
    children: React.ReactNode;
};

export const DocsLayout = ({ children }: Props) => {
    const docs = allDocs.map(d => {
        return { slug: d.slug, title: d.title };
    });

    return (
        <>
            <Navbar />
            <ContentContainer>
                <Box display='relative' maxH='100vh'>
                    <Flex pt='calc(var(--header-height) + 10px)'>
                        <Box
                            p={5}
                            pl={0}
                            mr={5}
                            w='200px'
                            pos='sticky'
                            top='calc(var(--header-height) + 10px)'
                            maxH='calc(var(--fullHeightWithoutNav) - 10px)'
                        >
                            <Text mb={3}>Documentation</Text>
                            <VStack align='start'>
                                {docs.map(({ slug, title }, i) => (
                                    <ChakraNextLink
                                        key={i}
                                        href={{ pathname: '/docs/[slug]', query: { slug } }}
                                    >
                                        {title}
                                    </ChakraNextLink>
                                ))}
                            </VStack>
                        </Box>
                        <Box alignContent='center'>
                            <Flex>
                                <Box flexGrow={1} minH='calc(var(--fullHeightWithoutNav) - 10px)'>
                                    <Container py={5} maxW='container.md'>
                                        {children}
                                    </Container>
                                </Box>
                                <Box w='200px' p={5} pr={0} pos='sticky' top={0}>
                                    <Text casing='capitalize'> On This Page</Text>
                                </Box>
                            </Flex>
                            <Footer />
                        </Box>
                    </Flex>
                </Box>
            </ContentContainer>
        </>
    );
};
