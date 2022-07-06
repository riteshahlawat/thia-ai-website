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
import AuthProvider from '../src/auth/AuthProvider';
import { NextPageWithLayout } from '../src/types/NextPageWithLayout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    ProgressBar();

    const stripePromise = loadStripe('pk_live_51LDKK1IdzODCxCioPg4HCQd4Jxd4oDdc3rw15YyDUQvEZZsI0YliDOLW9FW1wJRC4fVwf97utkvvocdaVIvMCiRf00fM5BbKK3')
    const getLayout = Component.getLayout ?? (page => <Layout>{page}</Layout>);

    return (
        <ChakraProvider theme={theme}>
            <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                <AuthProvider>
                    <Elements stripe={stripePromise}>
                        {getLayout(<Component {...pageProps} />)}
                    </Elements>
                </AuthProvider>
            </FirebaseAppProvider>
        </ChakraProvider>
    );
};

export default App;

// may need to add colorModeManager for SSR, view https://chakra-ui.com/docs/styled-system/features/color-mode for more details
