import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Thia theme colors
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

// Add color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// Extend the theme
const theme = extendTheme({ config, colors });

export default theme;
