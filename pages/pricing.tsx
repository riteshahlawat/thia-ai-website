import React from 'react';
import type { NextPage } from 'next';
import { ContentContainer } from 'src/components/common/ContentContainer';
import { Box, Center, Container, Heading, VStack } from '@chakra-ui/react';
import Stripe from 'stripe';
import { Summary } from '@/components/pricing/Summary';
import { Comparison } from '@/components/pricing/Comparison';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_LIVE as string, {
    apiVersion: '2020-08-27',
    typescript: true,
});

const Pricing: NextPage = ({ plans }: any) => {
    return (
        <ContentContainer>
            <Center h='full' minH='var(--fullHeightWithoutNav)' pb='var(--header-height)'>
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
                </VStack>
            </Center>
            <Comparison plans={plans} />
        </ContentContainer>
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

// type DetailsType = { plan: string };

// const metadataExcerpts: any = {
//     num_models: (d: string) => `${d === 'Infinity' ? 'Unlimited' : d} Models per month`,
//     num_datasets: (d: string) => `${d === 'Infinity' ? 'Unlimited' : d} Datasets per month`,
//     num_exports: (d: string) => `${d === 'Infinity' ? 'Unlimited' : d} Exports per month`,
//     num_classes: (d: string) => `${d === 'Infinity' ? 'Unlimited' : d} classes per dataset`,
//     num_images: (d: string) => `${d === 'Infinity' ? 'Unlimited' : d} images per dataset`,
//     image_classification: () => `Image classification`,
//     object_detection: () => `Object detection*`,
//     training: () => `Training`,
//     testing: () => `Testing`,
//     lite_exports: () => `Lite exports`,
//     optimized_exports: () => `Optimized exports`,
//     model_deployments: () => `Model deployments`,
//     remote_gpu_training: () => `Remote GPU training`,
//     cloud_model_backups: () => `Cloud model backups`,
// };
