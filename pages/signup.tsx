import React, { Suspense, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router'
import {
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	HStack,
	Input,
	Stack,
	useBreakpointValue,
	Text,
	chakra,
	useToast,
    Spinner,
    LightMode,
    DarkMode,
    Box
} from '@chakra-ui/react';
import { FirebaseError } from 'firebase/app';
import {
	GoogleAuthProvider,
	signInWithRedirect,
	updateProfile,
	AuthErrorCodes,
	createUserWithEmailAndPassword,
	sendEmailVerification,
    getRedirectResult
} from 'firebase/auth';
import { useAuth, AuthProvider, FunctionsProvider, useFirebaseApp, useUser } from 'reactfire';
import { BackendRequestHandler } from '../backend-requests/backendRequestHandler';
import GoogleDarkButton from '/public/btn_google_dark_normal_ios.svg';
import BackendRequestConfig from '../backend-requests/backendRequestConfig';
import { ContentContainer } from '../src/modules/common/ContentContainer';

const Signup: NextPage = () => {
    const { data: user } = useUser();
    const auth = useAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account consent',
    });
    const toast = useToast();
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

    const googleLogin = async () => {
        await signInWithRedirect(auth, provider);
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
        setUserRegistrationDetails({
        ...userRegistrationDetails,
        [name]: val,
        });
        switch (name) {
        case 'emailAddress':
            // Email address input handling
            const emailAddressPattern =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!val.match(emailAddressPattern)) {
            setUserRegistrationErrorMessages({
                ...userRegistrationErrorMessages,
                emailAddress: 'Invalid email address',
            });
            } else {
            setUserRegistrationErrorMessages({
                ...userRegistrationErrorMessages,
                emailAddress: '',
            });
            }
            break;
        case 'fullName':
            // Full name input handling
            if (val.length < 3) {
            // Too small
            setUserRegistrationErrorMessages({
                ...userRegistrationErrorMessages,
                fullName: 'Enter valid name',
            });
            } else {
            setUserRegistrationErrorMessages({
                ...userRegistrationErrorMessages,
                fullName: '',
            });
            }
            break;
        case 'password':
            // Password input handling
            const passwordPattern = /(?=.*[0-9a-zA-Z]).{6,}/;
            if (!val.match(passwordPattern)) {
            setUserRegistrationErrorMessages({
                ...userRegistrationErrorMessages,
                password: 'Weak password, 6 alpha-num chars',
            });
            //
            } else {
            setUserRegistrationErrorMessages({
                ...userRegistrationErrorMessages,
                password: '',
            });
            }
            break;
        case 'passwordRetype':
            // Password retype input handling
            if (val !== userRegistrationDetails.password) {
            setUserRegistrationErrorMessages({
                ...userRegistrationErrorMessages,
                passwordRetype: "Passwords don't match",
            });
            } else {
            setUserRegistrationErrorMessages({
                ...userRegistrationErrorMessages,
                passwordRetype: '',
            });
            }
            break;
        }
    };

    const registerNewAccount = async () => {
        let userRegistrationDetailsFilledOut = true;
        for (const registrationDetailKey in userRegistrationDetails) {
        if (userRegistrationDetails[registrationDetailKey as keyof typeof userRegistrationDetails].trim() == '') {
            userRegistrationDetailsFilledOut = false;
            break;
        }
        }
        if (!userRegistrationDetailsFilledOut) {
        // Not all details filled out
        toast({
            title: 'Error',
            description: 'Registration not filled out',
            status: 'error',
            duration: 1500,
            isClosable: false,
        });
        return;
        }
        let userRegistrationErrorExists = false;
        for (const errorMessageKey in userRegistrationErrorMessages) {
        if (userRegistrationErrorMessages[errorMessageKey as keyof typeof userRegistrationErrorMessages] != '') {
            userRegistrationErrorExists = true;
            break;
        }
        }
        if (userRegistrationErrorExists) {
        // Not all details filled out
        toast({
            title: 'Error',
            description: 'Registration contains an error',
            status: 'error',
            duration: 1500,
            isClosable: false,
        });
        return;
        }
        setEmailRegisteringLoading(true);
        createUserWithEmailAndPassword(auth, userRegistrationDetails.emailAddress, userRegistrationDetails.password)
        .then(async (userCredential) => {
            await updateProfile(userCredential.user, {
            displayName: userRegistrationDetails.fullName,
            });
            if (!userCredential.user.emailVerified) {
                // Send verification email
                await sendEmailVerification(userCredential.user);
                await auth.signOut();
                toast({
                    title: 'Info',
                    description: 'Email verification sent, check your email',
                    status: 'info',
                    duration: 1500,
                    isClosable: false,
                });
                setEmailRegisteringLoading(false);
            } else {
            // Email already verified (don't know when this will happen but it's here in case it does)
            }
        })
        .catch((error: FirebaseError) => {
            const errorCode = error.code;
            if (errorCode == AuthErrorCodes.EMAIL_EXISTS) {
            toast({
                title: 'Error',
                description: 'Email already exists',
                status: 'error',
                duration: 1500,
                isClosable: false,
            });
            } else if (errorCode == AuthErrorCodes.WEAK_PASSWORD) {
            toast({
                title: 'Error',
                description: 'Password is too weak',
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
            setEmailRegisteringLoading(false);
        });
    };

    useEffect(() => {
        if (user) {
            router.push('/')
        }
        getOAuthResponse();
        const registerOnEnter = async (event: KeyboardEvent) => {
        if (event.key == 'Enter') {
            await registerNewAccount();
        }
        };
        window.addEventListener('keypress', registerOnEnter);
        return () => {
        window.removeEventListener('keypress', registerOnEnter);

        };
    });

    return (
        <ContentContainer>
            <Center
                w='full'
                h='full'
                overflowX='hidden'
                sx={{
                    '&::-webkit-scrollbar': {
                        w: '8px',
                        bg: 'gray.600',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        bg: 'gray.900',
                    },
                }}>
                <Stack spacing='4'>
                    <Center>
                        <Heading size={useBreakpointValue({ base: 'xl', md: '2xl' })}>Register</Heading>
                    </Center>
                    <Stack spacing='2'>
                        <FormControl
                            isInvalid={
                                userRegistrationFocusedOnce.fullName && userRegistrationErrorMessages.fullName != ''
                            }>
                            <FormLabel fontSize='14px'>
                                Name
                            </FormLabel>
                            <Input
                                name='fullName'
                                placeholder='Full Name'
                                autoFocus
                                type='text'
                                onBlur={handleRegistrationInputsFocused}
                                onChange={handleRegistrationInputsChange}
                            />
                            <FormErrorMessage fontSize='xs'>{userRegistrationErrorMessages.fullName}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={
                                userRegistrationFocusedOnce.emailAddress &&
                                userRegistrationErrorMessages.emailAddress != ''
                            }>
                            <FormLabel fontSize='14px'>
                                Email
                            </FormLabel>
                            <Input
                                name='emailAddress'
                                placeholder='E-mail Address'
                                type='text'
                                onBlur={handleRegistrationInputsFocused}
                                onChange={handleRegistrationInputsChange}
                            />
                            <FormErrorMessage fontSize='xs'>
                                {userRegistrationErrorMessages.emailAddress}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={
                                userRegistrationFocusedOnce.password && userRegistrationErrorMessages.password != ''
                            }>
                            <FormLabel fontSize='14px'>
                                Password
                            </FormLabel>
                            <Input
                                name='password'
                                placeholder='Password'
                                type='password'
                                onBlur={handleRegistrationInputsFocused}
                                onChange={handleRegistrationInputsChange}
                            />
                            <FormErrorMessage fontSize='xs'>{userRegistrationErrorMessages.password}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={
                                userRegistrationFocusedOnce.passwordRetype &&
                                userRegistrationErrorMessages.passwordRetype != ''
                            }>
                            <FormLabel fontSize='14px'>
                                Re-type Password
                            </FormLabel>
                            <Input
                                name='passwordRetype'
                                placeholder='Re-type Password'
                                type='password'
                                onBlur={handleRegistrationInputsFocused}
                                onChange={handleRegistrationInputsChange}
                            />
                            <FormErrorMessage fontSize='xs'>
                                {userRegistrationErrorMessages.passwordRetype}
                            </FormErrorMessage>
                        </FormControl>
                    </Stack>
                    <Button
                        variant='solid'
                        colorScheme='teal'
                        w='full'
                        onClick={registerNewAccount}
                        isLoading={emailRegisteringLoading}>
                        Register
                    </Button>
                    <HStack justify='space-around'>
                        <Text fontSize='sm'>Already have an account?</Text>
                        <Button variant='link' colorScheme='teal' size='sm' onClick={() => router.push('/signin')}>
                            <Text fontSize='sm'>Sign In</Text>
                        </Button>
                    </HStack>
                    <DarkMode>
                        <Button
                            bg='#4285F4'
                            borderRadius='sm'
                            onClick={googleLogin}
                            isLoading={googleRegisteringLoading}
                            _hover={{
                                backgroundColor: '#4274f4',
                            }}
                            _active={{
                                backgroundColor: '#426cf4',
                            }}
                            // leftIcon=
                            px='0'
                            pr='2'>
                            Register with Google
                        </Button>
                    </DarkMode>
                </Stack>
            </Center>
        </ContentContainer>
  )
};

export default Signup;