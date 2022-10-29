import React from 'react';
import { NextSeo, NextSeoProps } from 'next-seo';

export const BaseSeo = ({ title, description, openGraph, ...rest }: NextSeoProps) => {
    const imageURL = `https://thia.tech/api/og/image?title=${title}${description ? `&subtitle=${description}`: ''}`;
    const ogImage = { url: imageURL, width: 1200, height: 630, alt: title };

    const currentOGImage = openGraph?.images;
    const newOGImage = currentOGImage ? currentOGImage : [ogImage];
    return <NextSeo title={title} description={description} openGraph={{ ...openGraph, images: newOGImage }} {...rest} />;
};
