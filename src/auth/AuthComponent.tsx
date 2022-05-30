import React from 'react'
import { useAuth, AuthProvider, FunctionsProvider, useFirebaseApp } from 'reactfire';
import {
	GoogleAuthProvider,
	signInWithRedirect,
	updateProfile,
	AuthErrorCodes,
	createUserWithEmailAndPassword,
	sendEmailVerification,
    getAuth, 
    getRedirectResult
} from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

interface Props {
    children: JSX.Element;
}

const AuthComponent = ({ children }: Props) => {
    const app = useFirebaseApp();
    const auth = getAuth(app);
    const functions = getFunctions(app);
    return (
        <AuthProvider sdk={auth}>
            <FunctionsProvider sdk={functions} >
                {children}
            </FunctionsProvider>
        </AuthProvider>
    )
}
export default AuthComponent