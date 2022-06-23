import type { ReactElement } from 'react';
import { allDocs, Doc } from 'contentlayer/generated';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { DocsLayout } from 'src/components/pageLayouts/DocsLayout';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { DocsNavigation } from 'src/components/docs/navigation/DocsNavigation';
import { buildDocsTree } from 'src/utils/docs/buildDocsTree';
import { DocsBreadcrumbs } from 'src/components/docs/DocsBreadcrumbs';
import { DocsChildCard } from 'src/components/docs/DocsChildCard';
import { DocPageType, TreeNode } from 'src/types/DocsTypes';
import { Headings } from 'src/components/docs/DocHeadings';
import { getPathSegments, joinPathSegments } from 'src/utils/docs/pathSegmentUtils';
import { Box, Container, Divider, Flex, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';

const components = {
    ...Headings,
    Image,
};

const Docs = ({ doc, tree, childrenTree, breadcrumbs }: DocPageType) => {
    const MDXComponent = useMDXComponent(doc?.body.code || '');
    return (
        <Container maxW='container.2xl' px={[0, 5, 8, 8, 8]} h='full'>
            <Flex pt='var(--header-height)' flexDirection={{ base: 'column', sm: 'row' }}>
                <DocsNavigation tree={tree} />
                <Box
                    flexGrow={1}
                    minH='var(--fullHeightWithoutNav)'
                    py={{ base: 0, sm: 7 }}
                    pl={{ base: 0, sm: 5 }}
                >
                    <Flex
                        px={{ base: 0, sm: 7 }}
                        h='full'
                        rounded='md'
                        flexShrink={0}
                        bg={{
                            base: 'transparent',
                            sm: useColorModeValue('thia.gray.100', 'thia.gray.950'),
                        }}
                    >
                        <Container maxW='container.md' px={{ base: 5, sm: 5 }} pb={5}>
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
        </Container>
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
