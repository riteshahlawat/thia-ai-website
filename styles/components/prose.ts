import { mode } from '@chakra-ui/theme-tools';

export const Prose = {
    baseStyle: (props: any) => ({
        h1: {
            display: 'block',
            fontSize: '2em',
            my: '0.67em !important',
            mx: '0 !important',
            letterSpacing: '.07em',
        },
        h2: {
            display: 'block',
            fontSize: '1.5em !important',
            my: '0.83em !important',
            mx: '0 !important',
            letterSpacing: '.07em',
        },
        h3: {
            display: 'block',
            fontSize: '1.17em',
            my: '1em !important',
            mx: '0 !important',
            letterSpacing: '.07em',
        },
        h4: {
            display: 'block',
            fontSize: '1em',
            my: '1.33em !important',
            mx: '0 !important',
            letterSpacing: '.07em',
        },
        h5: {
            display: 'block',
            fontSize: '.83em',
            my: '1.67em !important',
            mx: '0 !important',
            letterSpacing: '.07em',
        },
        h6: {
            display: 'block',
            fontSize: '.67em',
            my: '2.33em !important',
            mx: '0 !important',
            letterSpacing: '.07em',
        },
        p: {
            fontWeight: mode('normal', 'normal')(props),
            color: mode('thia.gray.950', 'thia.gray.500')(props),
        },
        li: {
            fontWeight: mode('400', '300')(props),
            '&::marker': {
                color: mode('var(--chakra-colors-thia-purple-600) !important', 'var(--chakra-colors-thia-purple-200) !important')(props),
                content: `"–"`,
            },
            color: mode('thia.gray.950', 'thia.gray.300')(props),
        },
        pre: {
            p: '4',
            rounded: 'md',
            bg: 'var(--gray-990) !important',
            // color: mode('black', 'white')(props),
            overflow: 'auto',
            code: {
                bg: 'inherit',
                '&::before, &::after': {
                    content: "''",
                },
            },
        },
        strong: {
            color: mode('black', 'white')(props),
            fontWeight: '600',
            letterSpacing: '.08em',
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
            borderColor: mode('var(--chakra-colors-thia-gray-300) !important', 'var(--chakra-colors-thia-gray-600) !important')(props),
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
                th: {
                    border: '2px solid',
                    borderColor: mode('thia.gray.300', 'thia.gray.600'),
                },
            },
            tbody: {
                tr: {
                    borderBottomColor: mode(
                        'var(--chakra-colors-thia-gray-300) !important',
                        'var(--chakra-colors-thia-gray-600) !important'
                    )(props),

                    fontWeight: 'light',

                    td: {
                        border: '1px solid',
                        borderColor: mode('thia.gray.300', 'thia.gray.600'),
                    },
                },
            },
        },
    }),
};
