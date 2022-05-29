import React from 'react'
import { useAuth, useSigninCheck, useUser } from 'reactfire';
import { Box, Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type Props = {}

const Dashboard = (props: Props) => {
    const auth = useAuth();
    const router = useRouter();
	const { data: user } = useUser();
    const { status, data: signInCheckResult } = useSigninCheck();
    const DisplayDashboard = () => {
        if (status === "loading") {
            return (
                <Center w='100vw' h='100vh'>
                    <Spinner />
                </Center>
            )
        } 
        if (signInCheckResult.signedIn === true) {
            return (
                <Box>Welcome, {user?.displayName}</Box>
            )
        } else {
            router.push('/login')
            return (
                <Box />
            )
        }
    }

    return (
        <DisplayDashboard />
    )
}

export default Dashboard