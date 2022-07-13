import React from 'react';
import Stripe from 'stripe';
import type { NextPage } from 'next';
import { ContentContainer } from 'src/components/common/ContentContainer';
import { Box, Center, Heading, Link, useColorModeValue, VStack } from '@chakra-ui/react';
import { Summary } from '@/components/pricing/Summary';
import { Comparison } from '@/components/pricing/Comparison';
import { MdArrowDownward } from 'react-icons/md';
import { SeoPage } from '@/components/seo/SeoPage';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_LIVE as string, {
    apiVersion: '2020-08-27',
    typescript: true,
});

const Pricing: NextPage = ({ plans }: any) => {
    return (
        <SeoPage title='Pricing' description="Choose the plan that's right for you">
            <ContentContainer>
                <Center
                    h='full'
                    minH='var(--fullHeightWithoutNav)'
                    py='calc(var(--header-height)/2)'
                >
                    <VStack>
                        <Box w='full'>
                            <Heading
                                as='h1'
                                fontSize={[64, 64, 84, 84, 84]}
                                fontWeight='bold'
                                letterSpacing='tighter'
                                maxW='800px'
                                pb={16}
                            >
                                Choose the plan that&apos;s right for you.
                            </Heading>
                        </Box>
                        <Summary plans={plans} />
                        <Box pt={16}>
                            <Link
                                fontSize='2xl'
                                fontWeight='extrabold'
                                display='flex'
                                flexDirection='column'
                                alignItems='center'
                                color={useColorModeValue('black', 'white')}
                                href='#comparison-table'
                                _hover={{ color: 'thia.purple.500' }}
                            >
                                Compare all features
                                <MdArrowDownward />
                            </Link>
                        </Box>
                    </VStack>
                </Center>
                <Comparison plans={plans} />
            </ContentContainer>
        </SeoPage>
    );
};

export const getServerSideProps = async () => {
    const products = await stripe.products.list({ active: true });
    const getPriceObj = (id: any) => stripe.prices.retrieve(id);
    const plans = await Promise.all(
        products.data
            .filter((_: Stripe.Product) => _.metadata.type === 'subscription_package')
            .sort((a, b) => parseInt(a.metadata.tier) - parseInt(b.metadata.tier))
            .map(async obj => ({ ...obj, price: await getPriceObj(obj.default_price) }))
    );
    return { props: { plans } };
};

export default Pricing;
