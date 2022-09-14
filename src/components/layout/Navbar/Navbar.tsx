import React, { useState } from 'react';
import Link from 'next/link';
import { NavContainer } from './NavContainer';
import { NavToggle } from './NavToggle';
import { NavLinks, SignInSignOut } from './NavLinks';
import Logo from '@/components/common/Logo';
import { Box } from '@chakra-ui/react';

export const Navinderbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(isOpen => !isOpen);

    return (
        <Box bg='black'>
            <NavContainer>
                <Box flexShrink={0}>
                    <Logo w='100px' />
                </Box>
                <NavLinks isOpen={isOpen} />
                <SignInSignOut />
                <NavToggle toggle={toggle} isOpen={isOpen} />
            </NavContainer>
        </Box>
    );
};

// search bar
{
    /*
  <InputGroup>
    <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
    <Input variant='filled' placeholder='Search the docs' />
  </InputGroup>
*/
}
{
    /* <NavLinks isOpen={isOpen} />
<SignInSignOut />
<NavToggle toggle={toggle} isOpen={isOpen} /> */
}
