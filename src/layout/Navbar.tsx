import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { SearchIcon } from '@chakra-ui/icons';
import type { LinkProps } from 'next/link';
import { FaMoon, FaSun } from 'react-icons/fa';
import ContentContainer from './ContentContainer';

interface NavItemsType extends LinkProps {
  label: string;
}

const navItems: Array<NavItemsType> = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Download', href: '/download' },
  { label: 'Docs', href: '/docs' },
  { label: 'Support', href: '/support' },
];

const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { toggleColorMode: toggleMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const text = useColorModeValue('dark', 'light');

  return (
    <Box as='nav' position='fixed' w='full'>
      <ContentContainer>
        <Flex justify='space-between' flex='1' gap={5}>
          <HStack spacing={8}>
            <Link href='/'>Thia</Link>
            <ButtonGroup spacing='1'>
              {navItems.map(({ label, href }) => (
                <Link href={href} key={label}>
                  <Button
                    color='gray.500'
                    bg={'gray.800'}
                    display='inline-flex'
                    alignItems='center'
                    key={label}
                    _focus={{ boxShadow: 'none' }}
                    _hover={{ color: 'white' }}
                  >
                    {label}
                  </Button>
                </Link>
              ))}
            </ButtonGroup>
          </HStack>
          <InputGroup mx={8}>
            <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
            <Input variant='filled' placeholder='Search the docs' />
          </InputGroup>
          <HStack spacing='3'>
            <Button variant='ghost'>Sign in</Button>
            <Button variant='primary'>Sign up</Button>
            <IconButton
              size='md'
              fontSize='lg'
              aria-label={`Switch to ${text} mode`}
              variant='ghost'
              color='current'
              ml={{ base: '0', md: '3' }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
          </HStack>
        </Flex>
      </ContentContainer>
    </Box>
  );
};

export default Navbar;
{
  /*  */
}
