import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../src/layout/Layout';
import ProgressBar from '../src/hooks/progressBar';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/chakra.theme';

const App = ({ Component, pageProps }: AppProps) => {
  ProgressBar();
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default App;

// may need to add colorModeManager for SSR, view https://chakra-ui.com/docs/styled-system/features/color-mode for more details
