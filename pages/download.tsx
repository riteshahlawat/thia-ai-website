import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useUser } from 'reactfire';

const Download: NextPage = () => {
    const { data: user } = useUser();
    useEffect(() => {
        if (user) {
            user.getIdToken().then(val => {
                navigator.clipboard.writeText(val);
            });
        }
    }, [user]);
    return <div>Download</div>;
};

export default Download;
