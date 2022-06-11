import '@fontsource/poppins';
import '@fontsource/open-sans';
import '@fontsource/open-sans/300.css';
import '../styles/globals.css';
import '../styles/github-dark.min.css';
import '../styles/nprogress.css';
import type { AppProps } from 'next/app';
import { theme } from '../styles/chakra.theme';
import { BaseLayout } from '../src/layouts/BaseLayout';
import { ProgressBar } from '../src/hooks/progressBar';
import { ChakraProvider } from '@chakra-ui/react';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from '../firebase/firebase';
import AuthComponent from '../src/auth/AuthComponent';
import { NextPageWithLayout } from '../src/types/NextPageWithLayout';

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
    ProgressBar();

    const getLayout = Component.getLayout ?? (page => <BaseLayout>{page}</BaseLayout>);

    return (
        <ChakraProvider theme={theme}>
            <FirebaseAppProvider firebaseConfig={firebaseConfig}>
                <AuthComponent>{getLayout(<Component {...pageProps} />)}</AuthComponent>
            </FirebaseAppProvider>
        </ChakraProvider>
    );
};

export default App;

// may need to add colorModeManager for SSR, view https://chakra-ui.com/docs/styled-system/features/color-mode for more details
