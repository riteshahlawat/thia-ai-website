import { mode, darken } from '@chakra-ui/theme-tools';

export const buttonStyles = {
  // Styles for the base style
  baseStyle: {
    _focus: { boxShadow: 'none' },
    borderRadius: '3xl',
  },
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    primary: (props: any) => ({
      bg: mode('thia.purple-base', 'thia.purple-dark')(props),
      color: mode('thia.text-base', 'thia.text-dark')(props),
      _hover: { bg: mode('thia.purple-base', 'thia.purple-hover-dark')(props) },
      _active: { bg: mode('thia.purple-base', 'thia.purple-dark')(props) },
    }),
    primaryOutline: (props: any) => ({
      bg: 'transparent',
      color: mode('thia.text-base', 'thia.text-dark')(props),
      _hover: { bg: mode('thia.purple-base', 'thia.purple-dark')(props) },
      _active: { bg: mode('thia.purple-base', 'thia.purple-dark')(props) },
      outline: mode(
        '2px solid var(--chakra-colors-thia-purple-base)',
        '2px solid var(--chakra-colors-thia-purple-dark)'
      )(props),
    }),
    secondary: (props: any) => ({
      bg: mode('gray.100', 'whiteAlpha.200')(props),
      _hover: { bg: mode('gray.200', 'whiteAlpha.300')(props) },
      _active: {
        bg: mode('thia.purple-base', 'thia.purple-dark')(props),
      },
    }),
    secondaryGhost: (props: any) => ({
      _hover: { bg: mode('thia.purple-base', 'whiteAlpha.200')(props) },
      _active: {
        bg: mode('thia.purple-base', 'thia.purple-dark')(props),
      },
    }),
  },

  // The default `size` or `variant` values
  defaultProps: {},
};
