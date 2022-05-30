import '@fontsource/poppins';
import '../styles/globals.css';
import '../styles/nprogress.css';
import type { AppProps } from 'next/app';
import { theme } from '../styles/chakra.theme';
import { Layout } from '../src/layouts/BaseLayout';
import { ProgressBar } from '../src/hooks/progressBar';
import { ChakraProvider } from '@chakra-ui/react';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from '../firebase/firebase';
import AuthComponent from '../src/auth/AuthComponent';


const App = ({ Component, pageProps, }: AppProps) => {
    ProgressBar();

    return (
        <ChakraProvider theme={theme}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <AuthComponent>
                <Layout>
                <Component {...pageProps} />
                </Layout>
            </AuthComponent>
        </FirebaseAppProvider>
        </ChakraProvider>
    );
};

export default App;

// may need to add colorModeManager for SSR, view https://chakra-ui.com/docs/styled-system/features/color-mode for more details
