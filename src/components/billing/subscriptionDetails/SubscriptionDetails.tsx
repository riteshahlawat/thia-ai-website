import React, { useState } from 'react';
import Stripe from 'stripe';
import { BorderBox } from '../BorderBox';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { ChakraNextLink } from '../../common/ChakraNextLink';
import { Box, Button, Flex, Modal, ModalOverlay, Progress, Tag, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { Elements } from '@stripe/react-stripe-js';
import { ModalContent } from '../ModalContent';

export const SubscriptionDetails = ({ plan, role }: { plan: Stripe.Plan; role: string }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const amount = plan?.amount ?? 0;
    const interval = plan?.interval;

    const borderColor = useColorModeValue('thia.gray.50', 'thia.gray.950');
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');

    const [modalPage, setModalPage] = useState(0);
    // when modal is closed
    const onModalClose = () => {
        onClose();
    };

    const renderPage = (page: number) => {
        switch (page) {
            default:
                return (
                    <ModalContent title='Payment Details' text='Manage your cards and billing details'>
                        {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
                                                No cards associated to this account. Add a card to continue.
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
                        </motion.div> */}
                    </ModalContent>
                );
            case 1:
                return (
                    <ModalContent title='Add a Card' text='Please fill in your card and billing details'>
                        {/* <AddPaymentDetails backButton={toModalHomePage} onAddCardSuccess={getCardDataCallback} /> */}
                    </ModalContent>
                );
            case 2:
                return (
                    <ModalContent title='Edit Card Details' text='Please fill in your card and billing details'>
                        {/* <VStack spacing={5}>
                            {currentPaymentMethod && (
                                <EditPaymentDetails
                                    isDefault={isDefaultPaymentMethod}
                                    currentPaymentMethod={currentPaymentMethod}
                                    backButton={toModalHomePage}
                                    updateData={getCardDataCallback}
                                />
                            )}
                        </VStack> */}
                    </ModalContent>
                );
        }
    };

    return (
        <>
            <BorderBox>
                <Flex flexDir='column' h='full'>
                    <Flex gap={10} px={[3, 3, 5, 5, 5]} py={5} justify='space-between' flexGrow={1}>
                        <Box>
                            <Flex gap={2}>
                                <Text fontWeight='bold' casing='capitalize'>
                                    {role}
                                </Text>
                                <Tag rounded='full' colorScheme={'purple'} fontWeight='semibold' textTransform='capitalize'>
                                    {interval ? `${plan.interval}ly` : 'Monthly'}
                                </Tag>
                            </Flex>
                            <Text pt={1} fontSize='sm' color={secondaryTextColor}>
                                Its free for everyone, especially broke bitches.
                            </Text>
                        </Box>
                        <Flex gap={1} flexShrink={0}>
                            <Text fontWeight='semibold' fontSize='4xl' letterSpacing='wide'>
                                {`$${amount / 100}`}
                            </Text>
                            <Text pt={6} fontSize='sm' fontWeight='semibold' letterSpacing='wide' color={secondaryTextColor}>
                                {`per ${interval ?? 'month'}`}
                            </Text>
                        </Flex>
                    </Flex>
                    <Box p={5}>
                        <Progress rounded='full' value={20} size='sm' colorScheme='thia.purple' />
                    </Box>

                    <Button variant='secondary' onClick={onOpen}>
                        Change plan
                    </Button>
                </Flex>
            </BorderBox>
            <Modal isOpen={isOpen} onClose={onModalClose} isCentered size='md'>
                <ModalOverlay bg='blackAlpha.50' backdropFilter='blur(32px)' />
                {renderPage(modalPage)}
            </Modal>
        </>
    );
};
