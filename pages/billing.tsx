import React, { useEffect, useState } from 'react';
import { useAuth, useSigninCheck, useUser } from 'reactfire';
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
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Spinner,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CardElement, PaymentElement } from '@stripe/react-stripe-js';
import submitCardElement from '../src/hooks/submitCardElement';
import { FaCheckCircle } from 'react-icons/fa';
import { BackendRequestHandler } from '../backend-requests/backendRequestHandler';
import Head from 'next/head';

type Props = {};

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
    const colorTextLight = checked ? 'white' : 'purple.600';
    const bgColorLight = checked ? 'purple.400' : 'gray.300';

    const colorTextDark = checked ? 'white' : 'purple.500';
    const bgColorDark = checked ? 'purple.400' : 'gray.300';

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

const Subscription = ({ subscription }: any) => {
    const { data: user } = useUser();

    const handleClick = async () => {
        if (user) {
            const idToken = await user.getIdToken();
            const [isError, response] =
                await BackendRequestHandler.getInstance().cancelSubscriptionPlan(idToken, {
                    subscriptionID: subscription.id,
                });
        }
    };

    return (
        <Box>
            <Heading>{subscription.id}</Heading>
            <Box>Status: {subscription.status}</Box>
            <Box>Card Last 4 Numbers: {subscription.default_payment_method?.card?.last4}</Box>
            <Button onClick={handleClick}>Cancel Subscription</Button>
        </Box>
    );
};

const CreditCards = ({ creditCards }: any) => {
    const { data: user } = useUser();

    const handleClick = async () => {
        if (user) {
            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().detachCreditCard(
                idToken,
                {
                    paymentMethodID: creditCards.id,
                }
            );
        }
    };

    return (
        <Box>
            <Heading>{creditCards.id}</Heading>
            <Box>
                Expiry Date: {creditCards.card.exp_month}/{creditCards.card.exp_year}
            </Box>
            <Box>Card Last 4 Numbers: {creditCards.card.last4}</Box>
            <Button onClick={handleClick}>Remove Credit Card</Button>
        </Box>
    );
};

const Billing = (props: Props) => {
    const router = useRouter();
    const { handleSubmit } = submitCardElement();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: user } = useUser();
    const [subscription, setSubscription] = useState<any[]>([]);
    const [creditCards, setCreditCards] = useState<any[]>([]);

    useEffect(() => {
        const fetchSubscriptionAndCreditCards = async () => {
            if (!user) {
                router.push('/login');
            } else {
                const idToken = await user.getIdToken();
                const [isError, response] =
                    await BackendRequestHandler.getInstance().listSubscriptionPlan(idToken, {
                        uid: user.uid,
                    });
                if (!isError) {
                    console.log(response);
                    setSubscription(response.data);
                }
                const [isError2, response2] =
                    await BackendRequestHandler.getInstance().listCreditCards(idToken, {
                        uid: user.uid,
                    });
                if (!isError2) {
                    console.log(response2);
                    setCreditCards(response2.data);
                }
            }
        };

        fetchSubscriptionAndCreditCards();
    });

    if (!subscription) {
        return '';
    }

    const useHandleStandardSubscription = async () => {
        const { data: user } = useUser();
        if (user) {
            const idToken = await user.getIdToken();
            const [isError, response] =
                await BackendRequestHandler.getInstance().subscribeStandardPlan(idToken, {
                    uid: user.uid,
                });
        }
    };

    const useHandlePremiumSubscription = async () => {
        const { data: user } = useUser();
        if (user) {
            const idToken = await user.getIdToken();
            const [isError, response] =
                await BackendRequestHandler.getInstance().subscribePremiumPlan(idToken, {
                    uid: user.uid,
                });
        }
    };

    return (
        <>
            <Head>
                <title>Billing</title>
            </Head>
            <Box p={20}>
                <Center>
                    <Heading>Billing</Heading>
                </Center>
                <Center p={6}>
                    <Button onClick={onOpen}>Add a Card</Button>
                </Center>
                <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl>
                                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose} mr={2}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit}>Add your card</Button>
                            </ModalFooter>
                        </ModalHeader>
                    </ModalContent>
                </Modal>
                <Center>
                    <Heading>Cards</Heading>
                    <Box>
                        {creditCards.map(cc => {
                            <CreditCards key={cc.id} creditCards={cc} />;
                        })}
                    </Box>
                </Center>
                <Center>
                    <Heading>Current Subscription</Heading>
                </Center>
                <Box py={6} px={5}>
                    <Center>
                        <Heading>Change Subscription Plan</Heading>
                        <Box>
                            {subscription.map(s => {
                                <Subscription key={s.id} subscription={s} />;
                            })}
                        </Box>
                    </Center>
                    <Stack spacing={4} width={'100%'} direction={'column'}>
                        <Stack
                            p={5}
                            alignItems={'center'}
                            justifyContent={{
                                base: 'flex-start',
                                md: 'space-around',
                            }}
                            direction={{
                                base: 'column',
                                md: 'row',
                            }}
                        >
                            <Stack
                                width={{
                                    base: '100%',
                                    md: '40%',
                                }}
                                textAlign={'center'}
                            >
                                <Heading size={'lg'}>
                                    The Right Plan for{' '}
                                    <Text color='thia.purple.400'>Your Business</Text>
                                </Heading>
                            </Stack>
                            <Stack
                                width={{
                                    base: '100%',
                                    md: '60%',
                                }}
                            >
                                <Text textAlign={'center'}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                                    quod in iure vero. Facilis magnam, sed officiis commodi labore
                                    odit.
                                </Text>
                            </Stack>
                        </Stack>
                        <Divider />
                        <PackageTier title={'Standard'} typePlan='$9.99' options={options} />
                        <Popover>
                            <PopoverTrigger>
                                <Button>Get Started</Button>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent
                                    color='white'
                                    bg='thia.purple.400'
                                    borderColor='thia.purple.400'
                                >
                                    <PopoverArrow />
                                    <PopoverHeader>
                                        <Center>Confirm your subscription plan!</Center>
                                    </PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Center>
                                            <Button onClick={useHandleStandardSubscription}>
                                                Confirm
                                            </Button>
                                        </Center>
                                    </PopoverBody>
                                </PopoverContent>
                            </Portal>
                        </Popover>
                        <Divider />
                        <PackageTier title={'Premium'} typePlan='$49.99' options={options} />
                        <Popover>
                            <PopoverTrigger>
                                <Button>Get Started</Button>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent
                                    color='white'
                                    bg='thia.purple.400'
                                    borderColor='thia.purple.400'
                                >
                                    <PopoverArrow />
                                    <PopoverHeader>
                                        <Center>Confirm your subscription plan!</Center>
                                    </PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Center>
                                            <Button onClick={useHandlePremiumSubscription}>
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
        </>
    );
};

export default Billing;
