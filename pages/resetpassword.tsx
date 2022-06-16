import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import { AuthErrorCodes, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuth } from 'reactfire';
import { AuthTemplatePage } from '../src/auth/AuthTemplatePage';
import { ChakraNextLink } from '../src/modules/common/ChakraNextLink';
import { NextPageWithLayout } from '../src/types/NextPageWithLayout';

type Props = {};

const text = "Enter the email address associated with your account and a link will be sent to your inbox to reset your password.";

const ResetPassword: NextPageWithLayout = (props: Props) => {
    const [emailAddress, setEmailAddress] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [emailFocusedOnce, setEmailFocusedOnce] = useState(false);
    const toast = useToast();
    const auth = useAuth();

    // No the name of this function is not a mistake.
    // I will unironically fire anyone who changes this :D
    const forgorPassword = async () => {
        if (emailAddress.trim() == '') {
            toast({
                title: 'Error',
                description: 'Please enter an email',
                status: 'error',
                duration: 1500,
                isClosable: false,
            });
            return;
        }
        sendPasswordResetEmail(auth, emailAddress)
            .then(() => {
                toast({
                    title: 'Info',
                    description: 'Sent password reset email, check your inbox',
                    status: 'info',
                    duration: 1500,
                    isClosable: false,
                });
            })
            .catch((error: FirebaseError) => {
                const errorCode = error.code;

                if (
                    errorCode == AuthErrorCodes.INVALID_PASSWORD ||
                    errorCode == AuthErrorCodes.USER_DELETED ||
                    errorCode == AuthErrorCodes.INTERNAL_ERROR
                ) {
                    toast({
                        title: 'Error',
                        description: 'Invalid email or password',
                        status: 'error',
                        duration: 1500,
                        isClosable: false,
                    });
                } else if (errorCode == AuthErrorCodes.INVALID_EMAIL) {
                    toast({
                        title: 'Error',
                        description: 'Invalid email',
                        status: 'error',
                        duration: 1500,
                        isClosable: false,
                    });
                }
            });
    };

    return (
        <AuthTemplatePage heading='Reset Password' text={text}>
            <FormControl isRequired isInvalid={emailFocusedOnce && emailErrorMessage != ''}>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type='email'
                    placeholder='Enter Email Address'
                    value={emailAddress}
                    bg={useColorModeValue('white', 'black')}
                    onBlur={() => setEmailFocusedOnce(true)}
                    onChange={(e) => {
                        const val = e.target.value;
                        // Email address input handling
                        const emailAddressPattern =
                            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                        if (!val.match(emailAddressPattern)) {
                            // Invalid email address pattern
                            setEmailErrorMessage('Invalid email address');
                        } else setEmailErrorMessage('');
                        setEmailAddress(val);
                    }}
                />
                <FormErrorMessage>{emailErrorMessage}</FormErrorMessage>
            </FormControl>
            <Button variant='primary' w='full' onClick={forgorPassword}>
                Reset Password
            </Button>
            <Flex gap={3} fontSize='sm'>
                <Text>Don&quot;t have an account?</Text>
                <ChakraNextLink
                    href='/signup'
                    styleProps={{
                        variant: 'primaryLink',
                        fontWeight: 'bold',
                    }}
                >
                    Sign up
                </ChakraNextLink>
            </Flex>
        </AuthTemplatePage>
    );
};

export default ResetPassword;
