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
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Stripe from 'stripe';
import { BorderBox } from './BorderBox';

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

export const PaymentDetails = ({ cardList, defaultCard }: { cardList: Stripe.PaymentMethod[]; defaultCard: string | null }) => {
    const cardBGColor = useColorModeValue('thia.gray.50', 'thia.gray.900');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [addCard, setAddCard] = useState(false);

    const handleOnClose = () => {
        setAddCard(false);
        onClose();
    };
    const handleAddACard = () => {
        setAddCard(true);
    };
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

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

            <Modal isOpen={isOpen} onClose={handleOnClose} isCentered>
                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />

                <ModalContent py={5} rounded='xl'>
                    <ModalHeader>
                        <Heading>Payment Details</Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {!addCard ? (
                            <VStack spacing={5} align='start'>
                                <VStack spacing={5} overflowY='auto' w='full'>
                                    {cardList.map(({ card }, i) => (
                                        <CardPreview key={i} card={card} />
                                    ))}
                                </VStack>
                                <Heading fontSize={24}>Add a card</Heading>
                                <Button w='full' variant='primary' onClick={handleAddACard}>
                                    Add a card
                                </Button>
                            </VStack>
                        ) : (
                            <Elements stripe={stripePromise}>
                                <PayemntForm defaultCard={defaultCard} />
                            </Elements>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

const CardPreview = ({ card }: { card: Stripe.PaymentMethod.Card | undefined }) => {
    const brand = card?.brand ?? '----';
    const exp_month = card?.exp_month ?? '--';
    const exp_year = card?.exp_year ?? '----';
    const last4 = card?.last4 ?? '----';
    const expiryDate = `${String(exp_month).padStart(2, '0')}/${exp_year}`;
    const cardBGColor = useColorModeValue('thia.gray.50', 'thia.gray.900');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');

    return (
        <Box w='full' p={5} rounded='xl' bg={cardBGColor}>
            <Flex gap={5}>
                <>
                    <Box>{brand}</Box>
                    <Box flexGrow={1}>
                        <Text fontSize='sm' fontWeight='semibold' letterSpacing='wide'>
                            {last4 ? ` **** **** **** ${last4}` : <Skeleton height='20px' />}
                        </Text>
                        <Text fontSize='sm' color={secondaryTextColor}>{`Expiry ${expiryDate}`}</Text>
                        <Text></Text>
                    </Box>
                    <Button variant='secondary'>Edit</Button>
                </>
            </Flex>
        </Box>
    );
};

const PayemntForm = ({ defaultCard }: { defaultCard: string | null }) => {
    const { handleSubmit: addCardToUser, isCardSubmitting } = submitCardElement(
        async () => {
            console.log('CARD ADDED');
        },
        () => {
            console.log('CARD FAILED');
        },
        defaultCard
    );
    return (
        <VStack pb={5} spacing={3}>
            <Flex gap={5}>
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input type='email' />
                </FormControl>
                <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input type='email' />
                </FormControl>
            </Flex>
            <FormControl>
                <FormLabel>Address</FormLabel>
                <Input type='email' />
            </FormControl>
            <FormControl>
                <FormLabel>City </FormLabel>
                <Input type='email' />
            </FormControl>
            <FormControl py={3}>
                <FormLabel>Card information</FormLabel>

                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </FormControl>
            <Button w='full' variant='primary' onClick={addCardToUser} isLoading={isCardSubmitting} loadingText='...Adding card'>
                Add card
            </Button>
        </VStack>
    );
};
