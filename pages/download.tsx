import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { SeoPage } from '@/components/seo/SeoPage';
import { useUser } from 'reactfire';
import { ContentContainer } from '@/components/common/ContentContainer';
import { FiDownload } from 'react-icons/fi';
import { Box, Button, Flex, Heading, HStack, Text, useBreakpointValue, useToast, VStack } from '@chakra-ui/react';
import { GetDownloadMetadataResponse } from 'backend-requests/requests/get/getDownloadMetadata';
import { BackendRequestHandler } from 'backend-requests/backendRequestHandler';

const Download: NextPage = () => {
    const toast = useToast();

    const [metadataDownloading, setMetadataDownloading] = useState(true);
    const [metadata, setMetadata] = useState<GetDownloadMetadataResponse>();

    const fetchMetadata = async () => {
        const [isError, data] = await BackendRequestHandler.getInstance().getDownloadMetadata();
        if (isError) {
            toast({
                title: 'Error',
                description: data.message,
                status: 'error',
                duration: 2500,
                isClosable: false,
            });
            setMetadataDownloading(false);
            return;
        }
        setMetadata(data);
        setMetadataDownloading(false);
    };
    useEffect(() => {
        fetchMetadata();
    }, []);

    const fixedEncodeURIComponent = (str: string) => {
        return encodeURIComponent(str).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
    };

    const download = () => {
        if (metadata) {
            const downloadURL = `${process.env.NEXT_PUBLIC_APP_DOWNLOAD_BASE_URL}/${fixedEncodeURIComponent(metadata.url)}`;
            window.open(downloadURL, '_blank')?.focus();
        }
    };

    const renderReleaseDate = () => {
        if (metadata) {
            return (
                <Text fontSize={{ base: 'sm', lg: 'xs' }} mt='2' alignSelf={{ base: 'center', lg: 'auto' }}>
                    Version {metadata.version} released on{' '}
                    {new Date(metadata.releaseDate ?? '').toLocaleDateString(undefined, {
                        dateStyle: 'long',
                    })}
                </Text>
            );
        }
    };
    return (
        <SeoPage title='Download' description='Download Thia today!'>
            <ContentContainer>
                <Flex
                    h='var(--fullHeightWithoutNav)'
                    pb='var(--header-height)'
                    pt='14'
                    w='full'
                    justify='space-evenly'
                    flexDir={{ base: 'column', lg: 'row' }}
                >
                    <VStack maxW={{ base: 'full', lg: '38%' }} alignItems='flex-start' spacing='8'>
                        <Heading
                             fontSize={[64, 64, 84, 84, 84]} 
                            noOfLines={{ base: 4, md: 3 }}
                            fontWeight='bold'
                            letterSpacing='tighter'
                        >
                            Get Thia for Windows
                        </Heading>
                        <Text fontSize={{ base: 'xl', lg: 'lg', xl: 'xl' }}>
                            Start training, testing, and deploying models using your hardware
                        </Text>
                        <Flex w={{ base: 'full', lg: 'fit-content' }} flexDir='column'>
                            <Button
                                variant='primary'
                                size={{ base: 'xl', lg: 'lg' }}
                                leftIcon={<FiDownload />}
                                iconSpacing='3'
                                w='full'
                                onClick={download}
                                isLoading={metadataDownloading}
                            >
                                Download Thia
                            </Button>
                            {renderReleaseDate()}
                        </Flex>
                    </VStack>
                    <Box display='block' w={{ base: 'full', lg: '58%' }} maxH='60%' mt={{ base: '6', lg: '0' }}>
                        <Image
                            style={{ padding: '5px' }}
                            src='/showcase/training_job_graph.jpg'
                            width='100%'
                            height='100%'
                            layout='responsive'
                            objectPosition='top'
                            objectFit='contain'
                        />
                    </Box>
                </Flex>
            </ContentContainer>
        </SeoPage>
    );
};

export default Download;
