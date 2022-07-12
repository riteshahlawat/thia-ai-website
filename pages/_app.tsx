import '@fontsource/ibm-plex-sans';
import '../styles/katex/katex.min.css';
import '../styles/globals.css';
import '../styles/github-dark.min.css';
import '../styles/nprogress.css';

import type { AppProps } from 'next/app';
import { theme } from '../styles/chakra.theme';
import { BaseLayout } from '@/components/pageLayouts/BaseLayout';
import { ProgressBar } from '@/hooks/progressBar';
import { ChakraProvider } from '@chakra-ui/react';
import { FirebaseAppProvider } from 'reactfire';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthProvider } from '@/auth/AuthProvider';
import { getFirebaseConfig } from '../firebase/firebase';
import { NextPageWithLayout } from '@/types/NextPageWithLayout';
import { DefaultSeo } from '@/seo/DefaultSeo';

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

const firebaseConfig = getFirebaseConfig();

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    ProgressBar();

    const stripePromise = loadStripe(
        'pk_live_51LDKK1IdzODCxCioPg4HCQd4Jxd4oDdc3rw15YyDUQvEZZsI0YliDOLW9FW1wJRC4fVwf97utkvvocdaVIvMCiRf00fM5BbKK3'
    );
    const getLayout = Component.getLayout ?? (page => <BaseLayout>{page}</BaseLayout>);

    return (
        <ChakraProvider theme={theme}>
            <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                <AuthProvider>
                    <Elements stripe={stripePromise}>
                        <DefaultSeo />
                        {getLayout(<Component {...pageProps} />)}
                    </Elements>
                </AuthProvider>
            </FirebaseAppProvider>
        </ChakraProvider>
    );
};

export default App;

// may need to add colorModeManager for SSR, view https://chakra-ui.com/docs/styled-system/features/color-mode for more details
