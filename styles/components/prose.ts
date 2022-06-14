import { mode } from '@chakra-ui/theme-tools';

export const Prose = {
    baseStyle: (props: any) => ({
        h1: {
            fontFamily: 'Open Sans',
            display: 'block',
            fontSize: '2em',
            my: '0.67em !important',
            mx: '0 !important',
            fontWeight: 'bold',
        },
        h2: {
            fontFamily: 'Open Sans',
            display: 'block',
            fontSize: '1.5em',
            my: '0.83em !important',
            mx: '0 !important',
            fontWeight: 'bold',
        },
        h3: {
            fontFamily: 'Open Sans',
            display: 'block',
            fontSize: '1.17em',
            my: '1em !important',
            mx: '0 !important',
            fontWeight: 'bold',
        },
        h4: {
            fontFamily: 'Open Sans',
            display: 'block',
            fontSize: '1em',
            my: '1.33em !important',
            mx: '0 !important',
            fontWeight: 'bold',
        },
        h5: {
            fontFamily: 'Open Sans',
            display: 'block',
            fontSize: '.83em',
            my: '1.67em !important',
            mx: '0 !important',
            fontWeight: 'bold',
        },
        h6: {
            fontFamily: 'Open Sans',
            display: 'block',
            fontSize: '.67em',
            my: '2.33em !important',
            mx: '0 !important',
            fontWeight: 'bold',
        },
        p: {
            fontFamily: 'Open Sans',
            fontWeight: mode('400', '300')(props),
        },
        li: {
            fontFamily: 'Open Sans',
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
            color: mode('thia.gray.300', 'thia.gray.800')(props),
            _hover: { textDecoration: 'none' },
            _focus: { boxShadow: 'none' },
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
