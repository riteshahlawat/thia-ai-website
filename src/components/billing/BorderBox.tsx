import { Box, useColorModeValue } from '@chakra-ui/react';

export const BorderBox = ({ children }: { children?: React.ReactNode }) => {
    return (
        <Box
            bg={useColorModeValue('transparent', 'thia.gray.990')}
            w='full'
            shadow='sm'
            rounded='lg'
            border='2px'
            borderColor={useColorModeValue('thia.gray.50', 'thia.gray.990')}
            overflow='hidden'
        >
            {children}
        </Box>
    );
};
