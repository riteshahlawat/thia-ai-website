import React, { useEffect, useState } from 'react';
import Stripe from 'stripe';
import { BorderBox } from '../BorderBox';
import { Box, Button, Flex, Progress, Tag, Text, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react';
import { useUser } from 'reactfire';
import { BackendRequestHandler } from 'backend-requests/backendRequestHandler';
import { ChakraNextLink } from '@/components/common/ChakraNextLink';
import { RiArrowRightUpLine } from 'react-icons/ri';

export const SubscriptionOverview = ({ role }: { role: string }) => {
    const { data: user } = useUser();
    const [subscription, setSubscription] = useState<Stripe.SubscriptionItem>();
    const [product, setProduct] = useState<Stripe.Product>();

    const plan = subscription?.plan;
    const amount = plan?.amount ?? 0;
    const interval = plan?.interval;
    const currentPlan = role?.toLowerCase();
    const borderColor = useColorModeValue('thia.gray.50', 'thia.gray.950');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');

    const getSubscriptionData = async () => {
        if (user) {
            const idToken = await user.getIdToken();
            const [isSubscriptionListError, subscriptionListRes] = await BackendRequestHandler.getInstance().listSubscriptionPlan(idToken);

            if (!isSubscriptionListError) {
                const subscriptionItem = subscriptionListRes.data[0];
                const [productError, productRes] = await BackendRequestHandler.getInstance().getProductById(
                    idToken,
                    subscriptionItem.plan.product
                );
                if (!productError) setProduct(productRes);
                setSubscription(subscriptionItem);
            }
        }
    };

    useEffect(() => {
        getSubscriptionData();
    }, [user]);

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
                                        {interval ? `${plan.interval}ly` : 'Free'}
                                    </Tag>
                                </Flex>
                                <Text pt={1} fontSize='sm' color={secondaryTextColor}>
                                    {product?.description}
                                </Text>
                            </Box>
                            <Flex gap={1} flexShrink={0}>
                                <Text fontWeight='bold' fontSize='4xl' letterSpacing='wide'>
                                    {`$${amount / 100}`}
                                </Text>
                                <Text pt={6} fontSize='sm' fontWeight='semibold' letterSpacing='wide' color={secondaryTextColor}>
                                    {`per ${interval ?? 'month'}`}
                                </Text>
                            </Flex>
                        </Flex>
                        <Box w='full'>
                            <Text>{`${25} days until next payment`}</Text>
                            <Progress rounded='full' value={20} size='sm' colorScheme='thia.purple' />
                        </Box>
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
