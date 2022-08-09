import { ChakraNextLink } from '@/components/common/ChakraNextLink';
import { Box, Button, Flex, Heading, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { BackendRequestHandler } from 'backend-requests/backendRequestHandler';
import { useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { useUser } from 'reactfire';
import Stripe from 'stripe';

export const PlanSelection = ({ plans, currentPlan, getSubscriptionDataCallback, subscriptionID }: any) => {
    const { data: user } = useUser();
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');
    const [subscribingToStandard, setSubscribingToStandard] = useState(false);
    const [subscribingToUltimate, setSubscribingToUltimate] = useState(false);
    const [subscriptionCancelling, setSubscriptionCancelling] = useState(false);

    const cancelSubscription = async () => {
        if (user) {
            setSubscriptionCancelling(true);
            const idToken = await user.getIdToken();
            const [isError, _response] = await BackendRequestHandler.getInstance().cancelSubscriptionPlan(idToken, {
                subscriptionID: subscriptionID,
            });
            if (!isError) {
                console.log(_response);
                const response = _response as Stripe.Subscription;
                if (response.cancel_at) {
                    const cancelledDate = new Date(response.cancel_at * 1000).toLocaleDateString(undefined, {
                        dateStyle: 'medium',
                    });
                    // toast({
                    //     title: 'Success',
                    //     description: `Subscription will be cancelled on ${cancelledDate}`,
                    //     status: 'success',
                    //     duration: 2500,
                    //     isClosable: false,
                    // });
                }
                await getSubscriptionDataCallback();
            } else {
                // toast({
                //     title: 'Error',
                //     description: _response['message'],
                //     status: 'error',
                //     duration: 2500,
                //     isClosable: false,
                // });
            }
            setSubscriptionCancelling(false);
        }
    };

    const subscribeToStandardPlan = async () => {
        console.log('poop');
        if (user) {
            setSubscribingToStandard(true);
            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().subscribeStandardPlan(idToken);
            if (isError) {
                // toast({
                //     title: 'Error',
                //     description: response['message'],
                //     status: 'error',
                //     duration: 2500,
                //     isClosable: false,
                // });
            } else {
                getSubscriptionDataCallback();
            }
            setSubscribingToStandard(false);
        }
    };

    const subscribeToUltimatePlan = async () => {
        if (user) {
            setSubscribingToUltimate(true);
            const idToken = await user.getIdToken(false);
            const [isError, response] = await BackendRequestHandler.getInstance().subscribePremiumPlan(idToken);
            if (isError) {
                // toast({
                //     title: 'Error',
                //     description: response['message'],
                //     status: 'error',
                //     duration: 2500,
                //     isClosable: false,
                // });
            } else {
                console.log('poop');
                getSubscriptionDataCallback();
            }
            setSubscribingToUltimate(false);
        }
    };

    const renderButton = (plan: string) => {
        let ButtonUI;

        if (plan === currentPlan) {
            if (currentPlan !== 'freemium')
                ButtonUI = (
                    <Button onClick={cancelSubscription} isLoading={subscriptionCancelling}>
                        Cancel Subscription
                    </Button>
                );
        } else {
            if (currentPlan === 'freemium') {
                if (plan === 'standard') {
                    ButtonUI = (
                        <Button onClick={subscribeToStandardPlan} isLoading={subscribingToStandard}>
                            Upgrade
                        </Button>
                    );
                } else if (plan === 'ultimate') {
                    ButtonUI = (
                        <Button onClick={subscribeToUltimatePlan} isLoading={subscribingToUltimate}>
                            Upgrade
                        </Button>
                    );
                }
            } else if (currentPlan === 'standard') {
                if (plan === 'freemium') {
                    ButtonUI = <Button>Downgrade</Button>;
                } else if (plan === 'ultimate') {
                    ButtonUI = (
                        <Button onClick={subscribeToUltimatePlan} isLoading={subscribingToUltimate}>
                            Upgrade
                        </Button>
                    );
                }
            } else {
                if (plan === 'freemium') {
                    ButtonUI = <Button>Downgrade</Button>;
                } else if (plan === 'standard') {
                    ButtonUI = (
                        <Button onClick={subscribeToStandardPlan} isLoading={subscribingToStandard}>
                            Downgrade
                        </Button>
                    );
                }
            }
        }

        return (
            <HStack gap={3} justify='space-between' w='full'>
                {ButtonUI}
                <ChakraNextLink href='/pricing'>
                    <Flex align='center'>
                        <Text fontSize='sm' fontWeight='medium'>
                            Learn more
                        </Text>
                        <MdChevronRight fontSize={18} />
                    </Flex>
                </ChakraNextLink>
            </HStack>
        );
    };
    return (
        <HStack gap={5} align='stretch'>
            {plans.map((plan: any, i: number) => {
                const name = plan.name.toLowerCase();
                return (
                    <Box key={i} p={5} rounded='xl' w='full' bg={name === currentPlan ? 'thia.purple.800' : 'thia.gray.950'}>
                        <VStack align='start' gap={3}>
                            <HStack justify='space-between' w='full' fontSize='lg' gap={5} align='start'>
                                <Box>
                                    <Heading fontSize='2xl' pb={1}>
                                        {plan.name}
                                    </Heading>
                                    <Text fontSize='xs' color={secondaryTextColor}>
                                        {plan.description}
                                    </Text>
                                </Box>
                                <Text fontWeight='medium' letterSpacing='wide'>
                                    {`$${plan.price.unit_amount / 100}`}
                                    <Box as='span' fontWeight='thin' color={secondaryTextColor}>
                                        /month
                                    </Box>
                                </Text>
                            </HStack>
                            {renderButton(name)}
                        </VStack>
                    </Box>
                );
            })}
        </HStack>
    );
};
