import '@fontsource/poppins';
import '@fontsource/open-sans';
import '@fontsource/ibm-plex-sans';
import '@fontsource/open-sans/300.css';
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
import { firebaseConfig } from '../firebase/firebase';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthProvider } from '@/auth/AuthProvider';
import { NextPageWithLayout } from '@/types/NextPageWithLayout';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    ProgressBar();

    const stripePromise = loadStripe(
        'pk_live_51LDKK1IdzODCxCioPg4HCQd4Jxd4oDdc3rw15YyDUQvEZZsI0YliDOLW9FW1wJRC4fVwf97utkvvocdaVIvMCiRf00fM5BbKK3'
    );
    const getLayout = Component.getLayout ?? (page => <BaseLayout>{page}</BaseLayout>);

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <ChakraProvider theme={theme}>
                    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                        <AuthProvider>
                            <Elements stripe={stripePromise}>
                                {getLayout(<Component {...pageProps} />)}
                            </Elements>
                        </AuthProvider>
                    </FirebaseAppProvider>
                </ChakraProvider>
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;

// may need to add colorModeManager for SSR, view https://chakra-ui.com/docs/styled-system/features/color-mode for more details
