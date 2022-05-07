import React from 'react';
import NextLink from 'next/link';
import type { LinkProps } from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

interface props extends LinkProps {
	children?: React.ReactNode;
}

// Next link with chakraUI link style
const Link = ({ href, children, ...rest }: props) => {
	return (
		<NextLink href={href} {...rest} passHref>
			<ChakraLink>{children}</ChakraLink>
		</NextLink>
	);
};

export default Link;
