import { Box, Button, Flex, HStack, Link, List, ListItem, Square, Text, useColorModeValue } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

type Pagination = {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    paginate: (arg0: number) => void;
};

export const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }: Pagination) => {
    const pageNumbers: number[] = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const linkHoverColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');
    const linkActiveColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');

    return (
        <>
            <HStack>
                <Button variant='secondaryGhost' onClick={() => paginate(currentPage - 1)} isDisabled={currentPage <= 1}>
                    <Flex align='center' gap={1}>
                        <MdChevronLeft fontSize='22px' />
                        <Text fontWeight='medium'>Prev</Text>
                    </Flex>
                </Button>
                <Box as='nav'>
                    <List>
                        {pageNumbers.map((page, i) => (
                            <ListItem key={page} display='inline-block'>
                                <Link onClick={() => paginate(page)}>
                                    <Square
                                        px={5}
                                        py={3}
                                        mx={2}
                                        rounded='xl'
                                        transitionDuration='300ms'
                                        _hover={{ bg: linkHoverColor }}
                                        _active={{ bg: linkActiveColor }}
                                        fontWeight={currentPage === i + 1 ? 'bold' : 'normal'}
                                        bg={currentPage === i + 1 ? linkHoverColor : 'transparent'}
                                    >
                                        {page}
                                    </Square>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Button variant='secondaryGhost' onClick={() => paginate(currentPage + 1)} isDisabled={currentPage >= pageNumbers.length}>
                    <Flex align='center'>
                        <Text fontWeight='medium'>Next</Text>
                        <MdChevronRight fontSize='22px' />
                    </Flex>
                </Button>
            </HStack>
        </>
    );
};
