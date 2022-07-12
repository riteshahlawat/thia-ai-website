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
import { getFirebaseConfig } from '../firebase/firebase';
import { AuthComponent } from '@/auth/AuthComponent';
import { NextPageWithLayout } from '@/types/NextPageWithLayout';
import { DefaultSeo } from '@/seo/DefaultSeo';

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

const firebaseConfig = getFirebaseConfig();

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    ProgressBar();

    const getLayout = Component.getLayout ?? (page => <BaseLayout>{page}</BaseLayout>);

    return (
        <ChakraProvider theme={theme}>
            <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                <AuthComponent>
                    {getLayout(
                        <>
                            <DefaultSeo />
                            <Component {...pageProps} />
                        </>
                    )}
                </AuthComponent>
            </FirebaseAppProvider>
        </ChakraProvider>
    );
};

export default App;

// may need to add colorModeManager for SSR, view https://chakra-ui.com/docs/styled-system/features/color-mode for more details
