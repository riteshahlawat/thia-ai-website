import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useAuth, useUser } from 'reactfire';
import { BackendRequestHandler } from '../backend-requests/backendRequestHandler';
import {
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithEmailAndPassword,
    AuthErrorCodes,
    getRedirectResult,
} from 'firebase/auth';
import {
    Button,
    VStack,
    Text,
    HStack,
    Checkbox,
    Divider,
    Alert,
    CloseButton,
    Flex,
} from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import BackendRequestConfig from '../backend-requests/backendRequestConfig';
import { EmptyLayout } from '@/components/pageLayouts/EmptyLayout';
import { NextPageWithLayout } from '../src/types/NextPageWithLayout';
import { ChakraNextLink } from '@/components/common/ChakraNextLink';
import { AuthTemplatePage } from '@/auth/AuthTemplatePage';
import { GoogleButton } from '@/auth/GoogleButton';
import { SeoPage } from '@/components/seo/SeoPage';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { InputFormControl } from '@/components/common/InputFormControl';

// destucture firebase error codes
const { INVALID_EMAIL, INVALID_PASSWORD, INTERNAL_ERROR, USER_DELETED } = AuthErrorCodes;

// form validation schemea
const singinSchema = yup.object({
    email: yup.string().email('Please enter a valid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
});

type SignInValues = { email: string; password: string };

const SignIn: NextPageWithLayout = () => {
    const auth = useAuth();
    const router = useRouter();
    const { data: user } = useUser();

    // initial form values
    const initialValues: SignInValues = { email: '', password: '' };

    const [values, setValues] = useState(initialValues);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEmailSignInLoading, setEmailSignInLoading] = useState(false);
    const [isGoogleSignInLoading, setGoogleSignInLoading] = useState(false);

    const backendRequestHandler = BackendRequestHandler.getInstance();
    backendRequestHandler.initInstances(BackendRequestConfig);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account consent' });

    // flow for log in in with email and password
    const emailLogin = ({ email, password }: SignInValues) => {
        setEmailSignInLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(async userCredential => {
                if (!userCredential.user.emailVerified) {
                    await auth.signOut();
                    setErrorMessage('Email address is not verified');
                    setEmailSignInLoading(false);
                } else {
                    const idToken = await userCredential.user.getIdToken();
                    const instance = BackendRequestHandler.getInstance();
                    await instance.setNewUserRoles(idToken, { uid: userCredential.user.uid });
                    router.push('/dashboard');
                }
            })
            .catch(({ code }: FirebaseError) => {
                if (code === INVALID_PASSWORD || code === USER_DELETED || code === INTERNAL_ERROR) {
                    setErrorMessage('Invalid email or password');
                } else if (code === INVALID_EMAIL) {
                    setErrorMessage('Invalid email address');
                }

                setEmailSignInLoading(false);
            });
    };

    // login with google redirect
    const googleLogin = async () => await signInWithRedirect(auth, provider);

    const onSubmit = (values: SignInValues) => {
        setValues(values);
        emailLogin(values);
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

    const signInOnEnter = async (event: KeyboardEvent) => {
        if (event.key === 'Enter') await emailLogin(values);
    };

    useEffect(() => {
        if (user) router.push('/');
        getOAuthResponse();

        window.addEventListener('keypress', signInOnEnter);
        return () => window.removeEventListener('keypress', signInOnEnter);
    }, [user]);

    return (
        <SeoPage title='Sign in to Thia'>
            <AuthTemplatePage
                heading='Log in to your account'
                text='Start training on your own hardware'
            >
                <VStack spacing={5} w='full'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={singinSchema}
                        onSubmit={onSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form style={{ width: '100%' }} noValidate>
                                <VStack spacing={5} w='full'>
                                    {errorMessage && (
                                        <Alert
                                            bg='#ff42422e'
                                            rounded='md'
                                            status='error'
                                            border='1px'
                                            borderColor='#ff4242a3'
                                            justifyContent='space-between'
                                        >
                                            {errorMessage}
                                            <CloseButton
                                                rounded='full'
                                                onClick={() => setErrorMessage('')}
                                                color='#ff4242a3'
                                            />
                                        </Alert>
                                    )}
                                    <InputFormControl
                                        autofocus
                                        isRequired
                                        name='email'
                                        type='email'
                                        label='Email Address'
                                        errors={errors.email}
                                        touched={touched.email}
                                    />
                                    <InputFormControl
                                        isRequired
                                        name='password'
                                        type='password'
                                        label='Password'
                                        errors={errors.password}
                                        touched={touched.password}
                                    />
                                    <HStack justify='space-between' w='full' align='baseline'>
                                        <Checkbox
                                            size='sm'
                                            // isChecked={rememberMe}
                                            // onChange={(e: any) => setRememberMe(e.target.checked)}
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
                                        w='full'
                                        type='submit'
                                        colorScheme='gray'
                                        variant='primary'
                                        isLoading={isEmailSignInLoading}
                                    >
                                        Sign in
                                    </Button>
                                </VStack>
                            </Form>
                        )}
                    </Formik>
                    <HStack w='full'>
                        <Divider />
                        <Text fontSize='sm' whiteSpace='nowrap' color='thia.gray.500'>
                            OR
                        </Text>
                        <Divider />
                    </HStack>
                    <GoogleButton onCLick={googleLogin} isLoading={isGoogleSignInLoading}>
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
                </VStack>
            </AuthTemplatePage>
        </SeoPage>
    );
};

SignIn.getLayout = function getLayout(page: ReactElement) {
    return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignIn;

/**const auth = useAuth();
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

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailErrorMessage(!validifyEmailFormat(e.target.value) ? 'Invalid email address' : '');
        setEmailAddress(e.target.value);
    };

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordErrorMessage(e.target.value.trim().length == 0 ? 'Enter a password' : '');
        setPassword(e.target.value);
    };

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
                            onChange={handleEmailInput}
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
                            onChange={handlePasswordInput}
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
    ); */
