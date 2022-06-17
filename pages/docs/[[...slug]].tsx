import type { ReactElement } from 'react';
import { allDocs, Doc } from 'contentlayer/generated';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { DocsLayout } from 'src/layouts/DocsLayout';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { DocsNavigation } from 'src/modules/docs/DocsNavigation';
import { buildDocsTree } from 'src/utils/docs/buildDocsTree';
import { DocsBreadcrumbs } from 'src/modules/docs/DocsBreadcrumbs';
import { DocsChildCard } from 'src/modules/docs/DocsChildCard';
import { DocPageType, TreeNode } from 'src/types/DocsTypes';
import { Headings } from 'src/modules/docs/DocHeadings';
import { getPathSegments, joinPathSegments } from 'src/utils/docs/pathSegmentUtils';
import Image from 'next/image';
import {
    Box,
    Container,
    Divider,
    Flex,
    SimpleGrid,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';

const components = {
    ...Headings,
    Image,
};

const Docs = ({ doc, tree, childrenTree, breadcrumbs }: DocPageType) => {
    const MDXComponent = useMDXComponent(doc?.body.code || '');
    return (
        <>
            <Flex pt='var(--header-height)'>
                <Box
                    pt={7}
                    pr={5}
                    w='350px'
                    pos='sticky'
                    overflowY='auto'
                    top='var(--header-height)'
                    h='var(--fullHeightWithoutNav)'
                    maxH='var(--fullHeightWithoutNav)'
                    flexShrink={0}
                >
                    <VStack align='start' fontSize='md'>
                        <DocsNavigation tree={tree} />
                    </VStack>
                </Box>
                <Box flexGrow={1} minH='var(--fullHeightWithoutNav)' py={7} pl={5}>
                    <Flex
                        px={7}
                        h='full'
                        rounded='md'
                        flexShrink={0}
                        bg={useColorModeValue('thia.gray.100', 'thia.gray.950')}
                    >
                        <Container maxW='container.md' pl={5} pb={5}>
                            <DocsBreadcrumbs path={breadcrumbs.path} />
                            <Prose as='article'>
                                <MDXComponent components={components} />
                                {doc.showChildCards && (
                                    <>
                                        <Divider />
                                        <SimpleGrid columns={[1, 1, 1, 2, 2]} spacing={7}>
                                            {childrenTree.map((card: TreeNode, i: number) => (
                                                <DocsChildCard key={i} {...card} />
                                            ))}
                                        </SimpleGrid>
                                        <Divider />
                                    </>
                                )}
                            </Prose>
                        </Container>
                        <Box
                            pl={5}
                            flexGrow={1}
                            display={{ base: 'none', xl: 'block' }}
                            color={useColorModeValue('thia.gray.700', 'thia.gray.400')}
                        >
                            <Box pt={7} pb={3} pr={5} fontSize='sm' textAlign='right'>
                                {doc.readingTime.text}
                            </Box>
                            {/* <Box pt={7} pb={3}>
                                On this page:
                            </Box> */}
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
};

export const getStaticPaths = async () => {
    const paths = allDocs.map(doc => {
        return { params: { slug: getPathSegments(doc) } };
    });
    return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: any) => {
    const pagePath = params.slug?.join('/') ?? '';
    const doc = allDocs.find((doc: Doc) => joinPathSegments(doc) === pagePath);

    const tree = buildDocsTree(allDocs);
    const childrenTree = doc?.showChildCards ? buildDocsTree(allDocs, getPathSegments(doc)) : null;

    const breadcrumbs = { path: doc?.slug, title: doc?.title };
    return { props: { doc, tree, childrenTree, breadcrumbs } };
};

Docs.getLayout = function getLayout(page: ReactElement) {
    return <DocsLayout>{page}</DocsLayout>;
};

export default Docs;
