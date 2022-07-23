import '@fontsource/ibm-plex-sans/100.css';
import '@fontsource/ibm-plex-sans/200.css';
import '@fontsource/ibm-plex-sans/300.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';

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
import { BackendRequestHandler } from 'backend-requests/backendRequestHandler';
import BackendRequestConfig from 'backend-requests/backendRequestConfig';
import { DefaultSeo } from '@/components/seo/DefaultSeo';

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

const firebaseConfig = getFirebaseConfig();
const backendRequestHandler = BackendRequestHandler.getInstance();
backendRequestHandler.initInstances(BackendRequestConfig);

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    ProgressBar();

    const getLayout = Component.getLayout ?? (page => <BaseLayout>{page}</BaseLayout>);
    return (
        <ChakraProvider theme={theme}>
            <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                <AuthProvider>
                    <DefaultSeo />
                    {getLayout(<Component {...pageProps} />)}
                </AuthProvider>
            </FirebaseAppProvider>
        </ChakraProvider>
    );
};

export default App;

// may need to add colorModeManager for SSR, view https://chakra-ui.com/docs/styled-system/features/color-mode for more details
