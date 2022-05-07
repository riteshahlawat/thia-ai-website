import type { NextPage } from 'next';
import Head from 'next/head';
import Link from '../src/common/Link';
import PageLayout from '../src/layout/PageLayout';
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
        <PageLayout>Home</PageLayout>
      </main>
    </div>
  );
};

export { getServerSideProps } from '../src/Chakra';
export default Home;
