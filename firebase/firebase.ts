import { FirebaseOptions } from 'firebase/app';

export const getFirebaseConfig = (): FirebaseOptions => {
    if (process.env.NODE_ENV === 'development') {
        return {
            apiKey: 'AIzaSyAoiWNvP_NuTIoXQ-oghg3Ix9jWLblQXcU',
            authDomain: 'thia-dev.firebaseapp.com',
            projectId: 'thia-dev',
            storageBucket: 'thia-dev.appspot.com',
            messagingSenderId: '554589208456',
            appId: '1:554589208456:web:33c36d197c8467b1f6443d',
        };
    } else
        return {
            apiKey: 'AIzaSyDJOaqbWCPHazZsu4uyXCcYl69bSzr-hdc',
            authDomain: 'thia-1458b.firebaseapp.com',
            projectId: 'thia-1458b',
            storageBucket: 'thia-1458b.appspot.com',
            messagingSenderId: '564483189530',
            appId: '1:564483189530:web:62e754e4173dfb80fd1aa3',
            measurementId: 'G-PFW73XVXV6',
        };
};
