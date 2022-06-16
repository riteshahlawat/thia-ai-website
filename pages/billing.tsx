import React, { useEffect, useState } from 'react';
import { useAuth, useSigninCheck, useUser } from 'reactfire';
import { Box, Button, Center, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CardElement, PaymentElement } from '@stripe/react-stripe-js';
import submitCardElement from '../src/hooks/submitCardElement';

type Props = {};

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#aab7c4",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  

const Billing = (props: Props) => {
    const { data: user } = useUser();
    const router = useRouter();
    const { handleSubmit } = submitCardElement();

    useEffect(() => {
        if (!user) router.push('/login');
    });

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box p='200px'>
            <Center>
                <Text>Billing</Text>
            </Center>
            <Center p='50px'>
                <Button onClick={onOpen}>Add a Card</Button>
            </Center>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <CardElement options={CARD_ELEMENT_OPTIONS}/>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose} mr={2}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit}>
                                Add your card
                            </Button>
                        </ModalFooter>
                    </ModalHeader>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Billing;
