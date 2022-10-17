import React, { useState, useEffect } from 'react';
import Logo from '@/components/common/Logo';
import { NavContainer } from './NavContainer';
import { NavToggle } from './NavToggle';
import { NavLinks, SignInSignOut } from './NavLinks';
import { Box, HStack, useBreakpointValue } from '@chakra-ui/react';
import { SkipNavigation } from '../SkipNavigation';

export const Navinderbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (isMobile) document.body.classList.toggle('disable-scroll', isOpen);
        return () => document.body.classList.remove('disable-scroll');
    }, [isOpen, isMobile]);

    return (
        <Box as='header' bg='black'>
            <SkipNavigation />
            <NavContainer>
                <Box flexShrink={0}>
                    <Logo w='90px' />
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
