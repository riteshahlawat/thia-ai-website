import { Box, Button, IconButton, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Link, { LinkProps } from 'next/link';
import { FaMoon, FaSun } from 'react-icons/fa';

interface NavItemsType extends LinkProps {
  label: string;
}

const navItemLinks: Array<NavItemsType> = [
  { label: 'Docs', href: '/docs' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Download', href: '/download' },
  { label: 'Support', href: '/support' },
];

const NavLinks = ({ isOpen }: { isOpen: boolean }) => {
  const { toggleColorMode: toggleMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const text = useColorModeValue('dark', 'light');
  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack spacing={8} align='center' direction={{ base: 'column', md: 'row' }}>
        {navItemLinks.map(({ label, href }) => (
          <Link href={href} key={label}>
            <Button
              size='sm'
              key={label}
              fontSize='sm'
              fontWeight='normal'
              borderRadius={100}
              variant='secondaryGhost'
            >
              {label}
            </Button>
          </Link>
        ))}
        <Link href='/signin'>
          <Button size='sm' fontSize='sm' variant='primary' rounded='full'>
            Sign in
          </Button>
        </Link>
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
      </Stack>
    </Box>
  );
};

export default NavLinks;
