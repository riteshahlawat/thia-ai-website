import React, { useState } from 'react';
import Link from 'next/link';
import { NavContainer } from './NavContainer';
import { NavToggle } from './NavToggle';
import { NavLinks } from './NavLinks';
import Logo from '@/components/common/Logo';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(isOpen => !isOpen);

    return (
        <NavContainer>
            <Logo w='120px' />
            <NavToggle toggle={toggle} isOpen={isOpen} />
            <NavLinks isOpen={isOpen} />
        </NavContainer>
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
