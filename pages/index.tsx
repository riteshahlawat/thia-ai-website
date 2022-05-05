import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
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
				<Link href='/docs'>
					<a>/docs</a>
				</Link>
				<Link href='/download'>
					<a>/download</a>
				</Link>
				<Link href='/pricing'>
					<a>/pricing</a>
				</Link>
				<Link href='/about'>
					<a>/about</a>
				</Link>
				<Link href='/support'>
					<a>/support</a>
				</Link>
				<Link href='/404'>
					<a>/404</a>
				</Link>
			</main>

			<footer className={styles.footer}></footer>
		</div>
	);
};

export default Home;
