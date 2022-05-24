import React, { useState } from 'react';
import Link from 'next/link';
import { NavLinks } from './NavLinks';
import { NavToggle } from './NavToggle';
import { NavContainer } from './NavContainer';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(isOpen => !isOpen);

  return (
    <NavContainer>
      <Link href='/'>Thia</Link>
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
