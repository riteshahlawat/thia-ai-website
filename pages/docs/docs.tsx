import React, { ReactElement } from 'react';
import { DocsLayout } from 'src/layouts/DocsLayout';
import { NextPageWithLayout } from 'src/types/NextPageWithLayout';

const Docs: NextPageWithLayout = props => {
    return <></>;
};

Docs.getLayout = function getLayout(page: ReactElement) {
    return <DocsLayout>{page}</DocsLayout>;
};

export default Docs;
