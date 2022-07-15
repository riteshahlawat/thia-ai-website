import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { SeoPage } from '@/components/seo/SeoPage';
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

    return (
        <SeoPage title='Download' description='Download Thia today!'>
            Download
        </SeoPage>
    );
};

export default Download;
