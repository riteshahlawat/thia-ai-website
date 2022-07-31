import React, { useEffect, useState } from 'react';
import { useAuth, useSigninCheck, useUser } from 'reactfire';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const { data: user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user === null) router.push('/signin');
        else if (user) {
            user.getIdToken().then(val => {
                navigator.clipboard.writeText(val);
            });
        }
    }, [user, router]);

    return <Box>Welcome, {user?.displayName}</Box>;
};

export default Dashboard;
