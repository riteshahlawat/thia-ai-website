import { Box, Button, ButtonGroup, Text, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Link from 'next/link';
import ContentContainer from '../src/layout/ContentContainer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Thia</title>
        <meta name='description' content='Thia on web' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box as='main' w='full'>
        <Box as='section'>
          <ContentContainer>
            <VStack spacing={10} py={10} px={{ base: 0, xl: 56 }}>
              <Box as='h1' fontWeight='light' textAlign='center'>
                <Text fontSize={{ base: '4xl', md: '7xl' }} lineHeight='shorter'>
                  Decentralized alternative to cloud AutoML run within your ecosystem
                </Text>
              </Box>
              <ButtonGroup spacing={8}>
                <Link href='/pricing'>
                  <Button variant='secondary'>View Package Plans</Button>
                </Link>
                <Link href='/download'>
                  <Button variant='primary'>Download</Button>
                </Link>
              </ButtonGroup>
            </VStack>
          </ContentContainer>
        </Box>
        <Box as='section' w='100%' m='auto' pos='relative'>
          <ContentContainer>
            <Box pos='relative' px={{ base: 0, xl: 20 }} py={{ base: 5, md: 20 }}>
              <Box w='full' rounded='xl' overflow='hidden'>
                <Box
                  transform='translate(50%,50%)'
                  position='absolute'
                  top='0'
                  left='0'
                  bg='white'
                  w='50%'
                  h='50%'
                  filter='blur(120px)'
                  backgroundImage='linear-gradient(90deg, rgba(71,0,255,1) 0%, rgba(119,66,255,1) 100%)'
                />
                <Box display='block'>
                  <Image
                    src='/thia.svg'
                    width={1197}
                    height={614}
                    layout='responsive'
                    objectPosition='top'
                    objectFit='contain'
                  />
                </Box>
              </Box>
            </Box>
          </ContentContainer>
        </Box>
      </Box>
    </>
  );
};

export default Home;
