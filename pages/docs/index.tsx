import React from 'react';
import type { NextPage } from 'next';
import Link from '../../components/Link';
import styles from '../../styles/Home.module.css';

const Documentation: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Link href='/docs/getstarted'>/docs/getstarted</Link>
        <Link href='/docs/setup'>/docs/setup</Link>
      </div>
    </div>
  );
};

export default Documentation;
