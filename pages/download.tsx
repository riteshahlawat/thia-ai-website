import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { SeoPage } from '@/components/seo/SeoPage';
import { useUser } from 'reactfire';
import { ContentContainer } from '@/components/common/ContentContainer';
import { FiDownload } from 'react-icons/fi';
import { Box, Button, Flex, Heading, HStack, Text, useBreakpointValue, VStack } from '@chakra-ui/react';

const Download: NextPage = () => {
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
                            fontSize={{ base: '6xl', md: '7xl', lg: '5xl', xl: '6xl', '2xl': '7xl' }}
                            noOfLines={{ base: 4, md: 3 }}
                            fontFamily='Krona One, sans-serif'
                        >
                            GET THIA FOR WINDOWS
                        </Heading>
                        <Text fontSize={{ base: 'xl', lg: 'lg', xl: 'xl' }}>
                            Start training, testing, and deploying models using your hardware
                        </Text>
                        <Button
                            variant='primary'
                            size={{ base: 'xl', lg: 'lg' }}
                            leftIcon={<FiDownload />}
                            iconSpacing='3'
                            w={{ base: 'full', lg: 'fit-content' }}
                        >
                            Download Thia
                        </Button>
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
