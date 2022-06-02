import React from 'react';
import {
    useAuth,
    AuthProvider as FireAuthProvider,
    FunctionsProvider,
    useFirebaseApp,
} from 'reactfire';
import {
    GoogleAuthProvider,
    signInWithRedirect,
    updateProfile,
    AuthErrorCodes,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    getAuth,
    getRedirectResult,
} from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

interface Props {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const functions = getFunctions(app);

    return (
        <FireAuthProvider sdk={auth}>
            <FunctionsProvider sdk={functions}>{children}</FunctionsProvider>
        </FireAuthProvider>
    );
};
export default AuthProvider;
