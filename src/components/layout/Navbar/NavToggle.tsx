import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { FaTimes, FaBars } from 'react-icons/fa';

export const NavToggle = ({ toggle, isOpen }: { toggle: () => void; isOpen: boolean }) => {
    return (
        <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
            <IconButton
                size='md'
                fontSize='lg'
                aria-label={`${isOpen ? 'Open' : ' Close'} Menu`}
                variant='ghost'
                color='current'
                ml={{ base: '0', md: '3' }}
                icon={isOpen ? <FaTimes /> : <FaBars />}
                borderRadius={100}
                _focus={{ boxShadow: 'none' }}
            />
        </Box>
    );
};
