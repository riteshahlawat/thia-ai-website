import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useAuth, useUser } from 'reactfire';
import { BackendRequestHandler } from '../backend-requests/backendRequestHandler';
import { GoogleAuthProvider, signInWithRedirect, signInWithEmailAndPassword, AuthErrorCodes, getRedirectResult } from 'firebase/auth';
import { Button, VStack, Text, HStack, Checkbox, Divider, Alert, CloseButton, Flex } from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import BackendRequestConfig from '../backend-requests/backendRequestConfig';
import { EmptyLayout } from '@/components/pageLayouts/EmptyLayout';
import { NextPageWithLayout } from '../src/types/NextPageWithLayout';
import { ChakraNextLink } from '@/components/common/ChakraNextLink';
import { AuthTemplatePage } from '@/auth/AuthTemplatePage';
import { GoogleButton } from '@/auth/GoogleButton';
import { SeoPage } from '@/components/seo/SeoPage';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { InputFormControl } from '@/components/common/InputFormControl';

// destucture firebase error codes
const { INVALID_EMAIL, INVALID_PASSWORD, INTERNAL_ERROR, USER_DELETED } = AuthErrorCodes;

// form validation schemea
const singinSchema = object({
    email: string().email('Please enter a valid email address').required('Email is required'),
    password: string().required('Password is required'),
});

type SignInValues = { email: string; password: string };

const SignIn: NextPageWithLayout = () => {
    const auth = useAuth();
    const router = useRouter();
    const { data: user } = useUser();

    // initial form values
    const initialValues: SignInValues = { email: '', password: '' };

    const [errorMessage, setErrorMessage] = useState('');
    const [isEmailSignInLoading, setEmailSignInLoading] = useState(false);
    const [isGoogleSignInLoading, setGoogleSignInLoading] = useState(false);

    // backend
    const backendRequestHandler = BackendRequestHandler.getInstance();
    backendRequestHandler.initInstances(BackendRequestConfig);

    // Google stuff
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account consent' });

    // login with google redirect
    const googleLogin = async () => await signInWithRedirect(auth, provider);

    const getOAuthResponse = async () => {
        const result = await getRedirectResult(auth);
        if (result) {
            const idToken = await result.user.getIdToken();
            await BackendRequestHandler.getInstance().setNewUserRoles(idToken, { uid: result.user.uid });
            setGoogleSignInLoading(true);
            router.push('/dashboard');
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // Send that result to backend to create custom token
        }
    };

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

    // on sign in button click
    const onSubmit = (values: SignInValues) => emailLogin(values);

    useEffect(() => {
        if (user) router.push('/');
        getOAuthResponse();
    });

    return (
        <SeoPage title='Sign in to Thia'>
            <AuthTemplatePage heading='Log in to your account' text='Start training on your own hardware'>
                <VStack spacing={3} w='full'>
                    <Formik initialValues={initialValues} validationSchema={singinSchema} onSubmit={onSubmit}>
                        {({ errors, touched }) => (
                            <Form style={{ width: '100%' }} noValidate>
                                <VStack spacing={3} w='full'>
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
                                            <CloseButton rounded='full' onClick={() => setErrorMessage('')} color='#ff4242a3' />
                                        </Alert>
                                    )}
                                    <InputFormControl
                                        autoFocus
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
                                    <Button w='full' type='submit' colorScheme='gray' variant='primary' isLoading={isEmailSignInLoading}>
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
                    <Flex gap={3} pt={3} fontSize='sm'>
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
