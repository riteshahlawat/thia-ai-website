import { ProductWithPrice, SummaryItemType } from '@/types/PricingTypes';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { MdCheck } from 'react-icons/md';
import Stripe from 'stripe';

const u = (s: string) => s === 'Unlimited'; // unlimited check
const n = (s: string) => (Number(s) ? Number(s).toLocaleString('US-en') : s); // number check

const modelExcerpt = (m: string) => `${u(m) ? '' : 'Max'} ${n(m)} models`;
const datasetExcerpt = (d: string) => `${u(d) ? '' : 'Max'} ${n(d)} datasets`;
const imagesExcerpt = (i: string) => `${n(i)} images per dataset`;
const classesExcerpt = (c: string) => `${n(c)} classes per dataset`;

const summarys: { [plan: string]: (d: Stripe.Metadata) => SummaryItemType[] } = {
    Free: ({ num_models, num_datasets, num_exports, num_images, num_classes }: Stripe.Metadata) => [
        { excerpt: modelExcerpt(num_models) },
        { excerpt: datasetExcerpt(num_datasets) },
        { excerpt: `${num_exports} ${u(num_exports) ? 'exports' : 'exports per month'}` },
        { excerpt: classesExcerpt(num_classes) },
        { excerpt: imagesExcerpt(num_images) },
        { excerpt: 'Image classification' },
        { excerpt: 'Training' },
        { excerpt: 'Testing' },
    ],
    Standard: ({ num_models, num_datasets, num_images, num_classes }: Stripe.Metadata) => [
        { excerpt: modelExcerpt(num_models) },
        { excerpt: datasetExcerpt(num_datasets) },
        { excerpt: classesExcerpt(num_classes) },
        { excerpt: imagesExcerpt(num_images) },
        { excerpt: 'Object detection' },
        { excerpt: 'Lite exports' },
        { excerpt: 'Optimized exports' },
    ],
    Ultimate: ({ num_models, num_datasets, num_images, num_classes }: Stripe.Metadata) => [
        { excerpt: modelExcerpt(num_models) },
        { excerpt: datasetExcerpt(num_datasets) },
        { excerpt: classesExcerpt(num_classes) },
        { excerpt: imagesExcerpt(num_images) },
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
