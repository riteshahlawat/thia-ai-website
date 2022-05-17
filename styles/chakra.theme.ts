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
  fonts: {
    body: 'Poppins, sans-serif',
  },
  colors: {
    thia: {
      'bg-base': '#ffffff',
      'bg-dark': '#000000',
      'text-base': '#000000',
      'text-dark': '#ffffff',
      'purple-base': 'var(--purple-base)',
      'purple-dark': 'var(--purple-dark)',
      'purple-hover-base': 'var(--purple-hover-base)',
      'purple-hover-dark': 'var(--purple-hover-dark)',
      'purpleAlpha.50': '',
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
