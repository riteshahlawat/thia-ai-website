import submitCardElement from '@/hooks/submitCardElement';
import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { CardElement } from '@stripe/react-stripe-js';
import { MdChevronLeft } from 'react-icons/md';

type PaymentFormProps = {
    defaultCard: string | null;
    toModalHomePage: () => void;
    onAddCardSuccess: () => void;
    onAddCardFail?: () => void;
};

export const PayemntForm = ({ defaultCard, toModalHomePage, onAddCardSuccess, onAddCardFail }: PaymentFormProps) => {
    const { handleSubmit: addCardToUser, isCardSubmitting } = submitCardElement(
        async () => {
            console.log('CARD ADDED');
            onAddCardSuccess();
            toModalHomePage();
        },
        () => {
            console.log('CARD FAILED');
            // onAddCardFail();
        },
        defaultCard
    );

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

    const inputBG = useColorModeValue('white', 'thia.gray.990');
    const borderColor = useColorModeValue('thia.gray.100', 'transparent');
    const color = 'thia.gray.500';
    return (
        <VStack spacing={5} align='start'>
            <FormControl>
                <FormLabel pb={1}>Card information</FormLabel>
                <Box bg={inputBG} p={3} rounded='lg' border='2px' borderColor={borderColor}>
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </Box>
            </FormControl>
            <Text>Billing information</Text>
            <VStack spacing={3} pb={2}>
                <Flex gap={3}>
                    <FormControl>
                        <Input
                            type='email'
                            bg={inputBG}
                            _placeholder={{ color }}
                            borderColor={borderColor}
                            border='2px'
                            placeholder='First name'
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            type='email'
                            bg={inputBG}
                            _placeholder={{ color }}
                            color={color}
                            borderColor={borderColor}
                            border='2px'
                            placeholder='Last name'
                        />
                    </FormControl>
                </Flex>
                <FormControl>
                    <Input
                        type='email'
                        bg={inputBG}
                        _placeholder={{ color }}
                        borderColor={borderColor}
                        border='2px'
                        placeholder='Address'
                    />
                </FormControl>
                <Flex gap={3}>
                    <FormControl>
                        <Input
                            type='email'
                            bg={inputBG}
                            _placeholder={{ color }}
                            borderColor={borderColor}
                            border='2px'
                            placeholder='City'
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            type='email'
                            bg={inputBG}
                            _placeholder={{ color }}
                            borderColor={borderColor}
                            border='2px'
                            placeholder='Zip code'
                        />
                    </FormControl>
                </Flex>
            </VStack>
            <Flex w='full' gap={5}>
                <Button leftIcon={<MdChevronLeft />} flexGrow={1} variant='secondary' onClick={toModalHomePage}>
                    Back
                </Button>
                <Button flexGrow={1} variant='primary' onClick={addCardToUser} isLoading={isCardSubmitting} loadingText='...Adding card'>
                    Add card
                </Button>
            </Flex>
        </VStack>
    );
};
