import React, { useEffect, useState } from 'react';
import Stripe from 'stripe';
import { useUser } from 'reactfire';
import { BorderBox } from '../BorderBox';
import { CardPreview } from './CardPreview';
import { ModalContent } from './ModalContent';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AnimatePresence, motion } from 'framer-motion';
import { BackendRequestHandler } from 'backend-requests/backendRequestHandler';
import { Box, Button, Flex, Modal, ModalOverlay, Text, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react';
import { AddPaymentDetails } from './AddPaymentDetails';
import { EditPaymentDetails } from './EditPaymentDetails';

export const PaymentDetails = () => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
    const { data: user } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [modalPage, setModalPage] = useState(0);
    const [currentCard, setCurrentCard] = useState('');
    const [cards, setCards] = useState<Stripe.PaymentMethod[]>([]);
    const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<Stripe.PaymentMethod>();

    // fetch card data
    const getCardDataCallback = () => getCardData();

    // returns to modals home page
    const toModalHomePage = () => {
        setCurrentCard('');
        setModalPage(0);
    };
    // when edit button is pressed
    const handleEditClick = (cardId: string) => {
        setCurrentCard(cardId);
        setModalPage(2);
    };

    // when modal is closed
    const onModalClose = () => {
        toModalHomePage();
        onClose();
    };

    const getCardData = async () => {
        if (user) {
            const idToken = await user.getIdToken();
            const [[isCardListError, cardListRes], [isDefaultCardError, defaultCardRes]] = await Promise.all([
                BackendRequestHandler.getInstance().listCards(idToken),
                BackendRequestHandler.getInstance().getDefaultCard(idToken),
            ]);

            if (!isCardListError) {
                console.log('Cards:', cardListRes.data);
                setCards(cardListRes.data);
            }

            if (!isDefaultCardError && defaultCardRes) {
                const [isPaymentMethodError, paymentMethodRes] = await BackendRequestHandler.getInstance().getPaymentMethodById(
                    idToken,
                    defaultCardRes
                );
                setDefaultPaymentMethod(!isPaymentMethodError ? paymentMethodRes : undefined);
            } else {
                setDefaultPaymentMethod(undefined);
            }
        }
    };

    useEffect(() => {
        getCardData();
    }, [user]);

    const cardPreviewBG = useColorModeValue('thia.gray.50', 'thia.gray.950');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');
    const currentPaymentMethod = cards.find(card => card.id === currentCard);
    const isDefaultPaymentMethod = defaultPaymentMethod?.id === currentCard;

    const renderPage = (page: number) => {
        switch (page) {
            default:
                return (
                    <ModalContent title='Payment Details' text='Manage your cards and billing details'>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <VStack spacing={5} align='start'>
                                <VStack spacing={5} w='full'>
                                    <AnimatePresence>
                                        {cards.map((pm, i) => (
                                            <CardPreview
                                                key={i}
                                                paymentMethod={pm}
                                                onEditClick={handleEditClick}
                                                isDefault={defaultPaymentMethod?.id === pm.id}
                                            />
                                        ))}
                                    </AnimatePresence>
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
                    </ModalContent>
                );
            case 1:
                return (
                    <ModalContent title='Add a Card' text='Please fill in your card and billing details'>
                        <AddPaymentDetails backButton={toModalHomePage} onAddCardSuccess={getCardDataCallback} />
                    </ModalContent>
                );
            case 2:
                return (
                    <ModalContent title='Edit Card Details' text='Please fill in your card and billing details'>
                        <VStack spacing={5}>
                            {currentPaymentMethod && (
                                <EditPaymentDetails
                                    isDefault={isDefaultPaymentMethod}
                                    currentPaymentMethod={currentPaymentMethod}
                                    backButton={toModalHomePage}
                                    updateData={getCardDataCallback}
                                />
                            )}
                        </VStack>
                    </ModalContent>
                );
        }
    };

    return (
        <>
            <BorderBox>
                <VStack align='start' p={5} gap={3}>
                    <Box>
                        <Text fontWeight='bold'>Payment method</Text>
                        <Text pt={1} fontSize='sm' color={secondaryTextColor}>
                            Update or edit your payment details
                        </Text>
                    </Box>
                    {defaultPaymentMethod && (
                        <CardPreview paymentMethod={defaultPaymentMethod} isDefault={!!defaultPaymentMethod?.id} bg={cardPreviewBG} />
                    )}
                    <Button variant='secondary' onClick={onOpen}>
                        Manage cards
                    </Button>
                </VStack>
            </BorderBox>
            <Modal isOpen={isOpen} onClose={onModalClose} isCentered size='md'>
                <ModalOverlay bg='blackAlpha.50' backdropFilter='blur(32px)' />
                <Elements stripe={stripePromise}>{renderPage(modalPage)}</Elements>
            </Modal>
        </>
    );
};
