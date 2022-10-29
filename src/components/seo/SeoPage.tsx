import { BaseSeo } from '@/components/seo/BaseSeo';
import { NextSeoProps } from 'next-seo';
import React, { PropsWithChildren } from 'react';

interface Props extends NextSeoProps {
    title: string;
    description?: string;
}

export const SeoPage = ({ title, description, children, ...rest }: PropsWithChildren<Props>) => {
    return (
        <>
            <BaseSeo title={title} description={description} {...rest} />
            {children}
        </>
    );
};
