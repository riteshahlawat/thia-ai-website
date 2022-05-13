import { mode } from '@chakra-ui/theme-tools';
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { buttonStyles as Button } from './buttonStyles';

// Add color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// Extend the theme
const theme = extendTheme({
  config,
  colors: {
    thia: {
      'bg-base': '#ffffff',
      'bg-dark': '#000000',
      'text-base': '#000000',
      'text-dark': '#ffffff',
      'purple-base': '#bea5ff',
      'purple-dark': '#3500c1',
      'purple-hover-base': '#aa89ff',
      'purple-hover-dark': '#4700ff',
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('thia.bg-base', 'thia.bg-dark')(props),
      },
    }),
  },
  sizes: {
    container: {
      '2xl': '1440px',
    },
  },
  components: {
    Button,
    Link: {
      baseStyle: {
        _focus: {
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
