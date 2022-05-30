import React from 'react';
import NextLink from 'next/link';
import type { LinkProps } from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';
import { UrlObject } from 'url';

interface props {
    href: UrlObject | string;
    children?: React.ReactNode;
    linkProps?: LinkProps;
    styleProps?: Object;
}

// Next link with chakraUI link style
export const Link = ({ href, children, linkProps, styleProps }: props) => {
    return (
        <NextLink href={href} {...linkProps} passHref>
            <ChakraLink {...styleProps}>{children}</ChakraLink>
        </NextLink>
    );
};
