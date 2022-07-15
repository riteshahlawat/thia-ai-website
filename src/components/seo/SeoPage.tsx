import { BaseSeo } from '@/components/seo/BaseSeo';
import React from 'react';

type Props = {
    title: string;
    description: string;
    children?: React.ReactNode;
    [rest: string]: any;
};

export const SeoPage = ({ title, description, children, ...rest }: Props) => {
    return (
        <>
            <BaseSeo title={title} description={description} {...rest} />
            {children}
        </>
    );
};
