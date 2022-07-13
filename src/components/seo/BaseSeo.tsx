import React from 'react';
import { NextSeo } from 'next-seo';

type Props = { title: string; description?: string };

export const BaseSeo = ({ title, description, ...rest }: Props) => {
    return <NextSeo title={title} description={description} {...rest} />;
};
