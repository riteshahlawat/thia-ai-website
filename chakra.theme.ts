import { mode } from '@chakra-ui/theme-tools';
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Thia theme colors
const colors = {
  brand: {
    light: { bg: '#ffffff', primary: '#00050f' },
    dark: { bg: '#0a0a0a', primary: '#00050f' },
  },
};

// Thia default styles
const styles = {
  global: (props: any) => ({
    body: {
      bg: mode('brand.light.bg', 'brand.dark.bg')(props),
    },
  }),
};

// Add color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// Extend the theme
const theme = extendTheme({ config, colors, styles });

export default theme;
