import type { NextPage } from 'next';
import Head from 'next/head';
import Link from '../src/common/Link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Thia</title>
        <meta name='description' content='Thia on web' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        Thia
        <Link href='/docs'>/docs</Link>
        <Link href='/download'>/download</Link>
        <Link href='/pricing'>/pricing</Link>
        <Link href='/signin'>/signin</Link>
        <Link href='/signup'>/signup</Link>
        <Link href='/profile'>/profile</Link>
        <Link href='/about'>/about</Link>
        <Link href='/support'>/support</Link>
        <Link href='/404'>/404</Link>
      </main>
    </div>
  );
};

export default Home;
