import { MdChevronLeft } from 'react-icons/md';
import { BillingValuesType, PaymentForm } from './PaymentForm';
import { Box, Button, Flex, FormControl, FormLabel, useColorModeValue, VStack } from '@chakra-ui/react';
import { PaymentMethodCreateParams } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import submitCardElement from '@/hooks/submitCardElement';

type PaymentFormProps = {
    backButton: () => void;
    onAddCardSuccess: () => void;
    onAddCardFail?: () => void;
};

export const AddPaymentDetails = ({ backButton, onAddCardSuccess, onAddCardFail }: PaymentFormProps) => {
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
        () => {
            onAddCardSuccess();
            backButton();
        },
        () => {}
    );

    const onSubmit = ({ cardholderName, ...rest }: BillingValuesType) => {
        const billingDetails: PaymentMethodCreateParams.BillingDetails = {
            address: { ...rest },
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
