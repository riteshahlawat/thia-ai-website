import { ComponentStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const Link: ComponentStyleConfig = {
    baseStyle: {
        _focus: {
            boxShadow: 'none',
        },
    },
    variants: {
        primaryLink: (props: any) => ({
            color: mode('thia.purple.300', 'thia.purple.500')(props),
            _hover: { color: mode('thia.purple.400', 'thia.purple.600')(props) },
            _active: { color: mode('thia.purple.500', 'thia.purple.700')(props) },
        }),
        purple: (props: any) => ({
            color: mode('thia.purple.700', 'thia.purple.200')(props),
            _hover: { color: mode('thia.purple.600', 'thia.purple.300')(props) },
            letterSpacing: 'wide',
            fontWeight: 'semibold',
        }),
    },
};
