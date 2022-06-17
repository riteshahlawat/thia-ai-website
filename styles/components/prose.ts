import { mode } from '@chakra-ui/theme-tools';

export const Prose = {
    baseStyle: (props: any) => ({
        h1: {
            fontFamily: `'IBM Plex Sans', sans-serif`,
            display: 'block',
            fontSize: '2em',
            my: '0.67em !important',
            mx: '0 !important',
        },
        h2: {
            fontFamily: `'IBM Plex Sans', sans-serif`,
            display: 'block',
            fontSize: '1.5em',
            my: '0.83em !important',
            mx: '0 !important',
        },
        h3: {
            fontFamily: `'IBM Plex Sans', sans-serif`,
            display: 'block',
            fontSize: '1.17em',
            my: '1em !important',
            mx: '0 !important',
        },
        h4: {
            fontFamily: `'IBM Plex Sans', sans-serif`,
            display: 'block',
            fontSize: '1em',
            my: '1.33em !important',
            mx: '0 !important',
        },
        h5: {
            fontFamily: `'IBM Plex Sans', sans-serif`,
            display: 'block',
            fontSize: '.83em',
            my: '1.67em !important',
            mx: '0 !important',
        },
        h6: {
            fontFamily: `'IBM Plex Sans', sans-serif`,
            display: 'block',
            fontSize: '.67em',
            my: '2.33em !important',
            mx: '0 !important',
        },
        p: {
            fontFamily: `'IBM Plex Sans', sans-serif`,
            fontWeight: mode('400', '300')(props),
        },
        li: {
            fontFamily: `'IBM Plex Sans', sans-serif`,
            fontWeight: mode('400', '300')(props),
            '&::marker': {
                color: 'var(--chakra-colors-thia-gray-600) !important',
            },
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
            rounded: 'sm',
            bg: 'thia.gray.900',
            color: 'thia.gray.50',
            '&::before, &::after': {
                content: "''",
            },
        },
        a: {
            fontWeight: 'semibold',
            color: mode('thia.purple.300', 'thia.purple.300')(props),
            _focus: { boxShadow: 'none' },
            _hover: {
                textDecoration: 'none',
                color: mode('thia.purple.500', 'thia.purple.400')(props),
            },
        },
        hr: {
            borderColor: mode(
                'var(--chakra-colors-thia-gray-300) !important',
                'var(--chakra-colors-thia-gray-600) !important'
            )(props),
            opacity: mode('1 !important', '0.5 !important')(props),
        },
        blockquote: {
            borderInlineStartColor: mode(
                'var(--chakra-colors-thia-gray-300) !important',
                'var(--chakra-colors-thia-gray-600) !important'
            )(props),
        },
        table: {
            thead: {
                borderBottomColor: mode(
                    'var(--chakra-colors-thia-gray-300) !important',
                    'var(--chakra-colors-thia-gray-600) !important'
                )(props),
            },
            tbody: {
                tr: {
                    borderBottomColor: mode(
                        'var(--chakra-colors-thia-gray-300) !important',
                        'var(--chakra-colors-thia-gray-600) !important'
                    )(props),
                },
            },
        },
    }),
};
// a: {
//     color: mode('thia.gray.300', 'thia.gray.800')(props),
//     _hover: { textDecoration: 'none' },
//     _focus: { boxShadow: 'none' },
// },
