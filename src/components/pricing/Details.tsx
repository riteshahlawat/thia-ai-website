import { ProductWithPrice, SummaryItemType } from '@/types/PricingTypes';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { MdCheck } from 'react-icons/md';
import Stripe from 'stripe';

const uc = (s: string) => s === 'Unlimited';
const summarys: { [plan: string]: (d: Stripe.Metadata) => SummaryItemType[] } = {
    Free: (d: Stripe.Metadata) => [
        { excerpt: `${d.num_models} ${uc(d.num_models) ? 'models' : 'models per month'}` },
        { excerpt: `${d.num_datasets} ${uc(d.num_datasets) ? 'datasets' : 'datasets per month'}` },
        { excerpt: `${d.num_exports} ${uc(d.num_exports) ? 'exports' : 'exports per month'}` },
        { excerpt: `${d.num_classes} classes per dataset` },
        { excerpt: `${d.num_images} images per dataset` },
        { excerpt: 'Image classification' },
        { excerpt: 'Training' },
        { excerpt: 'Testing' },
    ],
    Standard: (d: Stripe.Metadata) => [
        { excerpt: `${d.num_models} ${uc(d.num_models) ? 'models' : 'models per month'}` },
        { excerpt: `${d.num_datasets} ${uc(d.num_datasets) ? 'datasets' : 'datasets per month'}` },
        { excerpt: `${d.num_classes} classes per dataset` },
        { excerpt: `${d.num_images} images per dataset` },
        { excerpt: 'Object detection' },
        { excerpt: 'Lite exports' },
        { excerpt: 'Optimized exports' },
    ],
    Ultimate: (d: Stripe.Metadata) => [
        { excerpt: `${d.num_models} ${uc(d.num_models) ? 'models' : 'models per month'}` },
        { excerpt: `${d.num_datasets} ${uc(d.num_datasets) ? 'datasets' : 'datasets per month'}` },
        { excerpt: `${d.num_classes} classes per dataset` },
        { excerpt: `${d.num_images} images per dataset` },
        { excerpt: 'Model deployments' },
        { excerpt: 'Remote GPU training' },
        { excerpt: 'Cloud model backups' },
    ],
};

export const Details = ({ plan, prevName }: { plan: ProductWithPrice; prevName: string }) => {
    const color = useColorModeValue('thia.gray.700', 'thia.gray.500');

    return (
        <Box w='full' pt={3}>
            <Text fontWeight='semi-bold'>
                {prevName ? `Everything from ${prevName}, plus:` : 'Get the basics, free:'}
            </Text>
            <Box pt={2}>
                {summarys[plan.name](plan.metadata).map((key, i: number) => (
                    <Flex key={i} align='center' gap={3} color={color}>
                        <MdCheck color='green' />
                        <Text py={1}>{key.excerpt}</Text>
                    </Flex>
                ))}
            </Box>
        </Box>
    );
};
