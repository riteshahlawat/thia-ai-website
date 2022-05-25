import React from 'react'
import { useAuth, useSigninCheck, useUser } from 'reactfire';
import { Box } from '@chakra-ui/react';
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
                <Box />
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