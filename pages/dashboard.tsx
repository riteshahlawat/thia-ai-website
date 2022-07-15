import React, { useEffect, useState } from 'react';
import { useAuth, useSigninCheck, useUser } from 'reactfire';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const { data: user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push('/signin');
    }, [user, router]);

    if (user) {
        const idToken = user.getIdToken();
        console.log(idToken);
    }

    return <Box>Welcome, {user?.displayName}</Box>;
};

export default Dashboard;
