import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Section from './Section';
import ImageBox from './ImageBox';
import type { NextPage } from 'next';
import { motion } from 'framer-motion';
import { Box, Button, Flex, Heading, Text, useColorModeValue, VStack } from '@chakra-ui/react';

const variants = {
  initial: { opacity: 0, width: '40%', height: '40%' },
  animate: {
    opacity: 1,
    width: '70%',
    height: '70%',
    transition: { delay: 0.5, duration: 1.5 },
  },
};

const ImageBoxData = [
  {
    label: 'Train your model',
    heading: `Train your computer vision model on Thia's engine`,
    description: 'Thia makes training models a breeze! Import your dataset, label, and click train',
    direction: 'left',
  },
  {
    label: 'Export your model',
    heading: 'Export the model in an optimized format',
    description: `Once trained, Thia can export an optimized model format that you can convert and use in any environment of your choice`,
    direction: 'right',
  },
  {
    label: 'Serve your model',
    heading: 'Skip implementation and serve directly onto a machine',
    description: `Bypass the headache of using the exported model entirely and let Thia package it all up to be served on a linux machone and generate predictions via out REST API.`,
    direction: 'left',
  },
];

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Thia</title>
        <meta name='description' content='Thia on web' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box w='full'>
        <Section>
          <VStack spacing={12} pt={12} pb={20} px={{ base: 0, xl: 20 }}>
            <Heading
              px={10}
              fontSize={{ base: '6xl', md: '8xl' }}
              lineHeight='shorter'
              textAlign='center'
            >
              AutoML ran within your ecosystem
            </Heading>

            <Flex
              w='full'
              gap={{ base: 6, md: 10 }}
              justify='center'
              maxW='26rem'
              flexWrap={{ base: 'wrap', md: 'nowrap' }}
            >
              <Link href='/pricing'>
                <Button variant='secondary' size='lg' flexBasis={{ base: '100%', md: '50%' }}>
                  View Pricing
                </Button>
              </Link>
              <Link href='/download'>
                <Button variant='primary' size='lg' flexBasis={{ base: '100%', md: '50%' }}>
                  Download
                </Button>
              </Link>
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
                  src='/thia.svg'
                  alt='figure-1'
                  width={962}
                  height={556}
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
              Integrate Thia into your app easily with our documentation or take the tutorial to get
              started!
            </Text>
            <Flex
              w='full'
              gap={{ base: 6, md: 10 }}
              justify='center'
              maxW='26rem'
              flexWrap={{ base: 'wrap', md: 'nowrap' }}
            >
              <Link href='/pricing'>
                <Button variant='primary' size='lg' flexBasis={{ base: '100%', md: '50%' }}>
                  Get Started
                </Button>
              </Link>
              <Link href='/download'>
                <Button variant='primaryOutline' size='lg' flexBasis={{ base: '100%', md: '50%' }}>
                  Sign up for free
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Section>
      </Box>
    </>
  );
};

export default Home;
