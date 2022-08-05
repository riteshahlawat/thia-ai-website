import {
    Box,
    Stack,
    Text,
    Input,
    IconButton,
    useColorModeValue,
    Flex,
    VStack,
    HStack,
    Divider,
    Grid,
    GridItem,
    useToast,
} from '@chakra-ui/react';
import { links, socials } from '@/constants/links';
import { BiMailSend } from 'react-icons/bi';
import { ChakraNextLink } from '@/components/common/ChakraNextLink';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { InputFormControl } from '../common/InputFormControl';
import { BackendRequestHandler } from 'backend-requests/backendRequestHandler';

const ListHeader = ({ children }: { children: string }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    );
};

type SubscribeToNewsletterValues = {
    email: string;
};
export const Footer = () => {
    const toast = useToast();
    const iconBackgroundColor = useColorModeValue('thia.gray.200', 'thia.gray.900');
    const newsletterInputBG = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
    const subscribeToNewsletterFormikSchema = object({
        email: string().email('Please enter a valid email address').required('Email is required'),
    });
    const subscribeToNewsletter = async ({ email }: SubscribeToNewsletterValues) => {
        const [isError, response] = await BackendRequestHandler.getInstance().subscribeToNewsletter({
            email,
        });
        if (isError) {
            toast({
                title: 'Error',
                description: response['message'],
                status: 'error',
                duration: 2500,
                isClosable: false,
            });
            return;
        }
        toast({
            title: 'Success',
            description: `${email} is subscribed to our newsletter`,
            status: 'success',
            duration: 2500,
            isClosable: false,
        });
    };
    return (
        <Box as='footer' bg='inherit' color={useColorModeValue('thia.text-base', 'thia.text-dark')}>
            <Grid
                templateColumns={{
                    base: '1fr 1fr 1fr',
                    md: '2fr 1fr 1fr 1fr',
                    lg: '2fr 1fr 1fr 1fr 2fr',
                }}
                fontSize='sm'
                gap={8}
                py={12}
            >
                <GridItem colSpan={{ base: 3, md: 1 }}>
                    <VStack spacing={6} align='flex-start'>
                        <Box fontSize='3xl'>Thia</Box>
                        <Text fontSize={16}>Making AutoML Simple.</Text>
                        <Stack direction={'row'} spacing={6}>
                            {Object.values(socials).map(({ label, path, icon }) => (
                                <ChakraNextLink href={path} key={label}>
                                    <IconButton
                                        key={label}
                                        rounded='full'
                                        aria-label={label}
                                        variant='secondary'
                                        _hover={{
                                            borderRadius: '3xl',
                                            bg: iconBackgroundColor,
                                        }}
                                    >
                                        {icon}
                                    </IconButton>
                                </ChakraNextLink>
                            ))}
                        </Stack>
                    </VStack>
                </GridItem>
                <GridItem>
                    <VStack align={'flex-start'}>
                        <ListHeader>Product</ListHeader>
                        <ChakraNextLink href={links.docs.index.path}>{links.docs.index.label}</ChakraNextLink>
                        <ChakraNextLink href={links.pricing.index.path}>{links.pricing.index.label}</ChakraNextLink>
                        <ChakraNextLink href={links.download.index.path}>{links.download.index.label}</ChakraNextLink>
                        <ChakraNextLink href={'#'}>Features</ChakraNextLink>
                        <ChakraNextLink href={'#'}>Tutorials</ChakraNextLink>
                    </VStack>
                </GridItem>
                <GridItem>
                    <VStack align={'flex-start'}>
                        <ListHeader>Company</ListHeader>
                        <ChakraNextLink href={'/about'}>About us</ChakraNextLink>
                        <ChakraNextLink href={'#'}>Blog</ChakraNextLink>
                        <ChakraNextLink href={'#'}>Contact us</ChakraNextLink>
                        <ChakraNextLink href={'/careers'}>Careers</ChakraNextLink>
                        <ChakraNextLink href={'#'}>Partners</ChakraNextLink>
                    </VStack>
                </GridItem>
                <GridItem>
                    <VStack align={'flex-start'}>
                        <ListHeader>Support</ListHeader>
                        <ChakraNextLink href={'#'}>Help Center</ChakraNextLink>
                        <ChakraNextLink href={'#'}>Fourms</ChakraNextLink>
                        <ChakraNextLink href={'#'}>Guides</ChakraNextLink>
                        <ChakraNextLink href={'#'}>FAQ</ChakraNextLink>
                    </VStack>
                </GridItem>
                <GridItem colSpan={{ base: 3, sm: 2, md: 1 }}>
                    <VStack align={'flex-start'}>
                        <Formik
                            initialValues={{ email: '' }}
                            validationSchema={subscribeToNewsletterFormikSchema}
                            onSubmit={subscribeToNewsletter}
                        >
                            {({ errors, touched }) => (
                                <Form noValidate>
                                    <InputFormControl
                                        isRequired
                                        name='email'
                                        type='email'
                                        submitButton={
                                            <IconButton aria-label='Subscribe' variant='primary' type='submit' icon={<BiMailSend />} />
                                        }
                                        placeholder='Your email address'
                                        labelComponent={<ListHeader>Subscribe to our newsletter</ListHeader>}
                                        variant='filled'
                                        colorScheme='thia.gray'
                                        bg={newsletterInputBG}
                                        errors={errors.email}
                                        touched={touched.email}
                                    />
                                </Form>
                            )}
                        </Formik>
                    </VStack>
                </GridItem>
            </Grid>
            <Divider />
            <Flex justify='space-between' py='8' fontSize='sm' gap={4}>
                <Text>© 2021 Thia CA, inc. All rights reserved</Text>
                <HStack spacing={{ base: 4, md: 8 }} align='start'>
                    <ChakraNextLink href={'#'}>
                        Terms
                        <Box as='span' display={{ base: 'none', md: 'inline' }}>
                            {' of Service'}
                        </Box>
                    </ChakraNextLink>
                    <ChakraNextLink href={'#'}>
                        Privacy
                        <Box as='span' display={{ base: 'none', md: 'inline' }}>
                            {' Policy'}
                        </Box>
                    </ChakraNextLink>
                    <ChakraNextLink href={'#'}>License</ChakraNextLink>
                </HStack>
            </Flex>
        </Box>
    );
};
