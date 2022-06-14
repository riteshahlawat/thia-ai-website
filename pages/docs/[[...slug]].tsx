import type { ReactElement } from 'react';
import { allDocs } from 'contentlayer/generated';
import type { Doc } from 'contentlayer/generated';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { DocsLayout } from 'src/layouts/DocsLayout';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { PathSegment } from 'src/types/PathSegment';
import { DocsNavigation } from 'src/modules/docs/DocsNavigation';
import { buildDocsTree } from 'src/utils/docs/buildDocsTree';
import { DocsBreadcrumbs } from 'src/modules/docs/DocsBreadcrumbs';
import { BreadcrumbType } from 'src/types/Breadcrumbs';
import {
    Box,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import Link from 'next/link';

type DocPageType = {
    doc: Doc;
    tree: any;
    childrenTree: any;
    breadcrumbs: BreadcrumbType;
};

const pathSegmnetHelper = (doc: Doc) => doc.pathSegments.map((_: PathSegment) => _.pathName);

export const getStaticPaths = async () => {
    const paths = allDocs.map(doc => {
        return { params: { slug: pathSegmnetHelper(doc) } };
    });
    return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: any) => {
    const pagePath = params.slug?.join('/') ?? '';
    const doc = allDocs.find((doc: Doc) => pathSegmnetHelper(doc).join('/') === pagePath);

    const tree = buildDocsTree(allDocs);
    const childrenTree = doc?.showChildCards
        ? buildDocsTree(allDocs, pathSegmnetHelper(doc))
        : null;

    const breadcrumbs = { path: doc?.slug, title: doc?.title };
    return { props: { doc, tree, childrenTree, breadcrumbs } };
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
                            <DocsBreadcrumbs path={breadcrumbs.path} title={breadcrumbs.title} />
                            <Prose as='article'>
                                <MDXComponent />
                                <SimpleGrid columns={[1, 1, 1, 2, 2]} spacing={10}>
                                    {doc.showChildCards &&
                                        childrenTree.map((card: any, i: number) => (
                                            <Link href={card.slug}>
                                                <Box key={i} p={5} border='1px' rounded='md'>
                                                    <Heading>{card.title}</Heading>
                                                    <Text>{card.description}</Text>
                                                </Box>
                                            </Link>
                                        ))}
                                </SimpleGrid>
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
                            <Box pt={7} pb={3}>
                                On this page:
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
};

Docs.getLayout = function getLayout(page: ReactElement) {
    return <DocsLayout>{page}</DocsLayout>;
};

export default Docs;
