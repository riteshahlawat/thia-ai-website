import React, { useEffect, useState } from 'react';
import { useAuth, useSigninCheck, useUser } from 'reactfire';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type Props = {};

const Dashboard = (props: Props) => {
    const { data: user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push('/signin');
        else {
            user.getIdToken().then(val => {
                navigator.clipboard.writeText(val);
            });
        }
    }, [user, router]);

    if (user) {
        const idToken = user.getIdToken();
        console.log(idToken);
    }

    return <Box>Welcome, {user?.uid}</Box>;
};

export default Dashboard;
