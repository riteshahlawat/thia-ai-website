import { ComponentStyleConfig } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const lintToButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '3xl',
    transition: '300ms',
    fontWeight: 'medium',
    px: 4,
    userSelect: 'none',
    letterSpacing: 'wide',
    whiteSpace: 'nowrap',
    h: '40px',
    w: 'fit-content',
};

export const Link: ComponentStyleConfig = {
    baseStyle: (props: StyleFunctionProps) => ({
        _focus: {},
        textDecoration: 'none !important',
        transitionDuration: '300ms',
        color: mode('thia.gray.700', 'thia.gray.500')(props),
        _hover: { color: mode('thia.text-base', 'thia.text-dark')(props) },
    }),
    variants: {
        primaryLink: (props: StyleFunctionProps) => ({
            color: mode('thia.purple.300', 'thia.purple.300')(props),
            _hover: { color: mode('thia.purple.400', 'thia.purple.400')(props) },
            _active: { color: mode('thia.purple.500', 'thia.purple.500')(props) },
        }),
        purple: (props: StyleFunctionProps) => ({
            color: mode('thia.purple.600', 'thia.purple.200')(props),
            _hover: { color: mode('thia.purple.400', 'thia.purple.100')(props) },
            letterSpacing: 'wide',
            fontWeight: 'normal',
        }),
        primaryButton: (props: StyleFunctionProps) => ({
            ...lintToButtonStyles,
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
        primaryOutlineButton: (props: StyleFunctionProps) => ({
            ...lintToButtonStyles,
            bg: 'transparent',
            color: mode('thia.text-base', 'thia.text-dark')(props),
            _hover: { bg: mode('thia.purple.50', 'thia.purple.900')(props), borderRadius: 'lg' },
            _active: { bg: mode('thia.purple.100', 'thia.purple.800')(props) },
            outline: mode('2px solid var(--purple-200)', '2px solid var(--purple-600)')(props),
        }),
        secondaryButton: (props: StyleFunctionProps) => ({
            ...lintToButtonStyles,
            bg: mode('blackAlpha.100', 'whiteAlpha.100')(props),
            _hover: { bg: mode('blackAlpha.200', 'whiteAlpha.200')(props), borderRadius: 'lg' },
            _active: { bg: mode('blackAlpha.300', 'whiteAlpha.300')(props) },
        }),
        secondaryGhostButton: (props: StyleFunctionProps) => ({
            ...lintToButtonStyles,
            bg: 'transparent',
            color: mode('thia.gray.700', 'thia.gray.400')(props),
            _hover: { bg: mode('blackAlpha.100', 'whiteAlpha.200')(props), color: mode('black', 'white')(props) },
            _active: { bg: mode('blackAlpha.300', 'whiteAlpha.300')(props), color: mode('black', 'white')(props) },
        }),
    },
};
