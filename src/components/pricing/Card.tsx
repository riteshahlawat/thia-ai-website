import React from 'react';
import { CardType } from '@/types/PricingTypes';
import { MdChevronRight } from 'react-icons/md';
import { Box, Button, Flex, Heading, Text, useColorModeValue, VStack } from '@chakra-ui/react';

export const Card = ({ plan, children }: CardType) => {
    const free = !plan.price.unit_amount;

    return (
        <VStack
            w='full'
            p={{ base: 7, lg: 10 }}
            bg={useColorModeValue('white', 'thia.gray.990')}
            rounded='xl'
            align='center'
            spacing={3}
            justify='space-between'
            border='2px'
            borderColor={useColorModeValue('thia.gray.100', 'black')}
            transitionDuration='300ms'
            shadow='xl'
            _hover={{
                border: '2px',
                borderColor: useColorModeValue('thia.purple.200', 'thia.purple.800'),
            }}
        >
            <Heading>{plan.name}</Heading>
            <Text color={useColorModeValue('thia.gray.800', 'thia.gray.300')}>
                {plan.description}
            </Text>
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
            {children && <Box>{children}</Box>}
            <Box pt={5} w='full'>
                <Button
                    w='full'
                    variant={free ? 'secondary' : 'primaryOutline'}
                    rightIcon={free ? <MdChevronRight /> : undefined}
                >
                    {free ? 'Get started' : `Buy ${plan.name}`}
                </Button>
            </Box>
        </VStack>
    );
};
