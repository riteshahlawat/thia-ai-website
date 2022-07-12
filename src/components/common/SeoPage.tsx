import { BaseSeo } from '@/seo/BaseSeo';
import React from 'react';

type Props = {
    title: string;
    description: string;
    children?: React.ReactNode;
};

export const SeoPage = ({ title, description, children }: Props) => {
    return (
        <>
            <BaseSeo title={title} description={description} />
            {children}
        </>
    );
};
