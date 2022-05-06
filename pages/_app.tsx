import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import theme from '../chakra.theme';
import ProgressBar from '../src/hooks/progressBar';

function MyApp({ Component, pageProps }: AppProps) {
  ProgressBar();
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
