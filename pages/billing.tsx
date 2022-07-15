import React, { useEffect, useState } from 'react';
import { useUser } from 'reactfire';
import {
    Box,
    Button,
    Center,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    List,
    ListIcon,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Stack,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CardElement, Elements, PaymentElement } from '@stripe/react-stripe-js';
import submitCardElement from '../src/hooks/submitCardElement';
import { FaCheckCircle } from 'react-icons/fa';
import { BackendRequestHandler } from '../backend-requests/backendRequestHandler';
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';
import { getStripePublicKey } from './_app';
import { IdTokenResult, User } from 'firebase/auth';

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#aab7c4',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};

const options = [
    { id: 1, desc: '1 lorem ipsum' },
    { id: 2, desc: 'Lorem, ipsum dolor.' },
    { id: 3, desc: 'Monthly Updates' },
];
interface PackageTierProps {
    title: string;
    options: Array<{ id: number; desc: string }>;
    typePlan: string;
    checked?: boolean;
}
const PackageTier = ({ title, options, typePlan, checked = false }: PackageTierProps) => {
    return (
        <Stack
            p={3}
            py={3}
            justifyContent={{
                base: 'flex-start',
                md: 'space-around',
            }}
            direction={{
                base: 'column',
                md: 'row',
            }}
            alignItems={{ md: 'center' }}
        >
            <Heading size={'md'}>{title}</Heading>
            <List spacing={3} textAlign='start'>
                {options.map((desc, id) => (
                    <ListItem key={desc.id}>
                        <ListIcon as={FaCheckCircle} color='green.500' />
                        {desc.desc}
                    </ListItem>
                ))}
            </List>
            <Heading size={'xl'}>{typePlan}</Heading>
        </Stack>
    );
};

interface SubscriptionProps {
    subscription: Stripe.Subscription;
    loadData: () => Promise<void>;
}
const Subscription = ({ subscription, loadData }: SubscriptionProps) => {
    const { data: user } = useUser();
    const toast = useToast();
    const [subscriptionCancelling, setSubscriptionCancelling] = useState(false);

    const cancelSubscription = async () => {
        if (user) {
            setSubscriptionCancelling(true);
            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().cancelSubscriptionPlan(idToken, {
                subscriptionID: subscription.id,
            });
            if (!isError) {
                await loadData();
            } else {
                toast({
                    title: 'Error',
                    description: response['message'],
                    status: 'error',
                    duration: 2500,
                    isClosable: false,
                });
            }
            setSubscriptionCancelling(false);
        }
    };

    return (
        <Box>
            <Heading fontSize='lg'>{subscription.id}</Heading>
            <Box>Status: {subscription.status}</Box>
            <Button onClick={cancelSubscription} isLoading={subscriptionCancelling} loadingText='Cancelling'>
                Cancel Subscription
            </Button>
        </Box>
    );
};

