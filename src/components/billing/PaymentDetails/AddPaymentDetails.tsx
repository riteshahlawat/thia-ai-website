import { CardElement } from '@stripe/react-stripe-js';
import { MdChevronLeft } from 'react-icons/md';
import { PaymentForm } from './PaymentForm';
import submitCardElement from '@/hooks/submitCardElement';
import { Box, Button, Flex, FormControl, FormLabel, useColorModeValue, VStack } from '@chakra-ui/react';

type PaymentFormProps = {
    defaultCard: string;
    backButton: () => void;
    onAddCardSuccess: () => void;
    onAddCardFail?: () => void;
};

export const AddPaymentDetails = ({ defaultCard, backButton, onAddCardSuccess, onAddCardFail }: PaymentFormProps) => {
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

    return (
        <VStack spacing={5} align='start'>
            <FormControl>
                <FormLabel pb={1}>Card information</FormLabel>
                <Box
                    bg={useColorModeValue('thia.gray.50', 'thia.gray.950')}
                    p={3}
                    rounded='lg'
                    border='2px'
                    borderColor={useColorModeValue('thia.gray.100', 'transparent')}
                >
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </Box>
            </FormControl>
            <PaymentForm />
            <Flex w='full' gap={5}>
                <Button leftIcon={<MdChevronLeft />} flexGrow={1} variant='secondary' onClick={backButton}>
                    Back
                </Button>
                <Button flexGrow={1} variant='primary' onClick={addCardToUser} isLoading={isCardSubmitting} loadingText='Adding card'>
                    Add card
                </Button>
            </Flex>
        </VStack>
    );
};
