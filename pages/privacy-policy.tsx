import React from 'react';
import { ContentContainer } from '@/components/common/ContentContainer';
import { SeoPage } from '@/components/seo/SeoPage';
import { Text, useColorModeValue } from '@chakra-ui/react';
import { allPrivacyPolicies, PrivacyPolicy } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { GetStaticProps } from 'next';

type Props = { doc: PrivacyPolicy };

const PrivacyPolicy = ({ doc }: Props) => {
    const color = useColorModeValue('thia.gray.700', 'thia.gray.600');
    const dateLastUpdated = new Date(doc.lastUpdatedAt).toLocaleDateString('default', { dateStyle: 'medium' });
    const MDXComponent = useMDXComponent(doc.body.code);

    return (
        <SeoPage title='Privacy Policy' description='View our privacy policy'>
            <ContentContainer maxW='container.lg'>
                <Text mt='8' color={color} fontSize='sm' fontWeight='light' fontFamily='Open Sans'>
                    Date Last Updated: {dateLastUpdated}
                </Text>
                <Prose as='article'>
                    <MDXComponent />
                </Prose>
            </ContentContainer>
        </SeoPage>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return { props: { doc: allPrivacyPolicies[0] } };
};

export default PrivacyPolicy;
