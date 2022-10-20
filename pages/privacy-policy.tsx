import React from 'react';
import Image from 'next/image';
import { ContentContainer } from '@/components/common/ContentContainer';
import { SeoPage } from '@/components/seo/SeoPage';
import { Text, useColorModeValue } from '@chakra-ui/react';
import { allPrivacyPolicies } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Prose } from '@nikolovlazar/chakra-ui-prose';

const components = { Image };

const PrivacyPolicy = () => {
    const pp = allPrivacyPolicies[0];
    const color = useColorModeValue('thia.gray.700', 'thia.gray.600');
    const dateLastUpdated = new Date(pp.lastUpdatedAt).toLocaleDateString('default', { dateStyle: 'medium' });
    const MDXComponent = useMDXComponent(pp.body.code);

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
};

export default PrivacyPolicy;
