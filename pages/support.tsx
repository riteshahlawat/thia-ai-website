import React, { useState } from 'react';
import type { NextPage } from 'next';
import { SeoPage } from '@/components/seo/SeoPage';
import { ContentContainer } from '@/components/common/ContentContainer';
import { Box, Heading, Text, Divider, useColorModeValue, VStack, Flex, Center, Button, useToast } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { object, string } from 'yup';
import { InputFormControl } from '@/components/common/InputFormControl';
import { BackendRequestHandler } from 'backend-requests/backendRequestHandler';
import { SubmitContactFormData } from 'backend-requests/requests/post/submitContactForm';

const contactFormSchema = object({
    name: string().min(3, 'Name must be at least 3 characters.').required('Name is required.'),
    email: string().required('Contact email is required.').email('Please enter a valid email.'),
    subject: string().required('Subject is required.'),
    message: string().required('Please enter a message'),
});

export type SupportContactFormValues = {
    name: string;
    email: string;
    message: string;
    subject: string;
};

const Support: NextPage = () => {
    const toast = useToast();
    const [submittingContactForm, setSubmittingContactForm] = useState(false);
    const secondaryTextColor = useColorModeValue('thia.gray.700', 'thia.gray.300');
    const contactFormInitialValues: SupportContactFormValues = { name: '', email: '', message: '', subject: '' };

    const submitContactForm = async (values: SupportContactFormValues, { resetForm }: FormikHelpers<SupportContactFormValues>) => {
        setSubmittingContactForm(true);
        const contactFormData: SubmitContactFormData = {
            ...values,
            dev: process.env.NODE_ENV === 'development',
        };
        const [isError, resData] = await BackendRequestHandler.getInstance().submitContactForm(contactFormData);
        if (isError) {
            toast({
                title: 'Error',
                description: resData.message,
                status: 'error',
                duration: 2500,
                isClosable: false,
            });
        } else {
            toast({
                title: 'Contact Form Submitted',
                description: 'Give us a couple days to respond',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            resetForm();
        }
        setSubmittingContactForm(false);
    };

    return (
        <SeoPage title='Support'>
            <ContentContainer>
                <Box mt='12' mb='10' ml='3'>
                    <Heading fontSize={{ base: '6xl', md: '7xl', '2xl': '8xl' }}>Contact Us</Heading>
                    <Text color={secondaryTextColor} pt={2} fontSize={{ base: 'lg', md: 'xl' }} ml='2'>
                        Let&apos;s start a conversation
                    </Text>
                </Box>
                <Divider my={10} />
                <Formik initialValues={contactFormInitialValues} validationSchema={contactFormSchema} onSubmit={submitContactForm}>
                    {({ errors, touched }) => (
                        <Form style={{ width: '100%' }} noValidate>
                            <Flex flexDir={{ base: 'column', lg: 'row' }} justify={{ base: 'initial', lg: 'space-evenly' }}>
                                <VStack spacing={4} w={{ base: 'full', lg: '35%' }}>
                                    <InputFormControl
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
                                        label='Subject'
                                        name='subject'
                                        type='text'
                                        errors={errors.subject}
                                        touched={touched.subject}
                                    />
                                </VStack>
                                <Box w={{ base: 'full', lg: '55%' }} mt={{ base: '8', lg: '0' }}>
                                    <InputFormControl
                                        isRequired
                                        label='Message'
                                        name='message'
                                        h={{ base: '165px', lg: '215px' }}
                                        textArea={{ resize: 'none' }}
                                        errors={errors.message}
                                        touched={touched.message}
                                    />
                                </Box>
                            </Flex>
                            <Center mt='8'>
                                <Button
                                    size='lg'
                                    w={{ base: 'full', lg: 'fit-content' }}
                                    px='8'
                                    type='submit'
                                    variant='primary'
                                    colorScheme='gray'
                                    isLoading={submittingContactForm}
                                >
                                    Send Us A Message
                                </Button>
                            </Center>
                        </Form>
                    )}
                </Formik>
            </ContentContainer>
        </SeoPage>
    );
};

export default Support;
