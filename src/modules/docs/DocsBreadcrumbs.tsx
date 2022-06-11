import React from 'react';
import { useRouter } from 'next/router';
import { MdChevronRight } from 'react-icons/md';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Container,
    Heading,
    useColorModeValue,
} from '@chakra-ui/react';

type Props = {};

export const DocsBreadcrumbs = (props: Props) => {
    const router = useRouter();

    return (
        <Box
            p={5}
            w='full'
            pos='sticky'
            top='var(--header-height)'
            bg={useColorModeValue('thia.gray.100', 'thia.gray.950')}
        >
            <Container maxW='container.md'>
                <Breadcrumb separator={<MdChevronRight />}>
                    {router.asPath
                        .split('/')
                        .slice(1)
                        .map((crumb, i) => (
                            <BreadcrumbItem key={i}>
                                <BreadcrumbLink href={''}>{crumb}</BreadcrumbLink>
                            </BreadcrumbItem>
                        ))}
                </Breadcrumb>
            </Container>
        </Box>
    );
};

{
    /* <Heading fontSize='normal' fontWeight='normal'>
                    hello
                </Heading> */
}
