import React from 'react';
import { Field } from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Input, useColorModeValue } from '@chakra-ui/react';

type InputFormControlType = {
    errors: string | undefined;
    touched: boolean | undefined;
    label?: string;
    name: string;
    type: string;
    isRequired?: boolean;
    [rest: string]: any;
};

export const InputFormControl = ({ errors, touched, name, label, isRequired = false, type = 'text', ...rest }: InputFormControlType) => {
    const inputColor = useColorModeValue('white', 'black');

    return (
        <FormControl isRequired={isRequired} isInvalid={!!errors && touched}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <Field as={Input} id={name} name={name} type={type} bg={inputColor} {...rest} />
            <FormErrorMessage>{errors}</FormErrorMessage>
        </FormControl>
    );
};
