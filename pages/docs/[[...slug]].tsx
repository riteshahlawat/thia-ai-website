import type { ReactElement } from 'react';
import { allDocs } from 'contentlayer/generated';
import type { Doc } from 'contentlayer/generated';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { DocsLayout } from 'src/layouts/DocsLayout';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { PathSegment } from 'src/types/PathSegment';
import { Box, Container, Flex, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { DocsNavigation } from 'src/modules/docs/DocsNavigation';
import { Footer } from 'src/modules/layout/Footer';
import { buildDocsTree } from 'src/utils/docs/docsNavigationTree';
import { DocsBreadcrumbs } from 'src/modules/docs/DocsBreadcrumbs';

export const getStaticPaths = async () => {
    const paths = allDocs.map(doc => {
        return { params: { slug: doc.pathSegments.map((seg: PathSegment) => seg.pathName) } };
    });
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params }: any) => {
    const pagePath = params.slug?.join('/') ?? '';
    return {
        props: {
            doc: allDocs.find(
                (doc: Doc) =>
                    doc.pathSegments.map((seg: PathSegment) => seg.pathName).join('/') === pagePath
            ),
        },
    };
};

const Docs = ({ doc }: { doc: Doc }) => {
    const MDXComponent = useMDXComponent(doc.body.code);
    const tree = buildDocsTree(allDocs);

    return (
        <Flex pt='var(--header-height)'>
            <Box
                pt={10}
                pr={5}
                w='350px'
                pos='sticky'
                top='var(--header-height)'
                maxH='var(--fullHeightWithoutNav)'
                overflowY='auto'
            >
                <VStack align='start' fontSize='md'>
                    <DocsNavigation tree={tree} />
                </VStack>
            </Box>
            <Box w='full' pt={10} pl={5}>
                <Flex rounded='md' bg={useColorModeValue('thia.gray.100', 'thia.gray.950')}>
                    <Box flexGrow={1} minH='var(--fullHeightWithoutNav)' alignContent='center'>
                        <DocsBreadcrumbs />
                        <Container maxW='container.md' pb={5}>
                            <Prose as='article'>
                                <MDXComponent />
                            </Prose>
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
    );
};

Docs.getLayout = function getLayout(page: ReactElement) {
    return <DocsLayout>{page}</DocsLayout>;
};

export default Docs;
