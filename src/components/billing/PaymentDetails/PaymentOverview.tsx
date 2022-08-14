import React, { useEffect, useState } from 'react';
import Stripe from 'stripe';
import { useUser } from 'reactfire';
import { BorderBox } from '../BorderBox';
import { CardPreview } from './CardPreview';
import { ModalContent } from '../ModalContent';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AnimatePresence, motion } from 'framer-motion';
import { BackendRequestHandler } from 'backend-requests/backendRequestHandler';
import { Box, Button, Center, Flex, HStack, Modal, ModalOverlay, Text, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react';
import { AddPaymentDetails } from './AddPaymentDetails';
import { EditPaymentDetails } from './EditPaymentDetails';

interface PaymentOverviewProps {
    defaultPaymentMethod: Stripe.PaymentMethod | undefined;
    updateData: () => void;
}

export const PaymentOverview = ({ defaultPaymentMethod, updateData }: PaymentOverviewProps) => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
    const { data: user } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [modalPage, setModalPage] = useState(0);
    const [currentCard, setCurrentCard] = useState('');
    const [cards, setCards] = useState<Stripe.PaymentMethod[]>([]);

    // fetch card data
    const getCardDataCallback = () => {
        updateData();
        getCardData();
    };

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
            const [isCardListError, cardListRes] = await BackendRequestHandler.getInstance().listCards(idToken);

            if (!isCardListError) {
                console.log('Cards:', cardListRes.data);
                setCards(cardListRes.data);
            }
        }
    };

    useEffect(() => {
        getCardData();
    }, [user]);

    const currentPaymentMethod = cards.find(card => card.id === currentCard);
    const isDefaultPaymentMethod = defaultPaymentMethod?.id === currentCard;

    const cardBGColor = useColorModeValue('white', 'thia.gray.950');
    const borderColor = useColorModeValue('thia.gray.100', 'transparent');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.400');

    const renderPage = () => {
        switch (modalPage) {
            default:
                return (
                    <ModalContent title='Payment Methods' text='Manage your cards and billing details'>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <VStack spacing={5} align='start'>
                                <VStack spacing={5} w='full' maxH='50vh' overflow='auto' px={5}>
                                    <AnimatePresence>
                                        {cards.map((pm, i) => (
                                            <CardPreview
                                                key={i}
                                                paymentMethod={pm}
                                                onEditClick={handleEditClick}
                                                isDefault={defaultPaymentMethod?.id === pm.id}
                                            />
                                        ))}
                                        {!cards.length && (
                                            <Text textAlign='center' color={secondaryTextColor} fontSize='sm'>
                                                You have not added a payment method. Add a card to continue.
                                            </Text>
                                        )}
                                    </AnimatePresence>
                                    {!!cards.length && (
                                        <Text fontSize='xs' color={secondaryTextColor}>
                                            The default card will be charged at the start of payment period.
                                        </Text>
                                    )}
                                </VStack>
                                <Flex w='full' gap={5} px={5}>
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
                <VStack align='start' px={[3, 3, 5, 5, 5]} py={5} gap={3} h='full' justify='space-evenly'>
                    <HStack justify='space-between' w='full'>
                        <Box>
                            <Text fontWeight='bold'>Payment method</Text>
                            <Text pt={1} fontSize='sm' color={secondaryTextColor}>
                                Update or edit your payment details
                            </Text>
                        </Box>
                        <Button variant='secondary' onClick={onOpen}>
                            Manage
                        </Button>
                    </HStack>
                    {cards.length ? (
                        defaultPaymentMethod ? (
                            <CardPreview paymentMethod={defaultPaymentMethod} isDefault={!!defaultPaymentMethod?.id} />
                        ) : (
                            <Center
                                p={5}
                                fontSize='sm'
                                h='91px'
                                w='full'
                                rounded='lg'
                                bg={cardBGColor}
                                border='1px'
                                borderColor={borderColor}
                                color={secondaryTextColor}
                            >
                                You have not set a default payment method.
                            </Center>
                        )
                    ) : (
                        <Center
                            p={5}
                            fontSize='sm'
                            h='91px'
                            w='full'
                            rounded='lg'
                            bg={cardBGColor}
                            border='1px'
                            borderColor={borderColor}
                            color={secondaryTextColor}
                        >
                            You have not added a payment method.
                        </Center>
                    )}
                </VStack>
            </BorderBox>
            <Modal isOpen={isOpen} onClose={onModalClose} isCentered size='md'>
                <ModalOverlay bg='blackAlpha.50' backdropFilter='blur(32px)' />
                <Elements stripe={stripePromise}>{renderPage()}</Elements>
            </Modal>
        </>
    );
};
