import Image from 'next/image';
import { Section } from '@/components/common/Section';

import type { NextPage } from 'next';
import { motion } from 'framer-motion';
import { ImageBox, ImageBoxProps } from '@/components/landing/ImageBox';
import { Box, Flex, Heading, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { ChakraNextLink } from '@/components/common/ChakraNextLink';
import { SeoPage } from '@/components/seo/SeoPage';

const variants = {
    initial: { opacity: 0, width: '40%', height: '40%' },
    animate: {
        opacity: 1,
        width: '70%',
        height: '70%',
        transition: { delay: 0.5, duration: 1.5 },
    },
};

const ImageBoxData: ImageBoxProps[] = [
    {
        label: 'Train',
        heading: `Train a computer vision model`,
        description: 'Thia makes training models a breeze! Import your dataset, train, and get real-time training feedback in the UI',
        direction: 'left',
        imageSrc: '/showcase/training_job_graph.jpg',
        learnMoreURL: 'docs/training-a-model',
    },
    {
        label: 'Evaluate',
        heading: 'Predict using your own data',
        description: `Once trained, Thia allows you to run predictions on your own data without having to export the model`,
        direction: 'right',
        imageSrc: '/showcase/model_predictions.jpg',
        learnMoreURL: 'docs/evaluating-a-model',
    },
    {
        label: 'Export',
        heading: 'Export your trained model',
        description: `Once satisfied with your trained model, Thia can export it in an optimized model format in the environment of your choice`,
        direction: 'left',
        imageSrc: '/showcase/export_model.jpg',
        learnMoreURL: 'docs/using-a-model',
    },
];

const Home: NextPage = () => {
    return (
        <SeoPage
            title=''
            description='AutoML within your Ecosystem - Train, Test, and Deploy ML Models'
            openGraph={{
                images: [
                    {
                        url: 'https://thia.tech/og-image/landing-page.jpg',
                        type: 'image/jpeg',
                        width: 1200,
                        height: 630,
                        alt: 'Thia Landing Page Image',
                    },
                ],
            }}
        >
            <Box w='full'>
                <Section>
                    <VStack spacing={12} pt={12} pb={20} px={{ base: 0, xl: 20 }}>
                        <Heading px={{ base: 0, md: 10 }} fontSize={{ base: '6xl', md: '8xl' }} lineHeight='shorter' textAlign='center'>
                            AutoML within your ecosystem
                        </Heading>
                        <Flex flexDir={{ base: 'column', md: 'row' }} gap={{ base: 6, md: 10 }} justify='center' maxW='26rem'>
                            <ChakraNextLink
                                href='/signup'
                                styleProps={{ variant: 'primaryButton', fontSize: { base: 'sm', md: 'lg' }, px: 7, h: '48px' }}
                            >
                                Try for Free
                            </ChakraNextLink>
                            <ChakraNextLink
                                href='/download'
                                styleProps={{ variant: 'primaryOutlineButton', fontSize: { base: 'sm', md: 'lg' }, px: 7, h: '48px' }}
                            >
                                Download
                            </ChakraNextLink>
                        </Flex>
                    </VStack>
                </Section>
                <Section w='100%' m='auto' pos='relative'>
                    <Box pos='relative' px={{ base: 0, xl: 20 }}>
                        <Box
                            as={motion.div}
                            top='50%'
                            left='50%'
                            bg='white'
                            pos='absolute'
                            filter='blur(120px)'
                            initial='initial'
                            animate='animate'
                            variants={variants}
                            transform='translate(-50%, -50%)'
                            backgroundImage='linear-gradient(90deg, rgba(71,0,255,1) 0%, rgba(119,66,255,1) 100%)'
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: '2%' }}
                            animate={{ opacity: 1, scale: 1, y: '0%' }}
                            transition={{ transition: 'ease', duration: 1 }}
                        >
                            <Box display='block' rounded='xl' overflow='hidden'>
                                <Image
                                    src='/showcase/dataset_page.jpg'
                                    alt='figure-1'
                                    width={1906}
                                    height={1375}
                                    layout='responsive'
                                    objectPosition='top'
                                    objectFit='contain'
                                />
                            </Box>
                        </motion.div>
                    </Box>
                </Section>
                <ImageBox {...ImageBoxData[0]} />
                <ImageBox {...ImageBoxData[1]} />
                <ImageBox {...ImageBoxData[2]} />
                <Section bg={useColorModeValue('thia.gray.100', 'whiteAlpha.50')} py={{ base: 10, md: 20 }}>
                    <Flex direction='column' align='center' gap={10} textAlign='center'>
                        <Heading fontSize='5xl'>Ready to Start?</Heading>
                        <Text fontSize='lg'>
                            Integrate Thia into your app easily with our documentation or take the tutorial to get started!
                        </Text>
                        <Flex w='full' gap={{ base: 6, md: 10 }} justify='center' maxW='26rem' flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                            <ChakraNextLink
                                href='/docs/getting-started'
                                styleProps={{ variant: 'primaryButton', fontSize: 'lg', px: 5, h: '48px' }}
                            >
                                Get Started
                            </ChakraNextLink>
                            <ChakraNextLink
                                href='/signup'
                                styleProps={{ variant: 'primaryOutlineButton', fontSize: 'lg', px: 5, h: '48px' }}
                            >
                                Sign up for free
                            </ChakraNextLink>
                        </Flex>
                    </Flex>
                </Section>
            </Box>
        </SeoPage>
    );
};

export default Home;
