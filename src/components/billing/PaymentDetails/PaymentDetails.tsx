import React, { useEffect, useState } from 'react';
import Stripe from 'stripe';
import { useUser } from 'reactfire';
import { BorderBox } from '../BorderBox';
import { CardPreview } from './CardPreview';
import { ModalContent } from './ModalContent';
import { PayemntForm } from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AnimatePresence, motion } from 'framer-motion';
import { BackendRequestHandler } from 'backend-requests/backendRequestHandler';
import { Box, Button, Flex, Modal, ModalOverlay, Text, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react';
import { MdChevronLeft } from 'react-icons/md';

export const PaymentDetails = () => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
    const { data: user } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [modalPage, setModalPage] = useState(0);
    const [currentCard, setCurrentCard] = useState('');
    const [cards, setCards] = useState<Stripe.PaymentMethod[]>([]);
    const [defaultCardID, setDefaultCardID] = useState<string | null>(null);
    const [isRemoveCardLoading, setRemoveCardLoading] = useState(false);

    // fetch card data
    const onAddCardSucess = () => getCardData();

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

            if (!isDefaultCardError) {
                console.log('Default Card:', defaultCardRes);
                setDefaultCardID(defaultCardRes);
            }
        }
    };

    useEffect(() => {
        getCardData();
    }, [user]);

    const removeCard = async () => {
        setRemoveCardLoading(true);
        if (user) {
            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().detachCard(idToken, { paymentMethodID: currentCard });

            if (response) {
                getCardData();
                toModalHomePage();
            }

            console.log(response);
        }
        setRemoveCardLoading(false);
    };

    const updateDefaultCard = async () => {
        if (user) {
            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().updateDefaultCard(idToken, {
                paymentMethodID: currentCard,
            });

            if (response) {
                getCardData();
                toModalHomePage();
            }

            console.log(response);
        }
    };

    const isCurrentCardDefaultCard = currentCard === defaultCardID;

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
                                            isDefautlt={defaultCardID === id}
                                        />
                                    ))}
                                </VStack>
                                {/* {!cards && <Skeleton h={75} w='full' rounded='lg' startColor='blackAlpha.500' endColor='blackAlpha.800' />} */}
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
                                    defaultCard={defaultCardID}
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
                        {/* <PayemntForm defaultCard={defaultCardID} /> */}
                        <Button colorScheme='red' onClick={removeCard} isLoading={isRemoveCardLoading} loadingText='Removing card'>
                            Delete Card
                        </Button>
                        {!isCurrentCardDefaultCard && <Button onClick={updateDefaultCard}>Make Default</Button>}
                        <Button>Update</Button>
                        <Button leftIcon={<MdChevronLeft />} flexGrow={1} variant='secondary' onClick={toModalHomePage}>
                            Back
                        </Button>
                    </ModalContent>
                );
        }
    };

    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');
    const defaultPaymentMethod = cards.find(card => card.id === defaultCardID);
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
                    <CardPreview
                        id={defaultCardID}
                        card={defaultPaymentMethod?.card}
                        isDefautlt={!!defaultPaymentMethod?.id}
                        bg={useColorModeValue('thia.gray.50', 'thia.gray.950')}
                    />
                    <Button variant='secondary' onClick={onOpen}>
                        Manage cards
                    </Button>
                </VStack>
            </BorderBox>
            <Modal isOpen={isOpen} onClose={onModalClose} isCentered size='md'>
                <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(32px)' />
                {renderPage(modalPage)}
            </Modal>
        </>
    );
};
