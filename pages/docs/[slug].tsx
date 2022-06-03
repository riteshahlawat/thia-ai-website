import Head from 'next/head';
import { allDocs } from 'contentlayer/generated';
import type { Doc } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { ContentContainer } from 'src/modules/common/ContentContainer';
import { Prose } from '@nikolovlazar/chakra-ui-prose';

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
            <Head>
                <title>{doc.title}</title>
            </Head>
            <article className='max-w-xl mx-auto py-8'>
                <div className='text-center mb-8'>
                    <Prose>
                        <ContentContainer>
                            <h1>{doc.title}</h1>
                            <Component></Component>
                        </ContentContainer>
                    </Prose>
                </div>
            </article>
        </>
    );
};

export default Docs;
