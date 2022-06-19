import React from 'react';
import { MdChevronRight } from 'react-icons/md';
import { ChakraNextLink } from '../common/ChakraNextLink';
import { BreadcrumbType } from 'src/types/DocsTypes';
import { Box, Breadcrumb, BreadcrumbItem, Text, useColorModeValue } from '@chakra-ui/react';

export const DocsBreadcrumbs = ({ path }: BreadcrumbType) => {
    const breadcrumbPath = path.split('/');

    const crumbs = breadcrumbPath[0]
        ? breadcrumbPath.map((crumb, i) => {
              const path = breadcrumbPath.slice(0, i + 1).join('/');
              return { name: crumb.replaceAll('-', ' '), path };
          })
        : [];

    const breadcrumbs = [{ name: 'Thia Documentation', path: '/docs' }, ...crumbs];

    return (
        <Box
            pt={7}
            pb={3}
            w='full'
            fontSize='sm'
            roundedTop='md'
            color={useColorModeValue('thia.gray.700', 'thia.gray.400')}
            bg={{
                base: 'transparent',
                md: useColorModeValue('thia.gray.100', 'thia.gray.950'),
            }}
            textTransform='capitalize'
        >
            <Breadcrumb separator={<MdChevronRight />}>
                {breadcrumbs.map(({ name, path }, i) => (
                    <BreadcrumbItem key={i}>
                        {i + 1 < breadcrumbs.length ? (
                            <ChakraNextLink href={path}>{name}</ChakraNextLink>
                        ) : (
                            <Text>{name}</Text>
                        )}
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </Box>
    );
};
