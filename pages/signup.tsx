import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Text,
    useToast,
    VStack,
    Divider,
    Flex,
    useColorModeValue,
} from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import {
    GoogleAuthProvider,
    signInWithRedirect,
    updateProfile,
    AuthErrorCodes,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    getRedirectResult,
} from 'firebase/auth';
import { useAuth, useUser } from 'reactfire';
import { BackendRequestHandler } from '../backend-requests/backendRequestHandler';
import BackendRequestConfig from '../backend-requests/backendRequestConfig';
import { NextPageWithLayout } from '../src/types/NextPageWithLayout';
import { EmptyLayout } from '../src/layouts/EmptyLayout';
import { AuthTemplatePage } from '../src/auth/AuthTemplatePage';
import { ChakraNextLink } from '../src/modules/common/ChakraNextLink';
import { GoogleButton } from '../src/auth/GoogleButton';
import { validifyEmailFormat, validifyPasswordFormat } from 'src/utils/auth/authUtils';
import { createToast } from 'src/utils/common/toast';

const SignUp: NextPageWithLayout = () => {
    const { data: user } = useUser();
    const auth = useAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account consent' });

    const toast = useToast();
    const router = useRouter();
    const backendRequestHandler = BackendRequestHandler.getInstance();
    backendRequestHandler.initInstances(BackendRequestConfig);

    const [googleRegisteringLoading, setGoogleRegisteringLoading] = useState(false);
    const [emailRegisteringLoading, setEmailRegisteringLoading] = useState(false);

    const [userRegistrationDetails, setUserRegistrationDetails] = useState({
        fullName: '',
        emailAddress: '',
        password: '',
        passwordRetype: '',
    });

    type UserRegistrationDetailNames = keyof typeof userRegistrationDetails;

    const [userRegistrationErrorMessages, setUserRegistrationErrorMessages] = useState({
        fullName: '',
        emailAddress: '',
        password: '',
        passwordRetype: '',
    });

    const [userRegistrationFocusedOnce, setUserRegistrationFocusedOnce] = useState({
        fullName: false,
        emailAddress: false,
        password: false,
        passwordRetype: false,
    });

    const googleLogin = async () => await signInWithRedirect(auth, provider);

    const getOAuthResponse = async () => {
        const result = await getRedirectResult(auth);
        if (result) {
            const idToken = await result.user.getIdToken();
            await BackendRequestHandler.getInstance().setNewUserRoles(idToken, {
                uid: result.user.uid,
            });
            setGoogleRegisteringLoading(true);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // Send that result to backend to create custom token
        }
    };

    const handleRegistrationInputsFocused = (e: React.FocusEvent<HTMLInputElement>) => {
        const name: UserRegistrationDetailNames = e.target.name as UserRegistrationDetailNames;
        setUserRegistrationFocusedOnce({
            ...userRegistrationFocusedOnce,
            [name]: true,
        });
    };

    const handleRegistrationInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const name: UserRegistrationDetailNames = e.target.name as UserRegistrationDetailNames;
        setUserRegistrationDetails({ ...userRegistrationDetails, [name]: val });
        switch (name) {
            case 'emailAddress':
                // Email address input handling
                setUserRegistrationErrorMessages({
                    ...userRegistrationErrorMessages,
                    emailAddress: !validifyEmailFormat(val) ? 'Invalid email address' : '',
                });

                break;
            case 'fullName':
                // Full name input handling
                setUserRegistrationErrorMessages({
                    ...userRegistrationErrorMessages,
                    fullName: val.length < 3 ? 'Enter valid name' : '', // Too small
                });

                break;
            case 'password':
                // Password input handling
                setUserRegistrationErrorMessages({
                    ...userRegistrationErrorMessages,
                    password: !validifyPasswordFormat(val)
                        ? 'Weak password, 6 alpha-num charactors are required'
                        : '',
                });
                break;
            case 'passwordRetype':
                // Password retype input handling
                setUserRegistrationErrorMessages({
                    ...userRegistrationErrorMessages,
                    passwordRetype:
                        val !== userRegistrationDetails.password ? "Passwords don't match" : '',
                });
                break;
        }
    };

    const registerNewAccount = async () => {
        let userRegistrationDetailsFilledOut = true;
        for (const registrationDetailKey in userRegistrationDetails) {
            if (
                userRegistrationDetails[
                    registrationDetailKey as keyof typeof userRegistrationDetails
                ].trim() == ''
            ) {
                userRegistrationDetailsFilledOut = false;
                break;
            }
        }
        if (!userRegistrationDetailsFilledOut) {
            toast(createToast('Error', 'Registration not filled out', 'error')); // Not all details filled out
            return;
        }
        let userRegistrationErrorExists = false;
        for (const errorMessageKey in userRegistrationErrorMessages) {
            if (
                userRegistrationErrorMessages[
                    errorMessageKey as keyof typeof userRegistrationErrorMessages
                ] != ''
            ) {
                userRegistrationErrorExists = true;
                break;
            }
        }
        if (userRegistrationErrorExists) {
            // Not all details filled out
            toast(createToast('Error', 'Registration contains an error', 'error'));
            return;
        }
        setEmailRegisteringLoading(true);
        createUserWithEmailAndPassword(
            auth,
            userRegistrationDetails.emailAddress,
            userRegistrationDetails.password
        )
            .then(async userCredential => {
                await updateProfile(userCredential.user, {
                    displayName: userRegistrationDetails.fullName,
                });
                if (!userCredential.user.emailVerified) {
                    // Send verification email
                    await sendEmailVerification(userCredential.user);
                    await auth.signOut();
                    toast(createToast('Info', 'Email verification sent, check your email'));
                    setEmailRegisteringLoading(false);
                } else {
                    // Email already verified (don't know when this will happen but it's here in case it does)
                }
            })
            .catch(({ code: errorCode }: FirebaseError) => {
                if (errorCode == AuthErrorCodes.EMAIL_EXISTS) {
                    toast(createToast('Error', 'Email already exists', 'error'));
                } else if (errorCode == AuthErrorCodes.WEAK_PASSWORD) {
                    toast(createToast('Error', 'Weak password', 'error'));
                } else if (errorCode == AuthErrorCodes.INVALID_EMAIL) {
                    toast(createToast('Error', 'Invalid email', 'error'));
                }
                setEmailRegisteringLoading(false);
            });
    };

    useEffect(() => {
        if (user) router.push('/');
        getOAuthResponse();
        const registerOnEnter = async (event: KeyboardEvent) => {
            if (event.key == 'Enter') await registerNewAccount();
        };
        window.addEventListener('keypress', registerOnEnter);
        return () => window.removeEventListener('keypress', registerOnEnter);
    });

    return (
        <AuthTemplatePage heading='Join Thia today' text='Sign up to start training'>
            <VStack spacing={6} py={1} w='full'>
                <FormControl
                    isRequired
                    isInvalid={
                        userRegistrationFocusedOnce.fullName &&
                        userRegistrationErrorMessages.fullName != ''
                    }
                >
                    <FormLabel fontSize='sm'>Name</FormLabel>
                    <Input
                        bg={useColorModeValue('white', 'black')}
                        name='fullName'
                        placeholder='Full Name'
                        autoFocus
                        type='text'
                        onBlur={handleRegistrationInputsFocused}
                        onChange={handleRegistrationInputsChange}
                    />
                    <FormErrorMessage fontSize='sm'>
                        {userRegistrationErrorMessages.fullName}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isRequired
                    isInvalid={
                        userRegistrationFocusedOnce.emailAddress &&
                        userRegistrationErrorMessages.emailAddress != ''
                    }
                >
                    <FormLabel fontSize='sm'>Email</FormLabel>
                    <Input
                        bg={useColorModeValue('white', 'black')}
                        name='emailAddress'
                        placeholder='E-mail Address'
                        type='text'
                        onBlur={handleRegistrationInputsFocused}
                        onChange={handleRegistrationInputsChange}
                    />
                    <FormErrorMessage fontSize='sm'>
                        {userRegistrationErrorMessages.emailAddress}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isRequired
                    isInvalid={
                        userRegistrationFocusedOnce.password &&
                        userRegistrationErrorMessages.password != ''
                    }
                >
                    <FormLabel fontSize='sm'>Password</FormLabel>
                    <Input
                        bg={useColorModeValue('white', 'black')}
                        name='password'
                        placeholder='Password'
                        type='password'
                        onBlur={handleRegistrationInputsFocused}
                        onChange={handleRegistrationInputsChange}
                    />
                    <FormErrorMessage fontSize='sm'>
                        {userRegistrationErrorMessages.password}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isRequired
                    isInvalid={
                        userRegistrationFocusedOnce.passwordRetype &&
                        userRegistrationErrorMessages.passwordRetype != ''
                    }
                >
                    <FormLabel fontSize='sm'>Re-type Password</FormLabel>
                    <Input
                        bg={useColorModeValue('white', 'black')}
                        name='passwordRetype'
                        placeholder='Re-type Password'
                        type='password'
                        onBlur={handleRegistrationInputsFocused}
                        onChange={handleRegistrationInputsChange}
                    />
                    <FormErrorMessage fontSize='sm'>
                        {userRegistrationErrorMessages.passwordRetype}
                    </FormErrorMessage>
                </FormControl>
            </VStack>
            <Button
                w='full'
                variant='primary'
                onClick={registerNewAccount}
                isLoading={emailRegisteringLoading}
            >
                Sign up
            </Button>
            <HStack w='full'>
                <Divider />
                <Text fontSize='sm' whiteSpace='nowrap' color='thia.gray.500'>
                    OR
                </Text>
                <Divider />
            </HStack>
            <GoogleButton onCLick={googleLogin} isLoading={googleRegisteringLoading}>
                Sign up with Google
            </GoogleButton>
            <Flex gap={3} fontSize='sm'>
                <Text>Already have an account?</Text>
                <ChakraNextLink
                    href='/signin'
                    styleProps={{
                        variant: 'primaryLink',
                        fontWeight: 'bold',
                    }}
                >
                    Sign in
                </ChakraNextLink>
            </Flex>
        </AuthTemplatePage>
    );
};

// custom layout
SignUp.getLayout = function getLayout(page: ReactElement) {
    return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignUp;
