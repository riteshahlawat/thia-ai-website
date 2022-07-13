import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useAuth, useUser } from 'reactfire';
import { BackendRequestHandler } from '../backend-requests/backendRequestHandler';

import {
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithEmailAndPassword,
    sendEmailVerification,
    AuthErrorCodes,
    getRedirectResult,
} from 'firebase/auth';
import {
    Button,
    VStack,
    Text,
    Input,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Checkbox,
    useToast,
    useColorModeValue,
    Divider,
    Flex,
} from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import BackendRequestConfig from '../backend-requests/backendRequestConfig';
import { EmptyLayout } from '@/components/pageLayouts/EmptyLayout';
import { NextPageWithLayout } from '../src/types/NextPageWithLayout';
import { ChakraNextLink } from '@/components/common/ChakraNextLink';
import { AuthTemplatePage } from '@/auth/AuthTemplatePage';
import { GoogleButton } from '@/auth/GoogleButton';
import { validifyEmailFormat } from 'src/utils/auth/authUtils';
import { createToast } from 'src/utils/common/toast';
import { SeoPage } from '@/components/seo/SeoPage';

const SignIn: NextPageWithLayout = () => {
    const auth = useAuth();
    const router = useRouter();
    const backendRequestHandler = BackendRequestHandler.getInstance();
    backendRequestHandler.initInstances(BackendRequestConfig);

    const [googleSignInLoading, setGoogleSignInLoading] = useState(false);
    const [emailSignInLoading, setEmailSignInLoading] = useState(false);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account consent' });

    const toast = useToast();
    const { data: user } = useUser();
    const [rememberMe, setRememberMe] = useState(true);

    const [sendingEmailVerification, setSendingEmailVerification] = useState(false);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const [emailFocusedOnce, setEmailFocusedOnce] = useState(false);
    const [passwordFocusedOnce, setPasswordFocusedOnce] = useState(false);

    const googleLogin = async () => await signInWithRedirect(auth, provider);

    // No the name of this function is not a mistake.
    // I will unironically fire anyone who changes this :D

    const firebaseErrorCodeCheck = (code: string) =>
        code == AuthErrorCodes.INVALID_PASSWORD ||
        code == AuthErrorCodes.USER_DELETED ||
        code == AuthErrorCodes.INTERNAL_ERROR;

    const resendEmailVerification = () => {
        if (password.trim() == '' || emailAddress.trim() == '') {
            toast(createToast('Error', 'Please enter an email and password', 'error'));
            return;
        }

        if (!validifyEmailFormat(emailAddress)) {
            toast(createToast('Error', 'Invalid email', 'error'));
            return;
        }

        setSendingEmailVerification(true);
        signInWithEmailAndPassword(auth, emailAddress, password)
            .then(async userCredential => {
                await auth.signOut();
                if (!userCredential.user.emailVerified) {
                    await sendEmailVerification(userCredential.user);
                    setPassword('');
                    toast(createToast('Info', 'Email verification sent, check your email'));
                } else {
                    setPassword('');
                    toast(createToast('Info', 'Email is already verified'));
                }
                setSendingEmailVerification(false);
            })
            .catch(({ code: errorCode }: FirebaseError) => {
                if (firebaseErrorCodeCheck(errorCode)) {
                    toast(createToast('Error', 'Invalid email or password', 'error'));
                } else if (errorCode === AuthErrorCodes.INVALID_EMAIL) {
                    toast(createToast('Error', 'Invalid email', 'error'));
                }
                setSendingEmailVerification(false);
            });
    };

    // TODO: On enter, click sign in
    const emailLogin = async () => {
        if (password.trim() === '' || emailAddress.trim() === '') {
            toast(createToast('Error', 'Login form not filled out', 'error'));
            return;
        }
        // Email address input handling
        if (!validifyEmailFormat(emailAddress)) {
            toast(createToast('Error', 'Invalid email', 'error'));
            return;
        }
        setEmailSignInLoading(true);
        signInWithEmailAndPassword(auth, emailAddress, password)
            .then(async userCredential => {
                if (!userCredential.user.emailVerified) {
                    await auth.signOut();
                    setPassword('');
                    toast(createToast('Info', 'Invalid email'));
                    setEmailSignInLoading(false);
                } else {
                    const idToken = await userCredential.user.getIdToken();
                    await BackendRequestHandler.getInstance().setNewUserRoles(idToken, {
                        uid: userCredential.user.uid,
                    });
                    setPassword('');
                    setEmailAddress('');
                    router.push('/dashboard');
                }
            })
            .catch(({ code: errorCode }: FirebaseError) => {
                if (firebaseErrorCodeCheck(errorCode)) {
                    toast(createToast('Error', 'Invalid email or password', 'error'));
                    setEmailSignInLoading(false);
                } else if (errorCode === AuthErrorCodes.INVALID_EMAIL) {
                    toast(createToast('Error', 'Invalid email', 'error'));
                    setEmailSignInLoading(false);
                }
            });
    };

    const getOAuthResponse = async () => {
        const result = await getRedirectResult(auth);
        if (result) {
            const idToken = await result.user.getIdToken();
            await BackendRequestHandler.getInstance().setNewUserRoles(idToken, {
                uid: result.user.uid,
            });
            setGoogleSignInLoading(true);
            router.push('/dashboard');
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // Send that result to backend to create custom token
        }
    };

    useEffect(() => {
        if (user) router.push('/');
        getOAuthResponse();
        const signInOnEnter = async (event: KeyboardEvent) => {
            if (event.key === 'Enter') await emailLogin();
        };
        window.addEventListener('keypress', signInOnEnter);
        return () => window.removeEventListener('keypress', signInOnEnter);
        // useEffect would have too many dependencies to where it would basically change
        // each refresh so no point in adding them all.
    });

    return (
        <SeoPage title='Sign in to Thia'>
            <AuthTemplatePage
                heading='Log in to your account'
                text='Start training on your own hardware'
            >
                <VStack spacing={6} w='full'>
                    <FormControl isRequired isInvalid={emailFocusedOnce && emailErrorMessage != ''}>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            autoFocus
                            type='email'
                            placeholder='Email Address'
                            bg={useColorModeValue('white', 'black')}
                            value={emailAddress}
                            onBlur={() => setEmailFocusedOnce(true)}
                            onChange={({ target }: any) => {
                                setEmailErrorMessage(
                                    !validifyEmailFormat(target.value)
                                        ? 'Invalid email address'
                                        : ''
                                );
                                setEmailAddress(target.value);
                            }}
                        />
                        <FormErrorMessage>{emailErrorMessage}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                        isRequired
                        isInvalid={passwordFocusedOnce && passwordErrorMessage != ''}
                    >
                        <FormLabel>Password</FormLabel>
                        <Input
                            value={password}
                            placeholder='Password'
                            bg={useColorModeValue('white', 'black')}
                            onBlur={() => setPasswordFocusedOnce(true)}
                            onChange={({ target }: any) => {
                                setPasswordErrorMessage(
                                    target.value.trim().length == 0 ? 'Enter a password' : ''
                                );
                                setPassword(target.value);
                            }}
                            type='password'
                        />
                        <FormErrorMessage>{passwordErrorMessage}</FormErrorMessage>
                    </FormControl>
                </VStack>
                <HStack justify='space-between' w='full' align='baseline'>
                    <Checkbox
                        size='sm'
                        isChecked={rememberMe}
                        onChange={(e: any) => setRememberMe(e.target.checked)}
                    >
                        <Text fontSize='sm'>Remember me</Text>
                    </Checkbox>
                    <ChakraNextLink
                        href='/resetpassword'
                        styleProps={{
                            fontSize: 'sm',
                            variant: 'primaryLink',
                            fontWeight: 'bold',
                        }}
                    >
                        Forgot password
                    </ChakraNextLink>
                </HStack>
                <Button
                    variant='primary'
                    w='full'
                    onClick={emailLogin}
                    isLoading={emailSignInLoading}
                >
                    Sign in
                </Button>
                <Button
                    w='full'
                    colorScheme='gray'
                    variant='secondary'
                    onClick={resendEmailVerification}
                    isLoading={sendingEmailVerification}
                >
                    Resend Email Verification
                </Button>
                <HStack w='full'>
                    <Divider />
                    <Text fontSize='sm' whiteSpace='nowrap' color='thia.gray.500'>
                        OR
                    </Text>
                    <Divider />
                </HStack>
                <GoogleButton onCLick={googleLogin} isLoading={googleSignInLoading}>
                    Sign in with Google
                </GoogleButton>
                <Flex gap={3} fontSize='sm'>
                    <Text>New to Thia?</Text>
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
        </SeoPage>
    );
};

SignIn.getLayout = function getLayout(page: ReactElement) {
    return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignIn;
