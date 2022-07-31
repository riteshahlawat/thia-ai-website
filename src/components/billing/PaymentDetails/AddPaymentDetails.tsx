import { CardElement } from '@stripe/react-stripe-js';
import { MdChevronLeft } from 'react-icons/md';
import { BillingValuesType, PaymentForm } from './PaymentForm';
import submitCardElement from '@/hooks/submitCardElement';
import { Box, Button, Flex, FormControl, FormLabel, useColorModeValue, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Stripe from 'stripe';
import { PaymentMethodCreateParams } from '@stripe/stripe-js';

type PaymentFormProps = {
    defaultCard: string;
    backButton: () => void;
    onAddCardSuccess: () => void;
    onAddCardFail?: () => void;
};

export const AddPaymentDetails = ({ defaultCard, backButton, onAddCardSuccess, onAddCardFail }: PaymentFormProps) => {
    const initialBillingDetails: PaymentMethodCreateParams.BillingDetails = {
        address: undefined,
        email: undefined,
        name: undefined,
        phone: undefined,
    };

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

    const { handleSubmit: addCardToUser, isCardSubmitting } = submitCardElement(
        async () => {
            console.log('CARD ADDED');
            onAddCardSuccess();
            backButton();
        },
        () => {
            console.log('CARD FAILED');
            // onAddCardFail();
        },
        defaultCard
    );

    const onSubmit = ({ cardholderName, ...rest }: BillingValuesType) => {
        const address: PaymentMethodCreateParams.BillingDetails.Address = { ...rest };

        const billingDetails: PaymentMethodCreateParams.BillingDetails = {
            address,
            name: cardholderName,
            email: undefined,
            phone: undefined,
        };
        addCardToUser(billingDetails);
    };
    const formID = 'add-form';
    return (
        <VStack spacing={5} align='start'>
            <FormControl>
                <FormLabel pb={1}>Card information</FormLabel>
                <Box
                    bg={useColorModeValue('thia.gray.50', 'thia.gray.950')}
                    p={1.5}
                    rounded='lg'
                    border='2px'
                    borderColor={useColorModeValue('thia.gray.100', 'transparent')}
                >
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </Box>
            </FormControl>
            <PaymentForm formID={formID} onSubmit={onSubmit} />
            <Flex w='full' gap={5}>
                <Button leftIcon={<MdChevronLeft />} flexGrow={1} variant='secondary' onClick={backButton}>
                    Back
                </Button>
                <Button flexGrow={1} variant='primary' isLoading={isCardSubmitting} loadingText='Adding card' type='submit' form={formID}>
                    Add card
                </Button>
            </Flex>
        </VStack>
    );
};
