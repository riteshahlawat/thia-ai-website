import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { AuthTemplatePage } from '../src/auth/AuthTemplatePage';
import { ChakraNextLink } from '../src/modules/common/ChakraNextLink';
import { NextPageWithLayout } from '../src/types/NextPageWithLayout';

type Props = {};

const text = "Enter the email address associated with your accoutn anad we&apos;ll send you a link to reset your password.";

const ResetPassword: NextPageWithLayout = (props: Props) => {
    return (
        <AuthTemplatePage heading='Reset Password' text={text}>
            <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    type='email'
                    placeholder='Enter Email Address'
                    bg={useColorModeValue('white', 'black')}
                />
                <FormErrorMessage>{}</FormErrorMessage>
            </FormControl>
            <Button variant='primary' w='full'>
                Reset Password
            </Button>
            <Flex gap={3} fontSize='sm'>
                <Text>Don&apos;t have an account?</Text>
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
    );
};

export default ResetPassword;
