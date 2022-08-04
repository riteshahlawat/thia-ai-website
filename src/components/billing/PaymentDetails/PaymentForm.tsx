import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Flex, FormControl, FormErrorMessage, Input, Select, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import * as yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { InputFormControl } from '@/components/common/InputFormControl';
import { Countries } from '@/utils/isoCountries';
import Stripe from 'stripe';

export type BillingValuesType = {
    cardholderName: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
};

const billingDetailsSchema = yup.object({
    cardholderName: yup.string(),
    line1: yup.string().required('Address is required.'),
    line2: yup.string(),
    city: yup.string().required('City is required.'),
    state: yup.string().required('State is required.'),
    country: yup.string().required('Country is required.'),
    postal_code: yup.string().required('Zip/Postal code is required.'),
});

type PaymentFormType = {
    formID: string;
    onSubmit: (arg0: BillingValuesType) => void;
    initialData?: Stripe.PaymentMethod.BillingDetails;
};

export const PaymentForm = ({ formID, onSubmit, initialData }: PaymentFormType) => {
    const inputBG = useColorModeValue('thia.gray.50', 'thia.gray.950');
    const borderColor = useColorModeValue('thia.gray.100', 'transparent');
    const color = 'thia.gray.600';

    const initialValues: BillingValuesType = {
        cardholderName: initialData?.name ?? '',
        line1: initialData?.address?.line1 ?? '',
        line2: initialData?.address?.line2 ?? '',
        city: initialData?.address?.city ?? '',
        state: initialData?.address?.state ?? '',
        country: initialData?.address?.country ?? '',
        postal_code: initialData?.address?.postal_code ?? '',
    };

    return (
        <>
            <Text>Billing information</Text>
            <motion.div style={{ width: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Formik initialValues={initialValues} validationSchema={billingDetailsSchema} onSubmit={onSubmit}>
                    {({ errors, touched }) => (
                        <Form style={{ width: '100%' }} noValidate id={formID}>
                            <VStack spacing={3} pb={2}>
                                <InputFormControl
                                    type='text'
                                    name='cardholderName'
                                    placeholder='Cardholder name'
                                    errors={errors.cardholderName}
                                    touched={touched.cardholderName}
                                    size='sm'
                                    rounded='lg'
                                    bg={inputBG}
                                    _placeholder={{ color }}
                                    borderColor={borderColor}
                                    border='2px'
                                />
                                <InputFormControl
                                    name='line1'
                                    type='text'
                                    placeholder='Address line 1'
                                    errors={errors.line1}
                                    touched={touched.line1}
                                    size='sm'
                                    rounded='lg'
                                    bg={inputBG}
                                    _placeholder={{ color }}
                                    borderColor={borderColor}
                                    border='2px'
                                />
                                <InputFormControl
                                    name='line2'
                                    type='text'
                                    placeholder='Address line 2'
                                    errors={errors.line2}
                                    touched={touched.line2}
                                    size='sm'
                                    rounded='lg'
                                    bg={inputBG}
                                    _placeholder={{ color }}
                                    borderColor={borderColor}
                                    border='2px'
                                />
                                <Flex gap={3}>
                                    <InputFormControl
                                        name='city'
                                        type='text'
                                        placeholder='City'
                                        errors={errors.city}
                                        touched={touched.city}
                                        size='sm'
                                        rounded='lg'
                                        bg={inputBG}
                                        _placeholder={{ color }}
                                        borderColor={borderColor}
                                        border='2px'
                                    />
                                    <InputFormControl
                                        name='postal_code'
                                        type='text'
                                        placeholder='Zip/Postal'
                                        errors={errors.postal_code}
                                        touched={touched.postal_code}
                                        size='sm'
                                        rounded='lg'
                                        bg={inputBG}
                                        _placeholder={{ color }}
                                        borderColor={borderColor}
                                        border='2px'
                                    />
                                </Flex>
                                <Flex gap={3}>
                                    <InputFormControl
                                        name='state'
                                        type='text'
                                        placeholder='State/Province'
                                        errors={errors.state}
                                        touched={touched.state}
                                        size='sm'
                                        rounded='lg'
                                        bg={inputBG}
                                        _placeholder={{ color }}
                                        borderColor={borderColor}
                                        border='2px'
                                    />
                                    <FormControl isRequired isInvalid={!!errors.country && touched.country}>
                                        <Field
                                            as={Select}
                                            name='country'
                                            id='country'
                                            placeholder='Country'
                                            errors={errors.country}
                                            touched={touched.country}
                                            size='sm'
                                            rounded='lg'
                                            bg={inputBG}
                                            _placeholder={{ color }}
                                            borderColor={borderColor}
                                            border='2px'
                                        >
                                            {Countries.map(({ name, a2code }) => (
                                                <option key={a2code} value={a2code}>
                                                    {name}
                                                </option>
                                            ))}
                                        </Field>
                                        <FormErrorMessage>{errors.country}</FormErrorMessage>
                                    </FormControl>
                                </Flex>
                            </VStack>
                        </Form>
                    )}
                </Formik>
            </motion.div>
        </>
    );
};
