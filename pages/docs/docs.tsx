import React from 'react';
import type { NextPage } from 'next';
import { ChakraNextLink } from '../../src/modules/common/ChakraNextLink';

const Docs: NextPage = () => {
    return (
        <>
            <ChakraNextLink href='/docs/getstarted'>/docs/getstarted </ChakraNextLink>
            <ChakraNextLink href='/docs/setup'>/docs/setup</ChakraNextLink>
        </>
    );
};

export default Docs;
