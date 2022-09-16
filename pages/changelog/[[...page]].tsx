import React, { useEffect, useState } from 'react';
import { ContentContainer } from '@/components/common/ContentContainer';
import { Box, Divider, Flex, Heading, HStack, Link, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { allChangelogs, Changelog } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { socials } from '@/constants/links';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { SeoPage } from '@/components/seo/SeoPage';
import { useRouter } from 'next/router';
import { Pagination } from '@/components/pagination';
import Image from 'next/image';

const logsPerPage = 5;
const components = { Image };

const Log = React.memo(({ log }: { log: Changelog }) => {
    const [date, setDate] = useState<string>('');
    const MDXComponent = useMDXComponent(log.body.code || '');

    useEffect(() => {
        setDate(new Date(log.createdAt).toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' }));
    }, []);

    return (
        <>
            <Divider my={{ base: 2, md: 10 }} borderColor='thia.gray.800' />
            <Flex
                w='full'
                align={{ base: 'initial', md: 'flex-start' }}
                justify={{ base: 'flex-start', md: 'initial' }}
                flexDir={{ base: 'column', md: 'row' }}
                pt={{ base: 5, md: 10 }}
                pb={{ base: 10, md: 16 }}
            >
                <Box
                    position={{ base: 'static', md: 'sticky' }}
                    top='calc(var(--header-height) + 1em)'
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

type Props = { logs: Changelog[]; totalLogs: number; currentPage: number };

const ChangeLog = React.memo(({ logs, totalLogs, currentPage }: Props) => {
    const router = useRouter();

    const paginate = (number: number) => router.push(`/changelog/${number}`);

    return (
        <SeoPage
            title='Changelog'
            description='Read about the newest updates and improvments to Thia'
            openGraph={{
                images: [{ url: 'https://thia.tech/api/og/image?name=Thia&stage=changelog' }],
            }}
        >
            <ContentContainer mt={{ base: 5, md: 24 }}>
                <HStack>
                    <Box w={{ base: 0, md: '25%' }} mr={{ base: 0, md: '24px' }} flexShrink={0} />
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
                    <Pagination currentPage={currentPage} itemsPerPage={logsPerPage} totalItems={totalLogs} paginate={paginate} />;
                </VStack>
            </ContentContainer>
        </SeoPage>
    );
});

export const getServerSideProps = async ({ params }: any) => {
    const currentPage = Number(params.page ?? 1);
    const logs = allChangelogs.sort((a: Changelog, b: Changelog) => +new Date(b.createdAt) - +new Date(a.createdAt));
    const totalLogs = logs.length;

    if (isNaN(currentPage)) return { notFound: true };
    if (currentPage < 1 || currentPage > Math.ceil(totalLogs / logsPerPage)) return { notFound: true };

    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

    return { props: { logs: currentLogs, totalLogs, currentPage: currentPage } };
};

ChangeLog.displayName = 'ChangeLog';
export default ChangeLog;
