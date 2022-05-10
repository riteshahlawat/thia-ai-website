import { mode } from '@chakra-ui/theme-tools';
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Thia theme colors
const colors = {
  brand: {
    bg: { light: '#ffffff', dark: '#0a0a0a' },
    color: { light: '#000000', dark: '#ffffff' },
    primary: { light: '#90bdff', dark: '#0050c7' },
    primaryHover: { light: '#75abfb', dark: '#00398d' },
  },
};
// Thia default styles
const styles = {
  global: (props: any) => ({
    body: {
      bg: mode('brand.bg.light', 'brand.bg.dark')(props),
    },
  }),
};

const sizes = {
  container: {
    '2xl': '1440px',
  },
};

// Add color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// Extend the theme
const theme = extendTheme({ config, colors, styles, sizes });

export default theme;
