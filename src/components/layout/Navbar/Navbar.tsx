import React, { useState } from 'react';
import { NavContainer } from './NavContainer';
import { NavToggle } from './NavToggle';
import { NavLinks, SignInSignOut } from './NavLinks';
import { Box, HStack } from '@chakra-ui/react';
import Logo from '@/components/common/Logo';

export const Navinderbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(isOpen => !isOpen);

    return (
        <Box bg='black'>
            <NavContainer>
                <Box flexShrink={0}>
                    <Logo w='100px' />
                </Box>
                <NavLinks isOpen={isOpen} toggle={toggle} />
                <HStack>
                    <SignInSignOut />
                    <NavToggle toggle={toggle} isOpen={isOpen} />
                </HStack>
            </NavContainer>
        </Box>
    );
};
