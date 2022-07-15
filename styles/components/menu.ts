import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

// TODO: Have purple color for the menu items

export const Menu = {
    baseStyle: (props: StyleFunctionProps) => ({
        list: {
            bg: mode('thia.gray.50', 'thia.gray.950')(props),
            boxShadow: mode('xl', 'lg')(props),
        },
        item: {
            _hover: {
                bg: mode('thia.gray.200', 'thia.gray.800')(props),
            },
            _focus: {
                bg: mode('thia.gray.200', 'thia.gray.800')(props),
            },
            color: mode('thia.gray.900', 'thia.gray.100')(props),
        },

        divider: {
            borderColor: mode('thia.gray.200', 'inherit')(props),
        },
    }),
};
