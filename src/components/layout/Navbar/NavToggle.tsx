import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';
import { HiMenuAlt3 } from 'react-icons/hi';

export const NavToggle = ({ toggle, isOpen }: { toggle: () => void; isOpen: boolean }) => {
    return (
        <Box display={{ base: 'block', md: 'none' }} onClick={toggle} pr='12px'>
            <IconButton
                size='md'
                fontSize='2xl'
                aria-label={`${isOpen ? 'Open' : ' Close'} Menu`}
                variant='ghost'
                color='current'
                ml={{ base: '0', md: '3' }}
                icon={isOpen ? <MdClose /> : <HiMenuAlt3 />}
                borderRadius={100}
                _focus={{ boxShadow: 'none' }}
            />
        </Box>
    );
};
