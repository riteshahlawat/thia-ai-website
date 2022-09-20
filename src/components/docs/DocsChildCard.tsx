import React from 'react';
import { TreeNode } from '@/types/DocsTypes';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { ChakraNextLink } from '../common/ChakraNextLink';

export const DocsChildCard = ({ slug, title, description }: TreeNode) => {
    return (
        <ChakraNextLink href={slug}>
            <Box
                px='5'
                py='0.5'
                bg={useColorModeValue('thia.gray.200', 'thia.gray.900')}
                _hover={{ bg: useColorModeValue('thia.gray.300', 'thia.gray.800') }}
                rounded='2xl'
                cursor='pointer'
            >
                <Heading as='h3' color='initial'>
                    {title}
                </Heading>
                <Text fontWeight='semibold' color={useColorModeValue('thia.gray.800', 'thia.gray.400')}>
                    {description}
                </Text>
            </Box>
        </ChakraNextLink>
    );
};
