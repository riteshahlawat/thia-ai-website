import React from 'react';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';
import ContentContainer from './ContentContainer';
import {
  Box,
  Flex,
  HStack,
  Button,
  IconButton,
  ButtonGroup,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';

interface NavItemsType extends LinkProps {
  label: string;
}

const navItems: Array<NavItemsType> = [
  { label: 'Docs', href: '/docs' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Download', href: '/download' },
  { label: 'Support', href: '/support' },
];

const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { toggleColorMode: toggleMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const text = useColorModeValue('dark', 'light');
  const textColorOnHover = useColorModeValue('black', 'white');
  const navItemColor = useColorModeValue('brand.color.light', 'brand.color.dark');

  return (
    <Box
      as='nav'
      position='fixed'
      w='full'
      backdropFilter='auto'
      backdropBlur='25px'
      py={{ sm: 2, md: 4 }}
    >
      <ContentContainer>
        <Flex justify='space-between' alignItems='center' gap={10}>
          <HStack spacing={8}>
            <Link href='/'>Thia</Link>
            {isDesktop && (
              <ButtonGroup spacing={3}>
                {navItems.map(({ label, href }) => (
                  <Link href={href} key={label}>
                    <a>
                      <Button
                        bg='transparent'
                        color={navItemColor}
                        display='inline-flex'
                        alignItems='center'
                        key={label}
                        borderRadius={100}
                        _focus={{ boxShadow: 'none' }}
                        _hover={{ color: textColorOnHover }}
                      >
                        {label}
                      </Button>
                    </a>
                  </Link>
                ))}
              </ButtonGroup>
            )}
          </HStack>
          {isDesktop ? (
            <HStack spacing={3}>
              <Button variant='solid' borderRadius={100} _hover={{ color: textColorOnHover }}>
                <Link href='/signin'>Sign in</Link>
              </Button>
              <IconButton
                size='md'
                fontSize='lg'
                aria-label={`Switch to ${text} mode`}
                variant='ghost'
                color='current'
                ml={{ base: '0', md: '3' }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
                borderRadius={100}
                _focus={{ boxShadow: 'none' }}
              />
            </HStack>
          ) : (
            <IconButton
              size='md'
              fontSize='lg'
              aria-label={`Switch to ${text} mode`}
              variant='ghost'
              color='current'
              ml={{ base: '0', md: '3' }}
              icon={<FaBars />}
              borderRadius={100}
              _focus={{ boxShadow: 'none' }}
            />
          )}
        </Flex>
      </ContentContainer>
    </Box>
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
