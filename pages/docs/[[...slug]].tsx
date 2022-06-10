import type { ReactElement } from 'react';
import { allDocs } from 'contentlayer/generated';
import type { Doc } from 'contentlayer/generated';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { DocsLayout } from 'src/layouts/DocsLayout';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { PathSegment } from 'src/types/PathSegment';

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
