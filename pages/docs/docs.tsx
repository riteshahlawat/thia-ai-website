import React from 'react';
import type { NextPage } from 'next';
import { Link } from '../../src/modules/common/Link';

const Docs: NextPage = () => {
  return (
    <>
      <Link href='/docs/getstarted'>/docs/getstarted</Link>
      <Link href='/docs/setup'>/docs/setup</Link>
    </>
  );
};

export default Docs;
