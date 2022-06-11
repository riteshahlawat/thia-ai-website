import { mode } from '@chakra-ui/theme-tools';
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose';

import { Link } from './components/link';
import { Button } from './components/button';

// Add color mode config
const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};

// Extend the theme
export const theme = extendTheme(
    {
        config,
        fonts: {
            body: `'Poppins', sans-serif`,
            Heading: `'Poppins', sans-serif`,
        },
        colors: {
            thia: {
                'bg-base': '#ffffff',
                'bg-dark': '#000000',
                'text-base': 'var(--purple-990)',
                'text-dark': '#ffffff',
                'purple-base': 'var(--purple-200)',
                'purple-dark': 'var(--purple-600)',
                gray: {
                    50: 'var(--gray-50)',
                    100: 'var(--gray-100)',
                    200: 'var(--gray-200)',
                    300: 'var(--gray-300)',
                    400: 'var(--gray-400)',
                    500: 'var(--gray-500)',
                    600: 'var(--gray-600)',
                    700: 'var(--gray-700)',
                    800: 'var(--gray-800)',
                    900: 'var(--gray-900)',
                    950: 'var(--gray-950)',
                    990: 'var(--gray-990)',
                },
                purple: {
                    50: 'var(--purple-50)',
                    100: 'var(--purple-100)',
                    200: 'var(--purple-200)',
                    300: 'var(--purple-300)',
                    400: 'var(--purple-400)',
                    500: 'var(--purple-500)',
                    600: 'var(--purple-600)',
                    700: 'var(--purple-700)',
                    800: 'var(--purple-800)',
                    900: 'var(--purple-900)',
                    950: 'var(--purple-950)',
                    990: 'var(--purple-990)',
                },
            },
        },
        styles: {
            global: (props: any) => ({
                body: {
                    bg: mode('thia.bg-base', 'thia.bg-dark')(props),
                    color: mode('thia.text-base', 'thia.text-dark')(props),
                },
            }),
        },
        sizes: {
            container: {
                '2xl': '1440px',
            },
        },
        components: {
            Link,
            Button,
        },
    },
    withProse({
        baseStyle: props => ({
            h1: {
                fontFamily: 'Open Sans',
            },
            h2: {
                fontFamily: 'Open Sans',
            },
            h3: {
                fontFamily: 'Open Sans',
            },
            h4: {
                fontFamily: 'Open Sans',
            },
            h5: {
                fontFamily: 'Open Sans',
            },
            h6: {
                fontFamily: 'Open Sans',
            },
            p: {
                fontFamily: 'Open Sans',
                fontWeight: mode('400', '300')(props),
            },
            li: {
                fontFamily: 'Open Sans',
                fontWeight: mode('400', '300')(props),
            },
            pre: {
                p: '4',
                rounded: 'md',
                bg: 'var(--gray-950) !important',
                // color: mode('black', 'white')(props),
                overflow: 'auto',
                code: {
                    bg: 'inherit',
                    '&::before, &::after': {
                        content: "''",
                    },
                },
            },
            code: {
                px: '1.5',
                pb: '0.5',
                borderRadius: 'md',
                bg: mode('thia.gray.300', 'thia.gray.900')(props),
                color: mode('thia.gray.900', 'white')(props),
                '&::before, &::after': {
                    content: "''",
                },
            },
        }),
    })
);
