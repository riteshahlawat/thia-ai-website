import React, { useEffect, useState } from 'react';
import { useAuth, useSigninCheck, useUser } from 'reactfire';
import { Box, Center, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

type Props = {};

const Settings = (props: Props) => {
    const { data: user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) router.push('/login');
    });

    return (
        <>
            <NextSeo title='Settings' />
            <Center>
                <Tabs>
                    <TabList>
                        <Tab>General</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Box>General</Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Center>
        </>
    );
};

export default Settings;
