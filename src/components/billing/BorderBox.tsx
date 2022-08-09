import { Box, useColorModeValue } from '@chakra-ui/react';

export const BorderBox = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Box
            bg={useColorModeValue('white', 'thia.gray.990')}
            w='full'
            shadow='sm'
            rounded='lg'
            border='1px'
            borderColor={useColorModeValue('thia.gray.100', 'thia.gray.990')}
            overflow='hidden'
        >
            {children}
        </Box>
    );
};
