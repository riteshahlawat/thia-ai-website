import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Button, HStack, Text, VStack, Divider, Flex, CloseButton, Alert, Box } from '@chakra-ui/react';
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
import { NextPageWithLayout } from '@/types/NextPageWithLayout';
import { EmptyLayout } from '@/components/pageLayouts/EmptyLayout';
import { AuthTemplatePage } from '@/auth/AuthTemplatePage';
import { ChakraNextLink } from '@/components/common/ChakraNextLink';
import { GoogleButton } from '@/auth/GoogleButton';
import { SeoPage } from '@/components/seo/SeoPage';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import YupPassword from 'yup-password';
import { InputFormControl } from '@/components/common/InputFormControl';
YupPassword(yup);

const singupSchema = yup.object({
    name: yup.string().min(3, 'Name must be at least 3 characters.').required('Name is required.'),
    email: yup.string().required('Email is required.').email('Please enter a valid email address.'),
    password: yup.string().password().max(50).required('Please enter your password.'),
    retypePassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match.')
        .required('Please retype your password.'),
});

type SignUpValues = {
    name: string;
    email: string;
    password: string;
    retypePassword: string;
};

const SignUp: NextPageWithLayout = () => {
    const auth = useAuth();
    const router = useRouter();
    const { data: user } = useUser();

    // initial form values
    const initialValues: SignUpValues = { name: '', email: '', password: '', retypePassword: '' };

    // states
    const [isGoogleSignUpLoading, setGoogleSignUpLoading] = useState(false);
    const [isEmailSignUpLoading, setEmailSignUpLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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
            await BackendRequestHandler.getInstance().setNewUserRoles(idToken, {
                uid: result.user.uid,
            });
            setGoogleSignUpLoading(true);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // Send that result to backend to create custom token
        }
    };

    // on sign up click
    const onSubmit = (values: SignUpValues) => registerNewAccount(values);

    // register new user
    const registerNewAccount = async ({ name, email, password }: SignUpValues) => {
        setEmailSignUpLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then(async userCredential => {
                await updateProfile(userCredential.user, { displayName: name });
                if (!userCredential.user.emailVerified) {
                    // Send verification email
                    await sendEmailVerification(userCredential.user);
                    await auth.signOut();
                    setEmailSignUpLoading(false);
                } else {
                    // Email already verified (don't know when this will happen but it's here in case it does)
                }
            })
            .catch(({ code: errorCode }: FirebaseError) => {
                if (errorCode == AuthErrorCodes.EMAIL_EXISTS) {
                    setErrorMessage('Email address is already associated with an account');
                } else if (errorCode == AuthErrorCodes.WEAK_PASSWORD) {
                    setErrorMessage('Weak password');
                } else if (errorCode == AuthErrorCodes.INVALID_EMAIL) {
                    setErrorMessage('Invalid email');
                }
                setEmailSignUpLoading(false);
            });
    };

    useEffect(() => {
        if (user) router.push('/');
        getOAuthResponse();
    });

    return (
        <SeoPage title='Join Thia'>
            <AuthTemplatePage heading='Join Thia today' text='Sign up to start training'>
                <VStack spacing={3} py={1} w='full'>
                    <Formik initialValues={initialValues} validationSchema={singupSchema} onSubmit={onSubmit}>
                        {({ errors, touched }) => (
                            <Form style={{ width: '100%' }} noValidate>
                                <VStack spacing={3} py={1} w='full'>
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
                                        label='Name'
                                        name='name'
                                        type='text'
                                        errors={errors.name}
                                        touched={touched.name}
                                    />
                                    <InputFormControl
                                        isRequired
                                        label='Email Address'
                                        name='email'
                                        type='email'
                                        errors={errors.email}
                                        touched={touched.email}
                                    />
                                    <InputFormControl
                                        isRequired
                                        label='Password'
                                        name='password'
                                        type='Password'
                                        errors={errors.password}
                                        touched={touched.password}
                                    />
                                    <InputFormControl
                                        isRequired
                                        label='Re-type Password'
                                        name='retypePassword'
                                        type='Password'
                                        errors={errors.retypePassword}
                                        touched={touched.retypePassword}
                                    />
                                    <Box w='full' pt={3}>
                                        <Button
                                            w='full'
                                            type='submit'
                                            variant='primary'
                                            colorScheme='gray'
                                            isLoading={isEmailSignUpLoading}
                                        >
                                            Sign Up
                                        </Button>
                                    </Box>
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
                    <GoogleButton onCLick={googleLogin} isLoading={isGoogleSignUpLoading}>
                        Sign up with Google
                    </GoogleButton>
                    <Flex gap={3} pt={3} fontSize='sm'>
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
                </VStack>
            </AuthTemplatePage>
        </SeoPage>
    );
};

// custom layout
SignUp.getLayout = function getLayout(page: ReactElement) {
    return <EmptyLayout>{page}</EmptyLayout>;
};

export default SignUp;
