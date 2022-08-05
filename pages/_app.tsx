import '@fontsource/ibm-plex-sans';
import '@fontsource/krona-one';
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
