import React from 'react';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { AuthProvider, FunctionsProvider, useFirebaseApp } from 'reactfire';

interface Props {
    children: React.ReactNode;
}

export const AuthComponent = ({ children }: Props) => {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const functions = getFunctions(app);

    return (
        <AuthProvider sdk={auth}>
            <FunctionsProvider sdk={functions}>{children}</FunctionsProvider>
        </AuthProvider>
    );
};
