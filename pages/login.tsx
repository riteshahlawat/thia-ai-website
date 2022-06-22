import React, { Suspense, useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { getFunctions } from 'firebase/functions';
import { useAuth, AuthProvider, FunctionsProvider, useFirebaseApp } from 'reactfire';
import { BackendRequestHandler } from '../backend-requests/backendRequestHandler';
import Google from '../public/btn_google_light_normal_ios.svg';
import {
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithEmailAndPassword,
    sendEmailVerification,
    AuthErrorCodes,
    sendPasswordResetEmail,
    getAuth,
    getRedirectResult,
} from 'firebase/auth';
import {
    Box,
    Button,
    Center,
    chakra,
    Heading,
    Stack,
    useBreakpointValue,
    VStack,
    Text,
    Input,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Checkbox,
    useToast,
    Spinner,
    LightMode,
    DarkMode,
    useColorModeValue,
    Divider,
    Flex,
    FormHelperText,
} from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import thiaIcon from '../public/icon.png';
import BackendRequestConfig from '../backend-requests/backendRequestConfig';
import { EmptyLayout } from '../src/components/pageLayouts/EmptyLayout';
import { AuthContainer } from '../src/auth/AuthContainer';
import { ChakraNextLink } from '../src/components/common/ChakraNextLink';
import { AuthTemplatePage } from '../src/auth/AuthTemplatePage';
import { NextPageWithLayout } from 'src/types/NextPageWithLayout';

const Login: NextPageWithLayout = () => {
    const auth = useAuth();
    const router = useRouter();
    const backendRequestHandler = BackendRequestHandler.getInstance();
    backendRequestHandler.initInstances(BackendRequestConfig);

    const [googleSignInLoading, setGoogleSignInLoading] = useState(false);
    const [googleRegisteringLoading, setGoogleRegisteringLoading] = useState(false);
    const [emailSignInLoading, setEmailSignInLoading] = useState(false);
    const [emailRegisteringLoading, setEmailRegisteringLoading] = useState(false);

    type DarkModeProps = {
        children: React.ReactNode; // 👈️ type children
    };

    const DarkMode = (props: DarkModeProps) => {
        return <Center>{props.children}</Center>;
    };

    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
        prompt: 'select_account consent',
    });
    const toast = useToast();

    const [rememberMe, setRememberMe] = useState(true);

    const [sendingEmailVerification, setSendingEmailVerification] = useState(false);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const [emailFocusedOnce, setEmailFocusedOnce] = useState(false);
    const [passwordFocusedOnce, setPasswordFocusedOnce] = useState(false);

    const googleLogin = async () => {
        await signInWithRedirect(auth, provider);
    };

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

    const resendEmailVerification = () => {
        if (password.trim() == '' || emailAddress.trim() == '') {
            toast({
                title: 'Error',
                description: 'Please enter an email and password',
                status: 'error',
                duration: 1500,
                isClosable: false,
            });
            return;
        }
        // Email address input handling
        const emailAddressPattern =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailAddress.match(emailAddressPattern)) {
            toast({
                title: 'Error',
                description: 'Invalid email',
                status: 'error',
                duration: 1500,
                isClosable: false,
            });
            return;
        }
        setSendingEmailVerification(true);
        signInWithEmailAndPassword(auth, emailAddress, password)
            .then(async userCredential => {
                if (!userCredential.user.emailVerified) {
                    await auth.signOut();
                    await sendEmailVerification(userCredential.user);
                    // await auth.signOut();
                    setPassword('');
                    toast({
                        title: 'Info',
                        description: 'Email verification sent, check your email',
                        status: 'info',
                        duration: 1500,
                        isClosable: false,
                    });
                } else {
                    await auth.signOut();
                    setPassword('');
                    toast({
                        title: 'Info',
                        description: 'Email is already verified',
                        status: 'info',
                        duration: 1500,
                        isClosable: false,
                    });
                }
                setSendingEmailVerification(false);
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
                setSendingEmailVerification(false);
            });
    };

    // TODO: On enter, click sign in
    const emailLogin = async () => {
        if (password.trim() == '' || emailAddress.trim() == '') {
            toast({
                title: 'Error',
                description: 'Login form not filled out',
                status: 'error',
                duration: 1500,
                isClosable: false,
            });
            return;
        }
        // Email address input handling
        const emailAddressPattern =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!emailAddress.match(emailAddressPattern)) {
            toast({
                title: 'Error',
                description: 'Invalid email',
                status: 'error',
                duration: 1500,
                isClosable: false,
            });
            return;
        }
        setEmailSignInLoading(true);
        signInWithEmailAndPassword(auth, emailAddress, password)
            .then(async userCredential => {
                if (!userCredential.user.emailVerified) {
                    await auth.signOut();
                    setPassword('');
                    toast({
                        title: 'Info',
                        description: 'Email not verified, check your email',
                        status: 'info',
                        duration: 1500,
                        isClosable: false,
                    });
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
                    setEmailSignInLoading(false);
                } else if (errorCode == AuthErrorCodes.INVALID_EMAIL) {
                    toast({
                        title: 'Error',
                        description: 'Invalid email',
                        status: 'error',
                        duration: 1500,
                        isClosable: false,
                    });
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
            setGoogleRegisteringLoading(true);
            router.push('dashboard');
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // Send that result to backend to create custom token
        }
    };

    useEffect(() => {
        getOAuthResponse();
        const signInOnEnter = async (event: KeyboardEvent) => {
            if (event.key == 'Enter') await emailLogin();
        };

        window.addEventListener('keypress', signInOnEnter);
        return () => {
            window.removeEventListener('keypress', signInOnEnter);
        };

        // useEffect would have too many dependencies to where it would basically change
        // each refresh so no point in adding them all.
    });

    return (
        <AuthTemplatePage>
            <VStack w='full' spacing={6}>
                <Box w='full'>
                    <Center>
                        <chakra.img src={thiaIcon.src} width='60px' h='60px' />
                    </Center>
                    <Stack spacing={{ base: '3', md: '5' }} textAlign='center'>
                        <Heading size={useBreakpointValue({ base: 'md', md: 'lg' })}>
                            Log in to your account
                        </Heading>
                        <Text fontSize={useBreakpointValue({ base: '14px', md: '16px' })}>
                            Start training on your hardware
                        </Text>
                    </Stack>
                </Box>

                <VStack spacing={6} w='full'>
                    <FormControl isRequired isInvalid={emailFocusedOnce && emailErrorMessage != ''}>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            placeholder=' '
                            autoFocus
                            type='email'
                            bg={useColorModeValue('white', 'black')}
                            value={emailAddress}
                            onBlur={() => setEmailFocusedOnce(true)}
                            onChange={(e: any) => {
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
                    <FormControl
                        isRequired
                        isInvalid={passwordFocusedOnce && passwordErrorMessage != ''}
                    >
                        <FormLabel>Password</FormLabel>
                        <Input
                            bg={useColorModeValue('white', 'black')}
                            placeholder=' '
                            value={password}
                            onBlur={() => setPasswordFocusedOnce(true)}
                            onChange={(e: any) => {
                                const val = e.target.value;
                                if (val.trim().length == 0) {
                                    setPasswordErrorMessage('Enter a password');
                                } else {
                                    setPasswordErrorMessage('');
                                }
                                setPassword(val);
                            }}
                            type='password'
                        />
                    </FormControl>
                </VStack>
                <HStack justify='space-between' w='full' align='baseline'>
                    <Checkbox
                        isChecked={rememberMe}
                        size='sm'
                        onChange={(e: any) => setRememberMe(e.target.checked)}
                    >
                        <Text fontSize='sm'>Remember me</Text>
                    </Checkbox>
                    <Button
                        variant='link'
                        colorScheme='thia.purple'
                        size='sm'
                        onClick={forgorPassword}
                    >
                        <Text fontSize='sm'>Forgot password</Text>
                    </Button>
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
                    variant='secondary'
                    colorScheme='gray'
                    w='full'
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
                <Button
                    w='full'
                    bg='white'
                    pr={3}
                    pl={0}
                    overflow='hidden'
                    leftIcon={<Google />}
                    _hover={{ bg: 'white', borderRadius: 'lg' }}
                    _active={{ bg: 'white' }}
                    color='black'
                    onClick={googleLogin}
                    isLoading={googleSignInLoading}
                    border='1px'
                    borderColor={useColorModeValue('thia.gray.100', 'thia.gray.950')}
                >
                    Sign in with Google
                </Button>
                <HStack justify='space-around' fontSize='sm'>
                    <Text>New to Thia?</Text>
                    <ChakraNextLink
                        href='/register'
                        styleProps={{
                            variant: 'primaryLink',
                            fontWeight: 'bold',
                        }}
                    >
                        Sign up
                    </ChakraNextLink>
                </HStack>
            </VStack>
        </AuthTemplatePage>
    );
};

Login.getLayout = function getLayout(page: ReactElement) {
    return <EmptyLayout>{page}</EmptyLayout>;
};
export default Login;
