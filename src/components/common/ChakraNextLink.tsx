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
    isExternal?: boolean;
}

// Next link with chakraUI link style
export const ChakraNextLink = ({ href, children, linkProps, isExternal, styleProps }: props) => {
    return (
        <NextLink href={href} {...linkProps} passHref>
            <Link isExternal={isExternal} {...styleProps}>
                {children}
            </Link>
        </NextLink>
    );
};
