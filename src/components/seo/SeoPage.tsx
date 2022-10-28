import { BaseSeo } from '@/components/seo/BaseSeo';
import { NextSeoProps } from 'next-seo';
import React, { PropsWithChildren } from 'react';

export const SeoPage = ({ title, description, children, ...rest }: PropsWithChildren<NextSeoProps>) => {
    return (
        <>
            <BaseSeo title={title} description={description} {...rest} />
            {children}
        </>
    );
};
