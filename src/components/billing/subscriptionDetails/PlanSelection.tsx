import { ChakraNextLink } from '@/components/common/ChakraNextLink';
import { daysFromNow } from '@/utils/date';
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Modal,
    ModalOverlay,
    Stack,
    Text,
    Tooltip,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { BackendRequestHandler } from 'backend-requests/backendRequestHandler';
import { useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { useUser } from 'reactfire';
import Stripe from 'stripe';
import { ModalContent } from '../ModalContent';

interface PlanSelectionProps {
    plans: any;
    currentPlan: string;
    cancelledDate: number | null;
    subscriptionID: string;
    isPaymentMethod: boolean;
    getSubscriptionDataCallback: () => void;
}

interface SubscribleModalParams {
    plan: string;
    isLoading: boolean;
    onClick: () => void;
}

export const PlanSelection = ({
    plans,
    currentPlan,
    cancelledDate,
    getSubscriptionDataCallback,
    subscriptionID,
    isPaymentMethod,
}: PlanSelectionProps) => {
    const toast = useToast();
    const { data: user } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [modalPage, setModalPage] = useState(0);
    const [subscribingToStandard, setSubscribingToStandard] = useState(false);
    const [subscribingToUltimate, setSubscribingToUltimate] = useState(false);
    const [subscriptionCancelling, setSubscriptionCancelling] = useState(false);

    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');

    // when modal is closed
    const onModalClose = () => {
        setModalPage(0);
        onClose();
    };

    const cancelSubscription = async () => {
        if (user) {
            setSubscriptionCancelling(true);
            const idToken = await user.getIdToken();
            if (!!subscriptionID) {
                const [isError, _response] = await BackendRequestHandler.getInstance().cancelSubscriptionPlan(idToken, {
                    subscriptionID,
                });
                if (!isError) {
                    console.log(_response);
                    const response = _response as Stripe.Subscription;
                    if (response.cancel_at) {
                        const cancelledDate = new Date(response.cancel_at * 1000).toLocaleDateString(undefined, {
                            dateStyle: 'medium',
                        });
                        toast({
                            title: 'Success',
                            description: `Subscription will be cancelled on ${cancelledDate}`,
                            status: 'success',
                            duration: 5000,
                            isClosable: false,
                        });
                    }
                    getSubscriptionDataCallback();
                    onModalClose();
                } else {
                    toast({
                        title: 'Error',
                        description: _response['message'],
                        status: 'error',
                        duration: 5000,
                        isClosable: false,
                    });
                }
            } else {
                toast({
                    title: 'Error',
                    description: 'Cancelling subscription cannot be completed at this time, Please try agian later.',
                    status: 'error',
                    duration: 5000,
                    isClosable: false,
                });
            }
            setSubscriptionCancelling(false);
        }
    };

    const subscribeToStandardPlan = async () => {
        if (user) {
            setSubscribingToStandard(true);
            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().subscribeStandardPlan(idToken);
            if (isError) {
                toast({
                    title: 'Error',
                    description: response['message'],
                    status: 'error',
                    duration: 5000,
                    isClosable: false,
                });
            } else {
                getSubscriptionDataCallback();
                onModalClose();
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
                toast({
                    title: 'Error',
                    description: response['message'],
                    status: 'error',
                    duration: 5000,
                    isClosable: false,
                });
            } else {
                getSubscriptionDataCallback();
                onModalClose();
            }
            setSubscribingToUltimate(false);
        }
    };

    const onSubscribeToStandard = () => {
        setModalPage(1);
        onOpen();
    };

    const onSubscribeToUltimate = () => {
        setModalPage(2);
        onOpen();
    };

    const onCancelSubscription = () => {
        setModalPage(3);
        onOpen();
    };

    const onDowngradeToFreemium = () => {
        setModalPage(4);
        onOpen();
    };

    const SubscribeModal = ({ plan, onClick, isLoading }: SubscribleModalParams) => (
        <ModalContent title={`Switch to ${plan}`}>
            <VStack px={5} gap={5}>
                <Text align='center' fontSize='sm' color={secondaryTextColor}>
                    <Box fontWeight='semibold'>{`Update your plan by becoming a ${plan} memeber.`}</Box>
                    When you subscribe, your payment method will be charged immediately.
                </Text>
                <HStack w='full' gap={3}>
                    <Button w='50%' variant='secondary' onClick={onClose}>
                        Cancel
                    </Button>
                    <Box w='50%'>
                        <Tooltip
                            w='full'
                            hasArrow
                            shouldWrapChildren
                            isDisabled={isPaymentMethod}
                            label='Please add a default payment method to subscribe.'
                            mt={4}
                        >
                            <Button w='full' variant='primary' onClick={onClick} isLoading={isLoading} isDisabled={!isPaymentMethod}>
                                Subscribe
                            </Button>
                        </Tooltip>
                    </Box>
                </HStack>
            </VStack>
        </ModalContent>
    );

    const renderModal = () => {
        switch (modalPage) {
            case 1:
                return <SubscribeModal plan='Standard' onClick={subscribeToStandardPlan} isLoading={subscribingToStandard} />;
            case 2:
                return <SubscribeModal plan='Ultimate' onClick={subscribeToUltimatePlan} isLoading={subscribingToUltimate} />;
            case 3:
                return (
                    <ModalContent title='Cancel Subscription'>
                        <VStack px={5} gap={5}>
                            <Box textAlign='center' fontSize='sm' color={secondaryTextColor}>
                                {'Before cancelling your subscription, take a look at our more affordable plans. '}
                                <ChakraNextLink href='/pricing' styleProps={{ variant: 'purple' }}>
                                    Pricing
                                </ChakraNextLink>
                            </Box>
                            <Text align='center' fontSize='sm' color={secondaryTextColor}>
                                You can cancel your plan today, but your subscription will remain until the end of your current payment
                                period.
                            </Text>
                            <HStack w='full' gap={3}>
                                <Button w='50%' variant='secondary' onClick={onClose}>
                                    Exit
                                </Button>
                                <Button
                                    w='50%'
                                    variant='primary'
                                    onClick={cancelSubscription}
                                    isLoading={subscriptionCancelling}
                                    isDisabled={!isPaymentMethod}
                                >
                                    Confirm Cancel
                                </Button>
                            </HStack>
                        </VStack>
                    </ModalContent>
                );
            case 4:
                return (
                    <ModalContent title='Switch to Freemium'>
                        <VStack px={5} gap={5}>
                            <Box textAlign='center' fontSize='sm' color={secondaryTextColor}>
                                {'To downgrade to freemium, you must first cancel your current subscription.'}
                                <br />
                                <br />
                                {'Before cancelling your subscription, take a look at our more affordable plans. '}
                                <ChakraNextLink href='/pricing' styleProps={{ variant: 'purple' }}>
                                    Pricing
                                </ChakraNextLink>
                            </Box>
                            <Text align='center' fontSize='sm' color={secondaryTextColor}>
                                You can cancel your plan today, but your subscription will remain until the end of your current payment
                                period.
                            </Text>
                            <HStack w='full' gap={3}>
                                <Button w='50%' variant='secondary' onClick={onClose}>
                                    Exit
                                </Button>
                                <Button
                                    w='50%'
                                    variant='primary'
                                    onClick={cancelSubscription}
                                    isLoading={subscriptionCancelling}
                                    isDisabled={!isPaymentMethod}
                                >
                                    Confirm Cancel
                                </Button>
                            </HStack>
                        </VStack>
                    </ModalContent>
                );
        }
    };

    const UpgradeButton = ({ onClick }: { onClick: () => void }) => (
        <Button variant='primary' onClick={onClick}>
            Upgrade
        </Button>
    );

    const DowngradeButton = ({ onClick }: { onClick: () => void }) => (
        <Button variant='secondary' onClick={onClick}>
            Downgrade
        </Button>
    );

    const renderButton = (plan: string) => {
        let ButtonUI;

        if (plan === currentPlan) {
            if (currentPlan !== 'freemium')
                if (!!cancelledDate)
                    ButtonUI = (
                        <Text fontStyle='italic' fontSize='sm' color={secondaryTextColor}>{`${daysFromNow(
                            cancelledDate * 1000
                        )} days remaining`}</Text>
                    );
                else
                    ButtonUI = (
                        <Button onClick={onCancelSubscription} variant='secondary' colorScheme='purple'>
                            Cancel Subscription
                        </Button>
                    );
            else ButtonUI = <Button isDisabled>Current Plan</Button>;
        } else {
            if (currentPlan === 'freemium') {
                if (plan === 'standard') ButtonUI = <UpgradeButton onClick={onSubscribeToStandard} />;
                else if (plan === 'ultimate') ButtonUI = <UpgradeButton onClick={onSubscribeToUltimate} />;
            } else {
                if (!cancelledDate) {
                    if (currentPlan === 'standard') {
                        if (plan === 'freemium') ButtonUI = <DowngradeButton onClick={onDowngradeToFreemium} />;
                        else if (plan === 'ultimate') ButtonUI = <UpgradeButton onClick={onSubscribeToUltimate} />;
                    } else if (currentPlan === 'ultimate') {
                        if (plan === 'freemium') ButtonUI = <DowngradeButton onClick={onDowngradeToFreemium} />;
                        else if (plan === 'standard') ButtonUI = <DowngradeButton onClick={onSubscribeToStandard} />;
                    }
                } else {
                    if (plan === 'freemium')
                        ButtonUI = (
                            <Button variant='secondary' isDisabled>
                                Downgrade
                            </Button>
                        );
                    else if (plan === 'ultimate') ButtonUI = <UpgradeButton onClick={onSubscribeToUltimate} />;
                    else if (plan === 'standard') ButtonUI = <DowngradeButton onClick={onSubscribeToStandard} />;
                }
            }
        }
        return (
            <HStack gap={3} justify='space-between' w='full'>
                <Box flexGrow={1}>{ButtonUI}</Box>
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
        <>
            <Stack direction={{ base: 'column', lg: 'row' }} gap={5} align='stretch'>
                {plans.map((plan: any, i: number) => {
                    const name = plan.name.toLowerCase();
                    return (
                        <Box
                            key={i}
                            p={5}
                            rounded='xl'
                            w='full'
                            border={name === currentPlan ? '2px' : '1px'}
                            borderColor={
                                name === currentPlan
                                    ? useColorModeValue('thia.purple.300', 'thia.purple.700')
                                    : useColorModeValue('thia.gray.100', 'thia.gray.990')
                            }
                            bg={useColorModeValue('white', 'thia.gray.990')}
                        >
                            <VStack align='start' gap={3} h='full' justify='space-between'>
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
                                        <Box as='span' fontWeight='light' color={secondaryTextColor}>
                                            /month
                                        </Box>
                                    </Text>
                                </HStack>
                                {renderButton(name)}
                            </VStack>
                        </Box>
                    );
                })}
            </Stack>
            <Modal isOpen={isOpen} onClose={onModalClose} isCentered size='md'>
                <ModalOverlay bg='blackAlpha.50' backdropFilter='blur(32px)' />
                {renderModal()}
            </Modal>
        </>
    );
};
