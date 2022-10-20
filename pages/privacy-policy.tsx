import { ContentContainer } from '@/components/common/ContentContainer';
import { SeoPage } from '@/components/seo/SeoPage';
import { Text, useColorModeValue } from '@chakra-ui/react';
import { allPrivacyPolicies, PrivacyPolicy } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import React from 'react';
import Image from 'next/image';
import { Prose } from '@nikolovlazar/chakra-ui-prose';

type Props = { log: PrivacyPolicy };

const components = { Image };

const PrivacyPolicy = React.memo(({ log }: Props) => {
    const MDXComponent = useMDXComponent(log.body.code);
    const color = useColorModeValue('thia.gray.700', 'thia.gray.600');
    const dateLastUpdated = new Date(log.lastUpdatedAt).toLocaleDateString('default', { dateStyle: 'medium' });

    return (
        <SeoPage title='Privacy Policy' description='View our privacy policy'>
            <ContentContainer maxW='container.lg'>
                <Text mt='8' color={color} fontSize='sm' fontWeight='light' fontFamily='Open Sans'>
                    Date Last Updated: {dateLastUpdated}
                </Text>
                <Prose as='article'>
                    <MDXComponent components={components} />
                </Prose>
            </ContentContainer>
        </SeoPage>
    );
});

PrivacyPolicy.displayName = 'PrivacyPolicy';
export default PrivacyPolicy;

export const getStaticProps = async () => {
    return { props: { log: allPrivacyPolicies[0] } };
};
