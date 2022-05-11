import React, { useState } from 'react';
import Link from 'next/link';
import NavToggle from './NavToggle';
import NavLinks from './NavLinks';
import NavContainer from './NavContainer';

const Navbar = () => {
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

export default Navbar;

// search bar
{
  /*
  <InputGroup>
    <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
    <Input variant='filled' placeholder='Search the docs' />
  </InputGroup>
*/
}
