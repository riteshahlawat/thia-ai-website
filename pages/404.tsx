import React from 'react';
import type { NextPage } from 'next';
import { SeoPage } from '@/components/seo/SeoPage';

const PageNotFound: NextPage = () => {
    return <SeoPage title='Page not found'> 404</SeoPage>;
};

export default PageNotFound;
