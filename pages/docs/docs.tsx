import React from 'react';
import type { NextPage } from 'next';
import { ChakraNextLink } from '../../src/modules/common/ChakraNextLink';

const Docs: NextPage = () => {
    return (
        <>
            <ChakraNextLink href='/docs/rich'>/docs/rich</ChakraNextLink>
        </>
    );
};

export default Docs;
