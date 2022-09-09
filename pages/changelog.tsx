import { ContentContainer } from '@/components/common/ContentContainer';
import { Box, Divider, Heading, HStack, Link, Text, VStack } from '@chakra-ui/react';
import { allChangelogs, Changelog } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { socials } from '@/constants/links';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { Prose } from '@nikolovlazar/chakra-ui-prose';

type Props = { logs: Changelog[] };

const components = { Image };

const Log = ({ log }: { log: Changelog }) => {
    const [date, setDate] = useState<string>('');
    const MDXComponent = useMDXComponent(log.body.code || '');

    useEffect(() => {
        setDate(new Date(log.createdAt).toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' }));
    }, []);

    return (
        <>
            <Divider my='10' borderColor='thia.gray.800' />
            <HStack w='full' align='flex-start' pt={10} pb={16}>
                <Box w='25%' mr='24px' flexShrink={0} color='thia.gray.500'>
                    {date}
                </Box>
                <Prose as='article'>
                    <MDXComponent components={components} />
                </Prose>
            </HStack>
        </>
    );
};

const ChangeLog = ({ logs }: Props) => {
    return (
        <ContentContainer mt='24'>
            <HStack>
                <Box w='25%' mr='24px' flexShrink={0}></Box>
                <VStack pt='10' pb='8' align='flex-start'>
                    <Heading fontSize='56px'>Changelog</Heading>
                    <Text color='thia.gray.500'>Read about the newest updates and improvments to Thia.</Text>
                    <Text>
                        <Link variant='purple' href='#newsletter'>Subscribe to our newsletter</Link>&nbsp;&nbsp;·&nbsp;&nbsp;
                        <Link variant='purple' href={socials.twitter.path as string} isExternal>
                            Follow us on Twitter
                        </Link>
                    </Text>
                </VStack>
            </HStack>

            <VStack>
                {logs.map((log: Changelog, i: number) => {
                    return <Log key={i} log={log} />;
                })}
            </VStack>
        </ContentContainer>
    );
};

export const getServerSideProps = async () => {
    const logs = allChangelogs.sort((a: Changelog, b: Changelog) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return { props: { logs } };
};

export default ChangeLog;
