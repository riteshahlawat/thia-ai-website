import React from 'react';
import { Box, Flex, IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { MdOutlineLink } from 'react-icons/md';

type Heading = {
    heading: { as: any; iconSize: string };
    children: any;
};

const Heading = ({ heading, children }: Heading) => {
    const copyToClipboard = (e: any) => {
        navigator.clipboard.writeText(
            `${e.view.location.origin}${e.view.location.pathname}${children[0].props.href}`
        );
    };

    return (
        <Flex className='heading' align='center'>
            <Box as={heading.as} id={children[0].props.href.slice(1)}>
                {children}
            </Box>
            <Tooltip
                label={`Copy link to this section: ${children[1]}`}
                aria-label='tooltip'
                placement='top'
            >
                <IconButton
                    p={0}
                    my={0}
                    mx={2}
                    opacity={0}
                    fontSize={heading.iconSize}
                    bg='transparent'
                    aria-label='copy'
                    icon={<MdOutlineLink />}
                    justifyContent='start'
                    onClick={copyToClipboard}
                    color={useColorModeValue('thia.gray.700', 'thia.gray.700')}
                    _hover={{
                        color: useColorModeValue('thia.purple.300', 'thia.purple.400'),
                        bg: 'transparent',
                    }}
                    _active={{ bg: 'transparent' }}
                    sx={{
                        '.heading:hover &': {
                            opacity: 1,
                        },
                    }}
                />
            </Tooltip>
        </Flex>
    );
};

const headings = {
    h1: { as: 'h1', iconSize: '2em' },
    h2: { as: 'h2', iconSize: '1.5em' },
    h3: { as: 'h3', iconSize: '1.17em' },
    h4: { as: 'h4', iconSize: '1em' },
    h5: { as: 'h5', iconSize: '0.83em' },
    h6: { as: 'h6', iconSize: '0.67em' },
};

export const Headings = {
    h1: ({ children }: { children: any }) => <Heading heading={headings.h1}>{children}</Heading>,
    h2: ({ children }: { children: any }) => <Heading heading={headings.h2}>{children}</Heading>,
    h3: ({ children }: { children: any }) => <Heading heading={headings.h3}>{children}</Heading>,
    h4: ({ children }: { children: any }) => <Heading heading={headings.h4}>{children}</Heading>,
    h5: ({ children }: { children: any }) => <Heading heading={headings.h5}>{children}</Heading>,
    h6: ({ children }: { children: any }) => <Heading heading={headings.h6}>{children}</Heading>,
};
