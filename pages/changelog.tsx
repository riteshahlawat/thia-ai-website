import { ContentContainer } from '@/components/common/ContentContainer';
import { Box, Divider, Flex, Heading, HStack, Link, Text, VStack } from '@chakra-ui/react';
import { allChangelogs, Changelog } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { socials } from '@/constants/links';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { SeoPage } from '@/components/seo/SeoPage';

type Props = { logs: Changelog[] };

const components = { Image };

const Log = React.memo(({ log }: { log: Changelog }) => {
    const [date, setDate] = useState<string>('');
    const MDXComponent = useMDXComponent(log.body.code || '');

    useEffect(() => {
        setDate(new Date(log.createdAt).toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' }));
    }, []);

    return (
        <>
            <Divider my='10' borderColor='thia.gray.800' />
            <Flex
                w='full'
                align={{ base: 'initial', md: 'flex-start' }}
                justify={{ base: 'flex-start', md: 'initial' }}
                flexDir={{ base: 'column', md: 'row' }}
                pt={10}
                pb={16}
            >
                <Box
                    w={{ base: 'full', md: '25%' }}
                    mr={{ base: '0', md: '24px' }}
                    mb={{ base: '24px', md: '0' }}
                    flexShrink={0}
                    color='thia.gray.600'
                >
                    <Text>Release {log.version}</Text>
                    <Text mt='1'>{date}</Text>
                </Box>

                <Prose as='article'>
                    <MDXComponent components={components} />
                </Prose>
            </Flex>
        </>
    );
});

Log.displayName = 'Log';

const ChangeLog = React.memo(({ logs }: Props) => {
    return (
        <SeoPage title='Changelog' description='Read Thia updates'>
            <ContentContainer mt='24'>
                <HStack>
                    <Box w='25%' mr='24px' flexShrink={0}></Box>
                    <VStack pt='10' pb='8' align='flex-start'>
                        <Heading fontSize='56px'>Changelog</Heading>
                        <Text color='thia.gray.500'>Read about the newest updates and improvments to Thia</Text>
                        <Text>
                            <Link variant='purple' href='#subscribeToNewsletter'>
                                Subscribe to our newsletter
                            </Link>
                            &nbsp;&nbsp;·&nbsp;&nbsp;
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
        </SeoPage>
    );
});

ChangeLog.displayName = 'ChangeLog';

export const getServerSideProps = async () => {
    const logs = allChangelogs.sort((a: Changelog, b: Changelog) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return { props: { logs } };
};

export default ChangeLog;
