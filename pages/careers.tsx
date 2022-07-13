import React from 'react';
import { Center, Heading } from '@chakra-ui/react';
import { ContentContainer } from '@/components/common/ContentContainer';
import { SeoPage } from '@/components/seo/SeoPage';

type Props = {};

const Careers = (props: Props) => {
    return (
        <SeoPage title='Careers'>
            <ContentContainer>
                <Center h='var(--fullHeightWithoutNav)' pb='var(--header-height)'>
                    <Heading>
                        Sorry, we currently do not have any open positions, please check back later.
                    </Heading>
                </Center>
            </ContentContainer>
        </SeoPage>
    );
};

export default Careers;
