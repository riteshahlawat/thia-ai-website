import React, { useEffect, useState } from 'react';
import { useAuth, useSigninCheck, useUser } from 'reactfire';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type Props = {};

const Dashboard = (props: Props) => {
    const { data: user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push('/login');
    }, [user, router]);

    return <Box>Welcome, {user?.displayName}</Box>;
};

export default Dashboard;
