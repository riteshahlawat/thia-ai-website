import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

const Documentation: NextPage = () => {
	return (
		<div className={styles.container}>
			<div className={styles.main}>
				<Link href='/docs/getstarted'>
					<a>/docs/getstarted</a>
				</Link>{' '}
				<Link href='/docs/setup'>
					<a>/docs/setup</a>
				</Link>
			</div>
		</div>
	);
};

export default Documentation;
