import Head from 'next/head';
import { allDocs } from 'contentlayer/generated';
import type { Doc } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { ContentContainer } from 'src/modules/common/ContentContainer';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { Box, Center, Container, Flex } from '@chakra-ui/react';

export const getStaticPaths = async () => {
    return {
        paths: allDocs.map((d: any) => ({ params: { slug: d.slug } })),
        fallback: false,
    };
};

export const getStaticProps = async ({ params }: any) => {
    const doc = allDocs.find((doc: any) => doc.slug === params.slug);
    return { props: { doc } };
};

const Docs = ({ doc }: { doc: Doc }) => {
    const Component = useMDXComponent(doc.body.code);
    return (
        <>
            <ContentContainer>
                <Flex>
                    <Box w='300px' h='full'>
                        DoCUMentation
                    </Box>
                    <Container maxW='container.md'>
                        <Prose as='article'>
                            <Component />
                        </Prose>
                    </Container>
                </Flex>
            </ContentContainer>
        </>
    );
};

export default Docs;
