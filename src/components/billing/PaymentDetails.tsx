import submitCardElement from '@/hooks/submitCardElement';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Skeleton,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { CardElement, Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { MdChevronLeft } from 'react-icons/md';
import Stripe from 'stripe';
import { BorderBox } from './BorderBox';

export const PaymentDetails = ({ cardList, defaultCard }: { cardList: Stripe.PaymentMethod[]; defaultCard: string | null }) => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentCard, setCurrentCard] = useState('');
    const [modalPage, setModalPage] = useState(0);

    // returns to modals home page
    const toModalHomePage = () => setModalPage(0);

    // when edit button is pressed
    const handleEditClick = (cardId: string) => {
        setModalPage(2);
        setCurrentCard(cardId);
    };

    // when modal is closed
    const onModalClose = () => {
        setModalPage(0);
        onClose();
    };

    const renderPage = (page: number) => {
        switch (page) {
            default:
                return (
                    <Content title='Payment Details' text='Manage your cards and billing details'>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <VStack spacing={5} align='start'>
                                <VStack spacing={5} w='full' pb={1}>
                                    {cardList.map(({ id, card }, i) => (
                                        <CardPreview key={i} id={id} card={card} onEditClick={handleEditClick} />
                                    ))}
                                </VStack>

                                <Flex w='full' gap={5}>
                                    <Button w='full' variant='secondary' onClick={onModalClose}>
                                        Close
                                    </Button>
                                    <Button w='full' variant='primary' onClick={() => setModalPage(1)}>
                                        Add a card
                                    </Button>
                                </Flex>
                            </VStack>
                        </motion.div>
                    </Content>
                );
            case 1:
                return (
                    <Content title='Add a Card' text='Please fill in your card and billing details'>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Elements stripe={stripePromise}>
                                <PayemntForm defaultCard={defaultCard} toModalHomePage={toModalHomePage} />
                            </Elements>
                        </motion.div>
                    </Content>
                );
            case 2:
                return (
                    <Content title='Edit Card Details' text='Please fill in your card and billing details'>
                        {currentCard}
                        <Button>Delete Card</Button>
                        <Button>Make Default</Button>
                        <Button>Update</Button>
                    </Content>
                );
        }
    };

    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');

    return (
        <>
            <BorderBox>
                <Box p={5} flexBasis={1}>
                    <>
                        <Text fontWeight='bold'>Payment method</Text>
                        <Text pt={1} fontSize='sm' color={secondaryTextColor}>
                            Update or edit your payment details
                        </Text>
                    </>
                    <Button variant='secondary' onClick={onOpen}>
                        Manage payment methods
                    </Button>
                </Box>
            </BorderBox>
            <Modal isOpen={isOpen} onClose={onModalClose} isCentered>
                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
                {renderPage(modalPage)}
            </Modal>
        </>
    );
};

const Content = ({ title, text, children }: { title: string; text: string; children?: React.ReactNode }) => {
    return (
        <ModalContent py={5} rounded='xl'>
            <ModalCloseButton />
            <ModalHeader>
                <Heading mb={1}>{title}</Heading>
                <Text fontSize='md' color='thia.gray.500'>
                    {text}
                </Text>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
        </ModalContent>
    );
};

const CardPreview = ({
    id,
    card,
    onEditClick,
}: {
    id: string;
    card: Stripe.PaymentMethod.Card | undefined;
    onEditClick: (arg0: string) => void;
}) => {
    const brand = card?.brand ?? '----';
    const exp_month = card?.exp_month ?? '--';
    const exp_year = card?.exp_year ?? '----';
    const last4 = card?.last4 ?? '----';
    const expiryDate = `${String(exp_month).padStart(2, '0')}/${exp_year}`;
    const cardBGColor = useColorModeValue('white', 'thia.gray.990');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');

    return (
        <Box w='full' p={5} rounded='xl' bg={cardBGColor} shadow='sm'>
            <Flex gap={5}>
                <Box>{brand}</Box>
                <Box flexGrow={1}>
                    <Text fontSize='sm' fontWeight='semibold' letterSpacing='wide'>
                        {last4 ? ` **** **** **** ${last4}` : <Skeleton height='20px' />}
                    </Text>
                    <Text fontSize='sm' color={secondaryTextColor}>{`Expiry ${expiryDate}`}</Text>
                    <Text></Text>
                </Box>
                <Button variant='secondary' onClick={() => onEditClick(id)}>
                    Edit
                </Button>
            </Flex>
        </Box>
    );
};

const PayemntForm = ({ defaultCard, toModalHomePage }: { defaultCard: string | null; toModalHomePage: () => void }) => {
    const { handleSubmit: addCardToUser, isCardSubmitting } = submitCardElement(
        async () => {
            console.log('CARD ADDED');
            // setAddCard(false);
        },
        () => {
            console.log('CARD FAILED');
        },
        defaultCard
    );

    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                color: useColorModeValue('black', 'white'),
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#999999',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

    const inputBG = useColorModeValue('white', 'thia.gray.990');
    const borderColor = useColorModeValue('thia.gray.100', 'transparent');
    const color = 'thia.gray.500';
    return (
        <VStack spacing={5} align='start'>
            <FormControl>
                <FormLabel pb={1}>Card information</FormLabel>
                <Box bg={inputBG} p={3} rounded='lg' border='2px' borderColor={borderColor}>
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </Box>
            </FormControl>
            <Text>Billing information</Text>
            <VStack spacing={3} pb={2}>
                <Flex gap={3}>
                    <FormControl>
                        <Input
                            type='email'
                            bg={inputBG}
                            _placeholder={{ color }}
                            borderColor={borderColor}
                            border='2px'
                            placeholder='First name'
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            type='email'
                            bg={inputBG}
                            _placeholder={{ color }}
                            color={color}
                            borderColor={borderColor}
                            border='2px'
                            placeholder='Last name'
                        />
                    </FormControl>
                </Flex>
                <FormControl>
                    <Input
                        type='email'
                        bg={inputBG}
                        _placeholder={{ color }}
                        borderColor={borderColor}
                        border='2px'
                        placeholder='Address'
                    />
                </FormControl>
                <Flex gap={3}>
                    <FormControl>
                        <Input
                            type='email'
                            bg={inputBG}
                            _placeholder={{ color }}
                            borderColor={borderColor}
                            border='2px'
                            placeholder='City'
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            type='email'
                            bg={inputBG}
                            _placeholder={{ color }}
                            borderColor={borderColor}
                            border='2px'
                            placeholder='Zip code'
                        />
                    </FormControl>
                </Flex>
            </VStack>
            <Flex w='full' gap={5}>
                <Button leftIcon={<MdChevronLeft />} flexGrow={1} variant='secondary' onClick={toModalHomePage}>
                    Back
                </Button>
                <Button flexGrow={1} variant='primary' onClick={addCardToUser} isLoading={isCardSubmitting} loadingText='...Adding card'>
                    Add card
                </Button>
            </Flex>
        </VStack>
    );
};
