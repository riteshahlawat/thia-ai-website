import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Chakra } from '../src/Chakra';
import Layout from '../src/layout/Layout';
import ProgressBar from '../src/hooks/progressBar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  ProgressBar();
  return (
    <Chakra cookies={pageProps.cookies}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Chakra>
  );
};

export default MyApp;

// may need to add colorModeManager for SSR, view https://chakra-ui.com/docs/styled-system/features/color-mode for more details
