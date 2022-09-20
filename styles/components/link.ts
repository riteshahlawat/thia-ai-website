import { ComponentStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const Link: ComponentStyleConfig = {
    baseStyle: (props: any) => ({
        _focus: {
            boxShadow: 'none',
        },
        textDecoration: 'none !important',
        transitionDuration: '300ms',
        color: mode('thia.gray.700', 'thia.gray.500')(props),
        _hover: { color: mode('thia.text-base', 'thia.text-dark')(props) },
    }),
    variants: {
        primaryLink: (props: any) => ({
            color: mode('thia.purple.300', 'thia.purple.300')(props),
            _hover: { color: mode('thia.purple.400', 'thia.purple.400')(props) },
            _active: { color: mode('thia.purple.500', 'thia.purple.500')(props) },
        }),
        purple: (props: any) => ({
            color: mode('thia.purple.600', 'thia.purple.200')(props),
            _hover: { color: mode('thia.purple.400', 'thia.purple.100')(props) },
            letterSpacing: 'wide',
            fontWeight: 'normal',
        }),
    },
};
