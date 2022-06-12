import React from 'react';
import { MdChevronRight } from 'react-icons/md';
import { Box, Breadcrumb, BreadcrumbItem, useColorModeValue } from '@chakra-ui/react';
import { BreadcrumbType } from 'src/types/Breadcrumbs';
import Link from 'next/link';

export const DocsBreadcrumbs = ({ path, title }: BreadcrumbType) => {
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
            p={5}
            pl={0}
            pb={3}
            w='full'
            pos='sticky'
            fontSize='sm'
            roundedTop='md'
            top='var(--header-height)'
            color={useColorModeValue('thia.gray.700', 'thia.gray.400')}
            bg={useColorModeValue('thia.gray.50', 'thia.gray.990')}
            textTransform='capitalize'
        >
            <Breadcrumb separator={<MdChevronRight />}>
                {breadcrumbs.map(({ name, path }, i) => (
                    <BreadcrumbItem key={i}>
                        <Link href={path}>{name}</Link>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </Box>
    );
};
