import React from 'react';
import NextLink from 'next/link';
import type { LinkProps } from 'next/link';
import { Link } from '@chakra-ui/react';
import { UrlObject } from 'url';

interface props {
    href: UrlObject | string;
    children?: React.ReactNode;
    linkProps?: LinkProps;
    styleProps?: Object;
}

// Next link with chakraUI link style
export const ChakraNextLink = ({ href, children, linkProps, styleProps }: props) => {
    return (
        <NextLink href={href} {...linkProps} passHref>
            <Link {...styleProps}>{children}</Link>
        </NextLink>
    );
};