interface CardProps {
    card: Stripe.PaymentMethod;
    defaultCardID: string | null;
    loadData: () => Promise<void>;
}
const Card = ({ card, defaultCardID, loadData }: CardProps) => {
    const { data: user } = useUser();
    const toast = useToast();

    const [changingDefaultCard, setChangingDefaultCard] = useState(false);
    const [removingCard, setRemovingCard] = useState(false);

    const removeCard = async () => {
        if (user) {
            setRemovingCard(true);
            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().detachCard(idToken, {
                paymentMethodID: card.id,
            });
            if (!isError) {
                await loadData();
            } else {
                toast({
                    title: 'Error',
                    description: response['message'],
                    status: 'error',
                    duration: 2500,
                    isClosable: false,
                });
            }
            setRemovingCard(false);
        }
    };

    const renderDefaultCard = () => {
        if (defaultCardID && card.id === defaultCardID) {
            return (
                <Heading fontSize='sm' color='thia.purple.500'>
                    Default Card
                </Heading>
            );
        }
    };

    const setDefaultCard = async () => {
        if (user) {
            setChangingDefaultCard(true);
            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().updateDefaultCard(idToken, {
                paymentMethodID: card.id,
            });
            if (!isError) {
                await loadData();
            } else {
                toast({
                    title: 'Error',
                    description: response['message'],
                    status: 'error',
                    duration: 2500,
                    isClosable: false,
                });
            }
            setChangingDefaultCard(false);
        }
    };

    const renderSetDefaultButton = () => {
        if ((defaultCardID && card.id !== defaultCardID) || defaultCardID === null) {
            return (
                <Button onClick={setDefaultCard} isLoading={changingDefaultCard} loadingText='Updating'>
                    Set Default Card
                </Button>
            );
        }
    };

    return (
        <Box>
            <Heading fontSize='lg'>{card.id}</Heading>
            <Box>
                Expiry Date: {card.card?.exp_month}/{card.card?.exp_year}
            </Box>
            <Box>Card Last 4 Numbers: {card.card?.last4}</Box>
            {renderDefaultCard()}
            <Button onClick={removeCard} isLoading={removingCard} loadingText='Removing'>
                Remove Card
            </Button>
            {renderSetDefaultButton()}
        </Box>
    );
};
const BillingParent = () => {
    const stripePromise = loadStripe(getStripePublicKey());
    return (
        <Elements stripe={stripePromise}>
            <Billing />
        </Elements>
    );
};
const Billing = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: user } = useUser();
    const toast = useToast();
    const [subscription, setSubscription] = useState<Stripe.Subscription[]>([]);
    const [cards, setCards] = useState<Stripe.PaymentMethod[]>([]);
    const [defaultCardID, setDefaultCardID] = useState<string | null>(null);
    const [userIdToken, setUserIdToken] = useState<IdTokenResult>();
    const [subscriptionChanging, setSubscriptionChanging] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);

    const loadData = async () => {
        setDataLoading(true);
        await fetchClaims();
        await fetchSubscriptionAndCards();
        setDataLoading(false);
    };

    const { handleSubmit: addCardToUser, isCardSubmitting } = submitCardElement(
        async () => {
            onClose();
            await loadData();
        },
        onClose,
        defaultCardID
    );

    const fetchClaims = async () => {
        if (user) {
            const idToken = await user.getIdTokenResult(true);
            console.log('Role:', idToken.claims.role);

            setUserIdToken(idToken);
        }
    };

    const fetchSubscriptionAndCards = async () => {
        if (user) {
            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().listSubscriptionPlan(idToken);
            if (!isError) {
                console.log('Subscription:', response.data.length);
                setSubscription(response.data);
            }
            const [isError2, response2] = await BackendRequestHandler.getInstance().listCards(idToken);
            if (!isError2) {
                console.log('Cards:', response2.data.length);
                setCards(response2.data);
            }

            const [isError3, response3] = await BackendRequestHandler.getInstance().getDefaultCard(idToken);
            if (!isError3) {
                console.log('Default Card:', response3);
                setDefaultCardID(response3);
            }
        }
    };

    useEffect(() => {
        if (user === null) {
            router.push('/signin');
        }
        loadData();
    }, [user]);

    if (!subscription) {
        return <></>;
    }

    const subscribeToStandardPlan = async () => {
        if (user) {
            setSubscriptionChanging(true);
            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().subscribeStandardPlan(idToken);
            if (isError) {
                toast({
                    title: 'Error',
                    description: response['message'],
                    status: 'error',
                    duration: 2500,
                    isClosable: false,
                });
            } else {
                await loadData();
            }
            setSubscriptionChanging(false);
        }
    };

    const subscribeToUltimatePlan = async () => {
        if (user) {
            setSubscriptionChanging(true);
            const idToken = await user.getIdToken(false);
            const [isError, response] = await BackendRequestHandler.getInstance().subscribePremiumPlan(idToken);
            if (isError) {
                toast({
                    title: 'Error',
                    description: response['message'],
                    status: 'error',
                    duration: 2500,
                    isClosable: false,
                });
            } else {
                await loadData();
            }
            setSubscriptionChanging(false);
        }
    };

    return (
        <Box p={20}>
            <Center>
                <Heading>Billing</Heading>
            </Center>
            <Center p={6}>
                <Button onClick={onOpen} colorScheme='thia.purple'>
                    Add a Card
                </Button>
            </Center>
            <Center>
                <Heading>Role</Heading>
            </Center>
            <Center>
                <Text>Current Role: {userIdToken?.claims.role}</Text>
            </Center>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader></ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <CardElement options={CARD_ELEMENT_OPTIONS} />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} mr={2} colorScheme='thia.gray'>
                            Cancel
                        </Button>
                        <Button onClick={addCardToUser} colorScheme='thia.purple' isLoading={isCardSubmitting} loadingText='Adding card'>
                            Add card
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Center>
                <Heading>Cards</Heading>
            </Center>

            <Center>
                <Box>
                    {cards.map(cc => {
                        return <Card key={cc.id} card={cc} defaultCardID={defaultCardID} loadData={loadData} />;
                    })}
                </Box>
            </Center>
            <Center>
                <Heading>Current Subscription</Heading>
            </Center>
            <Box py={6} px={5}>
                <Center>
                    <Box>
                        {subscription.map(s => {
                            return <Subscription key={s.id} subscription={s} loadData={loadData} />;
                        })}
                    </Box>
                </Center>
                <Divider my='4' />
                <Stack spacing={4} width={'100%'} direction={'column'}>
                    <PackageTier title={'Standard'} typePlan='$40.00' options={options} />
                    <Popover>
                        <PopoverTrigger>
                            <Button variant='primaryOutline'>Get Started</Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader>
                                    <Center>Confirm your subscription plan!</Center>
                                </PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <Center>
                                        <Button
                                            onClick={subscribeToStandardPlan}
                                            colorScheme='thia.purple'
                                            isLoading={subscriptionChanging}
                                            loadingText='Confirming'
                                        >
                                            Confirm
                                        </Button>
                                    </Center>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                    <Divider />
                    <PackageTier title={'Premium'} typePlan='$80.00' options={options} />
                    <Popover>
                        <PopoverTrigger>
                            <Button variant='primaryOutline'>Get Started</Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader>
                                    <Center>Confirm your subscription plan!</Center>
                                </PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <Center>
                                        <Button
                                            onClick={subscribeToUltimatePlan}
                                            colorScheme='thia.purple'
                                            isLoading={subscriptionChanging}
                                            loadingText='Confirming'
                                        >
                                            Confirm
                                        </Button>
                                    </Center>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </Stack>
            </Box>
        </Box>
    );
};

export default BillingParent;
