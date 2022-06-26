import React from 'react';
import type { NextPage } from 'next';
import { motion } from 'framer-motion';
import { ContentContainer } from 'src/components/common/ContentContainer';
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import { MdChevronRight } from 'react-icons/md';
import Stripe from 'stripe';
import { MdCheck } from 'react-icons/md';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_LIVE as string, {
    apiVersion: '2020-08-27',
    typescript: true,
});

const Card = ({ plan, numPlans }: { plan: ProductWithPrice; numPlans: number }) => {
    const free = !plan.price.unit_amount;
    const last = parseInt(plan.metadata.tier) === numPlans;

    return (
        <VStack
            as={motion.div}
            w='full'
            p={10}
            bg={useColorModeValue('thia.gray.50', 'thia.gray.990')}
            rounded='xl'
            align='start'
            spacing={3}
            justify='space-between'
            border='2px'
            borderColor={useColorModeValue(
                last ? 'thia.purple.200' : 'thia.gray.100',
                last ? 'thia.purple.800' : 'thia.gray.950'
            )}
        >
            <Heading>{plan.name}</Heading>
            <Text>{plan.description}</Text>
            <Flex textAlign='start' gap={1}>
                <Box as='span' fontSize={24} pt={5}>
                    $
                </Box>
                <Box as='span' fontSize={72}>
                    {plan.price.unit_amount !== null && plan.price.unit_amount / 100}
                </Box>
                <Text alignSelf='end' pb={6} color='thia.gray.700'>
                    / month
                </Text>
            </Flex>
            <Text color='thia.gray.700' fontSize='sm'>
                {free ? 'No credit card required*' : 'Billed monthly, cancel anytime'}
            </Text>
            <Box pt={5}>
                <Button
                    variant={free ? 'secondary' : 'primaryOutline'}
                    rightIcon={free ? <MdChevronRight /> : undefined}
                >
                    {free ? 'Get started' : `Buy ${plan.name}`}
                </Button>
            </Box>
        </VStack>
    );
};

type ProductWithPrice = Stripe.Product & { price: Stripe.Price };

const metadataExcerpts: any = {
    num_models: (d: string) => `${d === 'Infinity' ? 'Unlimited' : d} Models per month`,
    num_datasets: (d: string) => `${d === 'Infinity' ? 'Unlimited' : d} Datasets per month`,
    num_exports: (d: string) => `${d === 'Infinity' ? 'Unlimited' : d} Exports per month`,
    max_classes: (d: string) => `${d === 'Infinity' ? 'Unlimited' : d} classes per dataset`,
    max_images: (d: string) => `${d === 'Infinity' ? 'Unlimited' : d} images per dataset`,
    image_classification: () => `Image classification`,
    object_detection: () => `Object detection*`,
    training: () => `Training`,
    testing: () => `Testing`,
    lite_exports: () => `Lite exports`,
    optimized_exports: () => `Optimized exports`,
    model_deployments: () => `Model deployments`,
    remote_gpu_training: () => `Remote GPU training`,
    cloud_model_backups: () => `Cloud model backups`,
};

type DetailsType = { data: Stripe.Metadata; prevData: { metadata: Stripe.Metadata; name: string } };

const Details = ({ data, prevData }: DetailsType) => {
    const { type, tier, ...metadata } = data;
    const { metadata: prevMetadata, name: prevName } = prevData;
    const { type: prevType, tier: prevTier, ...prevPartialMetadata } = prevMetadata;

    const filteredData = Object.fromEntries(
        Object.entries(metadata).filter(
            ([key]) => metadata[key] !== 'false' && metadata[key] !== prevPartialMetadata[key]
        )
    );

    const color = useColorModeValue('thia.gray.700', 'thia.gray.500');
    return (
        <Box w='full' p={5} pt={7}>
            <Text fontWeight='semi-bold'>
                {prevName ? `Everything from ${prevName}, plus:` : 'Get the basics, free:'}
            </Text>
            <Box pt={2}>
                {Object.keys(filteredData).map((key, index: number) => (
                    <Flex key={index} align='center' gap={3} color={color}>
                        <MdCheck color='green' />
                        <Text key={index} py={1}>
                            {metadataExcerpts[key](metadata[key])}
                        </Text>
                    </Flex>
                ))}
            </Box>
        </Box>
    );
};

const Pricing: NextPage = ({ plans }: any) => {
    return (
        <ContentContainer>
            <Center h='full' minH='var(--fullHeightWithoutNav)' pb='var(--header-height)'>
                <Container maxW='container.xl'>
                    <Grid templateColumns='repeat(3, 1fr)' gap={10} px={10}>
                        {plans.map((plan: ProductWithPrice, i: number) => (
                            <GridItem key={i}>
                                <Card plan={plan} numPlans={plans.length} />
                                <Details
                                    data={plan.metadata}
                                    prevData={{
                                        metadata: i ? plans[i - 1].metadata : {},
                                        name: i ? plans[i - 1].name : '',
                                    }}
                                ></Details>
                            </GridItem>
                        ))}
                    </Grid>
                </Container>
            </Center>
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
