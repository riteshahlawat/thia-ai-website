import { useState } from 'react';
import { MdChevronLeft } from 'react-icons/md';
import { useUser } from 'reactfire';
import { PaymentForm } from './PaymentForm';
import { AnimatePresence, motion } from 'framer-motion';
import { CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { BackendRequestHandler } from 'backend-requests/backendRequestHandler';
import { Box, Button, Flex, FormControl, FormLabel, useColorModeValue, VStack } from '@chakra-ui/react';
import Stripe from 'stripe';
import { CardPreview } from './CardPreview';

type PaymentFormProps = {
    isDefault: boolean;
    currentPaymentMethod: Stripe.PaymentMethod;
    backButton: () => void;
    updateData: () => void;
};

export const EditPaymentDetails = ({ isDefault, currentPaymentMethod, backButton, updateData }: PaymentFormProps) => {
    const { data: user } = useUser();
    const [isCardRemoving, setCardRemoving] = useState(false);
    const [isCardDefaulting, setCardDefaulting] = useState(false);

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

    const removeCard = async () => {
        setCardRemoving(true);
        if (user) {
            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().detachCard(idToken, {
                paymentMethodID: currentPaymentMethod.id,
            });

            if (response) {
                updateData();
                backButton();
            }
        }
        setCardRemoving(false);
    };

    const updateDefaultCard = async () => {
        setCardDefaulting(true);
        if (user) {
            const idToken = await user.getIdToken();
            const [isError, response] = await BackendRequestHandler.getInstance().updateDefaultCard(idToken, {
                paymentMethodID: currentPaymentMethod.id,
            });

            if (response) {
                updateData();
            }
        }
        setCardDefaulting(false);
    };

    const formID = 'edit-form';

    return (
        <VStack spacing={5} align='start' px={5}>
            {currentPaymentMethod && <CardPreview paymentMethod={currentPaymentMethod} isDefault={isDefault} />}
            <Flex w='full' gap={5} justify='space-ar'>
                <AnimatePresence>
                    {!isDefault && (
                        <motion.div exit={{ opacity: 0 }}>
                            <Button onClick={updateDefaultCard} isLoading={isCardDefaulting} variant='secondary'>
                                Make Default
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Button
                    bg='thia.danger'
                    border='1px'
                    borderColor='thia.dangerOutline'
                    _hover={{ bg: 'thia.danger', rounded: 'lg' }}
                    onClick={removeCard}
                    isLoading={isCardRemoving}
                    loadingText='Removing card'
                >
                    Remove Card
                </Button>
            </Flex>
            <FormControl>
                <FormLabel pb={1}>Card information</FormLabel>
                <Flex w='full' gap={3}>
                    <Box
                        w='full'
                        bg={useColorModeValue('white', 'thia.gray.950')}
                        p={1.5}
                        rounded='lg'
                        border='1px'
                        borderColor={useColorModeValue('thia.gray.100', 'transparent')}
                    >
                        <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                    </Box>
                    <Box
                        w='full'
                        bg={useColorModeValue('white', 'thia.gray.950')}
                        p={1.5}
                        rounded='lg'
                        border='1px'
                        borderColor={useColorModeValue('thia.gray.100', 'transparent')}
                    >
                        <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                    </Box>
                </Flex>
            </FormControl>
            <PaymentForm formID={formID} onSubmit={updateDefaultCard} initialData={currentPaymentMethod.billing_details} />
            <Flex w='full' gap={5}>
                <Button w='full' flexBasis='auto' leftIcon={<MdChevronLeft />} variant='secondary' onClick={backButton}>
                    Back
                </Button>
                <Button type='submit' form={formID} w='full' flexBasis='auto' variant='primary'>
                    Update card
                </Button>
            </Flex>
        </VStack>
    );
};
