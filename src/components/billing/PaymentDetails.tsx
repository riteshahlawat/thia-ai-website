import submitCardElement from '@/hooks/submitCardElement';
import {
    Box,
    Button,
    Flex,
    FormControl,
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
} from '@chakra-ui/react';
import { CardElement, Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect } from 'react';
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
    const card = cardList[0]?.card;
    const brand = card?.brand ?? '----';
    const exp_month = card?.exp_month ?? '--';
    const exp_year = card?.exp_year ?? '----';
    const last4 = card?.last4 ?? '----';
    const expiryDate = `${String(exp_month).padStart(2, '0')}/${exp_year}`;

    const cardBGColor = useColorModeValue('thia.gray.50', 'thia.gray.950');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');

    const { isOpen, onOpen, onClose } = useDisclosure();

    //   const { handleSubmit: addCardToUser, isCardSubmitting } = submitCardElement(
    //     async () => {
    //         onClose();
    //         // await loadData();
    //     },
    //     onClose,
    //     // defaultCardID
    // );

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
                    <Box mt={5} p={5} rounded='lg' bg={cardBGColor}>
                        <Flex gap={5}>
                            {card ? (
                                <>
                                    <Box>{brand}</Box>
                                    <Box flexGrow={1}>
                                        <Text fontSize='sm' fontWeight='semibold' letterSpacing='wide'>
                                            <Box as='span' textTransform='capitalize'>
                                                {brand}
                                            </Box>
                                            {last4 ? ` ending in ${last4}` : <Skeleton height='20px' />}
                                        </Text>
                                        <Text fontSize='sm' color={secondaryTextColor}>{`Expiry ${expiryDate}`}</Text>
                                        <Text></Text>
                                    </Box>
                                    <Button variant='secondary'>Edit</Button>
                                </>
                            ) : (
                                <>
                                    <Button variant='secondary' onClick={onOpen}>
                                        Add card
                                    </Button>
                                </>
                            )}
                        </Flex>
                    </Box>
                </Box>
            </BorderBox>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
                <ModalContent py={5} rounded='lg'>
                    <ModalHeader>Add a card</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <PayemntForm />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='secondary'  colorScheme='thia.purple'>
                            Add card
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

const PayemntForm = () => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
    return (
        <Elements stripe={stripePromise}>
            <FormControl>
                <CardElement />
            </FormControl>
        </Elements>
    );
};
