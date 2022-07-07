import { ProductWithPrice, SummaryItemType } from '@/types/PricingTypes';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { MdCheck } from 'react-icons/md';
import Stripe from 'stripe';

const uc = (s: string) => s === 'Unlimited';
const summarys: { [plan: string]: (d: Stripe.Metadata) => SummaryItemType[] } = {
    Free: ({ num_models, num_datasets, num_exports, num_images, num_classes }: Stripe.Metadata) => [
        { excerpt: uc(num_models) ? `${num_models} models` : `Max ${num_models} models` },
        { excerpt: uc(num_datasets) ? `${num_datasets} datasets` : `Max ${num_datasets} datasets` },
        { excerpt: `${num_exports} ${uc(num_exports) ? 'exports' : 'exports per month'}` },
        { excerpt: `${num_classes} classes per dataset` },
        { excerpt: `${num_images} images per dataset` },
        { excerpt: 'Image classification' },
        { excerpt: 'Training' },
        { excerpt: 'Testing' },
    ],
    Standard: ({ num_models, num_datasets, num_images, num_classes }: Stripe.Metadata) => [
        { excerpt: uc(num_models) ? `${num_models} models` : `Max ${num_models} models` },
        { excerpt: uc(num_datasets) ? `${num_datasets} datasets` : `Max ${num_datasets} datasets` },
        { excerpt: `${num_classes} classes per dataset` },
        { excerpt: `${num_images} images per dataset` },
        { excerpt: 'Object detection' },
        { excerpt: 'Lite exports' },
        { excerpt: 'Optimized exports' },
    ],
    Ultimate: ({ num_models, num_datasets, num_images, num_classes }: Stripe.Metadata) => [
        { excerpt: uc(num_models) ? `${num_models} models` : `Max ${num_models} models` },
        { excerpt: uc(num_datasets) ? `${num_datasets} datasets` : `Max ${num_datasets} datasets` },
        { excerpt: `${num_classes} classes per dataset` },
        { excerpt: `${num_images} images per dataset` },
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
