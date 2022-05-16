import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../src/layout/Layout';
import ProgressBar from '../src/hooks/progressBar';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../chakra.theme';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from '../firebase/firebase';


const App = ({ Component, pageProps }: AppProps) => {
    ProgressBar();

    return (
        <ChakraProvider theme={theme}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <Layout>
            <Component {...pageProps} />
            </Layout>
        </FirebaseAppProvider>
        </ChakraProvider>
    );
};

export default App;

// may need to add colorModeManager for SSR, view https://chakra-ui.com/docs/styled-system/features/color-mode for more details
