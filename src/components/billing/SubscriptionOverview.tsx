import React from 'react';
import Stripe from 'stripe';
import { BorderBox } from './BorderBox';
import { Box, Flex, Progress, Skeleton, Spinner, Tag, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { ChakraNextLink } from '@/components/common/ChakraNextLink';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { daysFromNow, diffInDays } from '@/utils/date';

interface SubscriptionOverviewProps {
    subscription: Stripe.Subscription | undefined;
    product: Stripe.Product | undefined;
    cancelledDate: number | null;
    subscriptionLoaded: boolean;
}

export const SubscriptionOverview = ({ subscription, product, cancelledDate, subscriptionLoaded }: SubscriptionOverviewProps) => {
    const plan = subscription?.items.data[0].plan;
    const amount = plan?.amount ?? 0;
    const interval = plan?.interval ?? 'month';

    let currentPeriodLength = 31;
    let daysElapsed = 0;

    if (subscription) {
        const currentPeriodStart = subscription?.current_period_start * 1000;
        const currentPeriodEnd = subscription?.current_period_end * 1000;
        daysElapsed = daysFromNow(currentPeriodStart) * -1;
        currentPeriodLength = diffInDays(currentPeriodEnd, currentPeriodStart);
    }

    const borderColor = useColorModeValue('thia.gray.50', 'thia.gray.950');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');
    const spinnerColor = useColorModeValue('thia.ray.700', 'thia.gray.300');

    const renderPaymentProgress = () => {
        return (
            <>
                {
                    <Skeleton w='full' isLoaded={subscriptionLoaded} py='1'>
                        {!cancelledDate ? (
                            <>
                                <Text pb={2} fontSize='sm'>
                                    {`${currentPeriodLength - daysElapsed} days until next payment`}
                                </Text>
                                <Progress
                                    rounded='full'
                                    value={(daysElapsed / currentPeriodLength) * 100}
                                    size='sm'
                                    colorScheme='thia.purple'
                                />
                            </>
                        ) : (
                            <Text fontStyle='italic' fontSize='sm'>
                                <Box as='span' fontWeight='semibold'>
                                    {daysFromNow(cancelledDate * 1000)}
                                </Box>
                                {` days remaining`}
                            </Text>
                        )}
                    </Skeleton>
                }
            </>
        );
    };

    const renderSubscriptionPrice = () => {
        if (subscriptionLoaded) {
            return (
                <Text fontWeight='bold' fontSize='4xl' letterSpacing='wide'>
                    {`$${amount / 100}`}
                </Text>
            );
        } else {
            return <Spinner color={spinnerColor} mt='4' mr='2' />;
        }
    };
    return (
        <>
            <BorderBox>
                <VStack h='full'>
                    <VStack px={[3, 3, 5, 5, 5]} pt={5} pb={3} w='full' h='full'>
                        <Flex w='full' gap={10} justify='space-between' flexGrow={1}>
                            <Skeleton isLoaded={subscriptionLoaded}>
                                <Flex gap={2}>
                                    <Text fontWeight='bold' casing='capitalize'>
                                        {product?.name}
                                    </Text>
                                    <Tag rounded='full' colorScheme={'purple'} fontWeight='semibold' textTransform='capitalize'>
                                        {interval && !!amount ? `${interval}ly` : 'Free'}
                                    </Tag>
                                </Flex>
                                <Text mt={1} fontSize='sm' color={secondaryTextColor}>
                                    {product?.description}
                                </Text>
                            </Skeleton>
                            <Flex gap={1} flexShrink={0}>
                                {renderSubscriptionPrice()}
                                <Text pt={6} fontSize='sm' fontWeight='semibold' letterSpacing='wide' color={secondaryTextColor}>
                                    {`/ ${interval}`}
                                </Text>
                            </Flex>
                        </Flex>
                        {renderPaymentProgress()}
                    </VStack>
                    <Box w='full' textAlign='end' py={3} px={5} borderTop='2px' borderTopColor={borderColor}>
                        <ChakraNextLink href='/pricing' styleProps={{ variant: 'purple', fontSize: 'sm' }}>
                            <Flex align='center' justify='flex-end'>
                                View plans <RiArrowRightUpLine fontSize={18} />
                            </Flex>
                        </ChakraNextLink>
                    </Box>
                </VStack>
            </BorderBox>
        </>
    );
};
