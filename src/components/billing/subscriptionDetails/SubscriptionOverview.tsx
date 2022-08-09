import React, { useEffect, useState } from 'react';
import Stripe from 'stripe';
import { BorderBox } from '../BorderBox';
import { Box, Button, Flex, Progress, Skeleton, Tag, Text, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react';
import { useUser } from 'reactfire';
import { BackendRequestHandler } from 'backend-requests/backendRequestHandler';
import { ChakraNextLink } from '@/components/common/ChakraNextLink';
import { RiArrowRightUpLine } from 'react-icons/ri';

export const SubscriptionOverview = ({ role }: { role: string }) => {
    const { data: user } = useUser();
    const [subscription, setSubscription] = useState<Stripe.Subscription>();
    const [product, setProduct] = useState<Stripe.Product>();

    const currentPlan = role?.toLowerCase();

    const plan = subscription?.items.data[0].plan;
    const amount = plan?.amount ?? 0;
    const interval = plan?.interval ?? 'month';

    let diffInDays = 31;
    let daysCompleted = 0;
    if (subscription) {
        const currentPeriodStart = subscription?.current_period_start * 1000;
        const currentPeriodEnd = subscription?.current_period_end * 1000;
        daysCompleted = Math.ceil((Date.now() - currentPeriodStart) / (1000 * 60 * 60 * 24));
        diffInDays = Math.ceil((currentPeriodEnd - currentPeriodStart) / (1000 * 60 * 60 * 24));
    }

    const getSubscriptionData = async () => {
        if (user) {
            const idToken = await user.getIdToken();
            const [isSubscriptionListError, subscriptionListRes] = await BackendRequestHandler.getInstance().listSubscriptionPlan(idToken);

            if (!isSubscriptionListError) {
                console.log(subscriptionListRes.data[0]);
                const subscriptionItem = subscriptionListRes.data[0];

                const [productError, productRes] = await BackendRequestHandler.getInstance().getProductById(
                    idToken,
                    subscriptionItem?.plan.product ?? process.env.NEXT_PUBLIC_FREEMIUM_PRODUCT_ID
                );

                if (!productError) setProduct(productRes);

                console.log('sd', subscriptionItem);
                setSubscription(subscriptionItem);
            }
        }
    };

    useEffect(() => {
        getSubscriptionData();
    }, [user]);

    const borderColor = useColorModeValue('thia.gray.50', 'thia.gray.950');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');

    return (
        <>
            <BorderBox>
                <VStack h='full'>
                    <VStack px={[3, 3, 5, 5, 5]} py={5} w='full' h='full'>
                        <Flex w='full' gap={10} justify='space-between' flexGrow={1}>
                            <Box>
                                <Flex gap={2}>
                                    <Text fontWeight='bold' casing='capitalize'>
                                        {currentPlan}
                                    </Text>
                                    <Tag rounded='full' colorScheme={'purple'} fontWeight='semibold' textTransform='capitalize'>
                                        {interval && !!amount ? `${interval}ly` : 'Free'}
                                    </Tag>
                                </Flex>
                                <Skeleton isLoaded={!!product}>
                                    <Text mt={1.5} fontSize='sm' color={secondaryTextColor}>
                                        {product?.description}
                                    </Text>
                                </Skeleton>
                            </Box>
                            <Flex gap={1} flexShrink={0}>
                                <Text fontWeight='bold' fontSize='4xl' letterSpacing='wide'>
                                    {`$${amount / 100}`}
                                </Text>
                                <Text pt={6} fontSize='sm' fontWeight='semibold' letterSpacing='wide' color={secondaryTextColor}>
                                    {`per ${interval}`}
                                </Text>
                            </Flex>
                        </Flex>
                        {subscription && (
                            <Box w='full'>
                                <Text pb={2} fontSize='sm'>{`${daysCompleted} days until next payment`}</Text>
                                <Progress rounded='full' value={(daysCompleted / diffInDays) * 100} size='sm' colorScheme='thia.purple' />
                            </Box>
                        )}
                    </VStack>
                    <Box w='full' textAlign='end' py={3} px={5} borderTop='2px' borderTopColor={borderColor}>
                        <ChakraNextLink href='/' styleProps={{ variant: 'purple', fontSize: 'sm' }}>
                            <Flex align='center' justify='flex-end'>
                                Change plan <RiArrowRightUpLine fontSize={18} />
                            </Flex>
                        </ChakraNextLink>
                    </Box>
                </VStack>
            </BorderBox>
        </>
    );
};
