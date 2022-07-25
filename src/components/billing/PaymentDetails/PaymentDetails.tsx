import { Box, Button, Flex, Modal, ModalOverlay, Text, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BackendRequestHandler } from 'backend-requests/backendRequestHandler';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useUser } from 'reactfire';
import Stripe from 'stripe';
import { BorderBox } from '../BorderBox';
import { CardPreview } from './CardPreview';
import { ModalContent } from './ModalContent';
import { PayemntForm } from './PaymentForm';

export const PaymentDetails = () => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentCard, setCurrentCard] = useState('');
    const [modalPage, setModalPage] = useState(0);
    const [cards, setCards] = useState<Stripe.PaymentMethod[]>([]);
    const [defaultCard, setDefaultCard] = useState<string | null>(null);

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

    const onAddCardSucess = () => {
        getCardData();
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

            if (!isDefaultCardError) {
                console.log('Default Card:', defaultCardRes);
                setDefaultCard(defaultCardRes);
            }
        }
    };

    useEffect(() => {
        getCardData();
    }, []);

    const { data: user } = useUser();
    const removeCard = async () => {
        console.log('remove');
        if (user) {
            // setRemovingCard(true);
            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().detachCard(idToken, {
                paymentMethodID: 'pm_1LPCSsIdzODCxCio9fNwb6bS',
            });

            console.log(response);
        }
    };

    const renderPage = (page: number) => {
        switch (page) {
            default:
                return (
                    <ModalContent title='Payment Details' text='Manage your cards and billing details'>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <VStack spacing={5} align='start'>
                                <VStack spacing={5} w='full' pb={1}>
                                    {cards.map(({ id, card }, i) => (
                                        <CardPreview
                                            key={i}
                                            id={id}
                                            card={card}
                                            onEditClick={handleEditClick}
                                            isDefautlt={defaultCard === id}
                                        />
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
                    </ModalContent>
                );
            case 1:
                return (
                    <ModalContent title='Add a Card' text='Please fill in your card and billing details'>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Elements stripe={stripePromise}>
                                <PayemntForm
                                    defaultCard={defaultCard}
                                    toModalHomePage={toModalHomePage}
                                    onAddCardSuccess={onAddCardSucess}
                                />
                            </Elements>
                        </motion.div>
                    </ModalContent>
                );
            case 2:
                return (
                    <ModalContent title='Edit Card Details' text='Please fill in your card and billing details'>
                        {currentCard}
                        <Button onClick={removeCard}>Delete Card</Button>
                        <Button>Make Default</Button>
                        <Button>Update</Button>
                    </ModalContent>
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
