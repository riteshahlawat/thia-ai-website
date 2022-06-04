import type { ReactElement } from 'react';
import { allDocs } from 'contentlayer/generated';
import type { Doc } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { ContentContainer } from 'src/modules/common/ContentContainer';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { Box, Center, Container, Divider, Flex, HStack, VStack } from '@chakra-ui/react';
import { BaseLayout } from 'src/layouts/BaseLayout';
import { DocsLayout } from 'src/layouts/DocsLayout';

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
        <Prose as='article'>
            <Component />
        </Prose>
    );
};

Docs.getLayout = function getLayout(page: ReactElement) {
    return <DocsLayout>{page}</DocsLayout>;
};

export default Docs;
