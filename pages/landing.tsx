import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Thia</title>
        <meta name='description' content='Thia on web' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Box h='100vh'>home</Box>
      </main>
    </div>
  );
};

export default Home;