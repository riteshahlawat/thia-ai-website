import React from 'react';
import { ProductWithPrice } from '@/types/PricingTypes';
import {
    Box,
    Center,
    Flex,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from '@chakra-ui/react';
import { MdCheck } from 'react-icons/md';

export const Comparison = ({ plans }: { plans: ProductWithPrice[] }) => {
    const data: { [key: string]: { order: number; excerpt: string } } = {
        num_models: { order: 1, excerpt: 'Models per month' },
        num_datasets: { order: 2, excerpt: 'Datasets per month' },
        num_exports: { order: 3, excerpt: 'Exports per month' },
        num_classes: { order: 4, excerpt: 'Classes per dataset' },
        num_images: { order: 5, excerpt: 'Images per dataset' },
        image_classification: { order: 6, excerpt: 'Image Classification' },
        testing: { order: 7, excerpt: 'Testing' },
        training: { order: 8, excerpt: 'Training' },
        object_detection: { order: 9, excerpt: 'Object Detection' },
        lite_exports: { order: 10, excerpt: 'Lite exports' },
        optimized_exports: { order: 11, excerpt: 'Optimized exports' },
        model_deployments: { order: 12, excerpt: 'Model deployments' },
        remote_gpu_training: { order: 13, excerpt: 'Remote GPU training' },
        cloud_model_backups: { order: 14, excerpt: 'Cloud model backups' },
    };

    const metadata = plans.map(({ metadata }) => {
        const { type, tier, ...rest } = metadata;
        return rest;
    });

    const out: { [key: string]: string[] } = {};
    for (const obj of metadata) {
        for (const key of Object.keys(obj)) {
            if (!out.hasOwnProperty(key)) out[key] = [obj[key]];
            else out[key].push(obj[key]);
        }
    }
    const sorted: { [key: string]: string[] } = Object.keys(out)
        .sort((a, b) => data[a].order - data[b].order)
        .reduce((acc: { [key: string]: string[] }, key): {} => {
            acc[key] = out[key];
            return acc;
        }, {});

    const r = (str: string) => {
        if (str === 'true') {
            return <MdCheck fontSize='24px' color='green' />;
        } else if (str === 'false') {
            return '';
        } else {
            return str;
        }
    };

    const headerColor = useColorModeValue('thia.gray.900', 'thia.gray.100');
    return (
        <TableContainer py={10} id='comparison-table'>
            <Table>
                <Thead bg={useColorModeValue('thia.gray.50', 'thia.gray.990')}>
                    <Tr>
                        <Th></Th>
                        {plans.map((plan, i) => (
                            <Th key={i} color={headerColor}>
                                <Center py={3}>
                                    <Flex direction='column' px={5} gap={1}>
                                        <Heading>{plan.name}</Heading>
                                        <Flex gap={1}>
                                            <Box as='span'>
                                                ${' '}
                                                {plan.price.unit_amount !== null &&
                                                    plan.price.unit_amount / 100}
                                            </Box>
                                            <Text color='thia.gray.700'>/ month</Text>
                                        </Flex>
                                    </Flex>
                                </Center>
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {Object.entries(sorted).map(([key, val]) => (
                        <Tr key={key}>
                            <Td textAlign='center'>
                                <Text casing='capitalize'>{data[key].excerpt}</Text>
                            </Td>
                            {val.map((v, i) => (
                                <Td key={i}>
                                    <Center>{r(v)}</Center>
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
