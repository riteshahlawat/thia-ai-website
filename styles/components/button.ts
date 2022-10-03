import { ComponentStyleConfig } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

export const Button: ComponentStyleConfig = {
    // Styles for the base style
    baseStyle: {
        borderRadius: '3xl',
        transition: '300ms',
        fontWeight: 500,
        letterSpacing: 'wide',
    },
    // Styles for the size variations
    sizes: {
        xl: {
            h: 14,
            minW: 14,
            fontSize: 'xl',
            px: 7,
        },
    },
    // Styles for the visual style variations
    variants: {
        primary: (props: StyleFunctionProps) => ({
            bg: mode('thia.purple.50', 'thia.purple.700')(props),
            color: mode('thia.purple.900', 'white')(props),
            _hover: {
                bg: mode('thia.purple.100', 'thia.purple.600')(props),
                borderRadius: 'lg',
                _disabled: {
                    bgColor: mode('thia.purple.50', 'thia.purple.800')(props),
                },
            },
            _active: { bg: mode('thia.purple.200', 'thia.purple.700')(props) },
        }),
        primaryOutline: (props: StyleFunctionProps) => ({
            bg: 'transparent',
            color: mode('thia.text-base', 'thia.text-dark')(props),
            _hover: { bg: mode('thia.purple.50', 'thia.purple.900')(props), borderRadius: 'lg' },
            _active: { bg: mode('thia.purple.100', 'thia.purple.800')(props) },
            outline: mode('2px solid var(--purple-200)', '2px solid var(--purple-600)')(props),
        }),
        secondary: (props: StyleFunctionProps) => ({
            bg: mode('blackAlpha.100', 'whiteAlpha.100')(props),
            _hover: { bg: mode('blackAlpha.200', 'whiteAlpha.200')(props), borderRadius: 'lg' },
            _active: { bg: mode('blackAlpha.300', 'whiteAlpha.300')(props) },
        }),
        secondaryGhost: (props: StyleFunctionProps) => ({
            bg: 'transparent',
            fontWeight: 'medium',
            color: mode('thia.gray.700', 'thia.gray.400')(props),
            _hover: { bg: mode('blackAlpha.100', 'whiteAlpha.200')(props), color: mode('black', 'white')(props) },
            _active: { bg: mode('blackAlpha.300', 'whiteAlpha.300')(props), color: mode('black', 'white')(props) },
        }),
    },

    // The default `size` or `variant` values
    defaultProps: {},
};
