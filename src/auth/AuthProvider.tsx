import React from 'react';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { AuthProvider as FireAuthProvider, FunctionsProvider, useFirebaseApp } from 'reactfire';

interface Props {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const functions = getFunctions(app);

    return (
        <FireAuthProvider sdk={auth}>
            <FunctionsProvider sdk={functions}>{children}</FunctionsProvider>
        </FireAuthProvider>
    );
};
