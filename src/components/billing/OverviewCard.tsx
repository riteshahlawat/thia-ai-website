import React from 'react';
import Stripe from 'stripe';
import { BorderBox } from './BorderBox';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { ChakraNextLink } from '../common/ChakraNextLink';
import { Box, Flex, Progress, Tag, Text, useColorModeValue } from '@chakra-ui/react';

export const OverviewCard = ({ plan, role }: { plan: Stripe.Plan; role: string }) => {
    const amount = plan?.amount ?? 0;
    const interval = plan?.interval;

    const borderColor = useColorModeValue('thia.gray.50', 'thia.gray.950');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');

    return (
        <BorderBox>
            <Flex flexDir='column' h='full'>
                <Flex gap={10} p={5} justify='space-between' flexGrow={1}>
                    <Box>
                        <Flex gap={2}>
                            <Text fontWeight='bold' casing='capitalize'>
                                {role}
                            </Text>
                            <Tag rounded='full' colorScheme={'purple'} fontWeight='semibold' textTransform='capitalize'>
                                {interval ? `${plan.interval}ly` : '--'}
                            </Tag>
                        </Flex>
                        <Text pt={1} fontSize='sm' color={secondaryTextColor}>
                            Its free for everyone, especially broke bitches.
                        </Text>
                    </Box>
                    <Flex gap={1} flexShrink={0}>
                        <Text fontWeight='semibold' fontSize='4xl' letterSpacing='wide'>
                            {`$${amount / 100}`}
                        </Text>
                        <Text pt={6} fontSize='sm' fontWeight='semibold' letterSpacing='wide' color={secondaryTextColor}>
                            {`per ${interval ?? '--'}`}
                        </Text>
                    </Flex>
                </Flex>
                <Box p={5}>
                    <Progress rounded='full' value={20} size='sm' colorScheme='thia.purple' />
                </Box>
                <Box w='full' textAlign='end' py={3} px={5} borderTop='2px' borderTopColor={borderColor}>
                    <ChakraNextLink href='/' styleProps={{ variant: 'purple', fontSize: 'sm' }}>
                        <Flex align='center' justify='flex-end'>
                            Change plan <RiArrowRightUpLine fontSize={18} />
                        </Flex>
                    </ChakraNextLink>
                </Box>
            </Flex>
        </BorderBox>
    );
};
