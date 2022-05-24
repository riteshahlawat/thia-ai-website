import '@fontsource/poppins';
import '../styles/globals.css';
import '../styles/nprogress.css';
import type { AppProps } from 'next/app';
import { theme } from '../styles/chakra.theme';
import { Layout } from '../src/layouts/BaseLayout';
import { ProgressBar } from '../src/hooks/progressBar';
import { ChakraProvider } from '@chakra-ui/react';
import { NextPageWithLayout } from '../src/types/NextPageWithLayoutType';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  ProgressBar();
  const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>);

  return <ChakraProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ChakraProvider>;
};

export default App;

// may need to add colorModeManager for SSR, view https://chakra-ui.com/docs/styled-system/features/color-mode for more details
