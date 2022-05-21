import { Box, Button, IconButton, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Link, { LinkProps } from 'next/link';
import { MdOutlineLightMode, MdDarkMode } from 'react-icons/md';

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
  const SwitchIcon = useColorModeValue(MdDarkMode, MdOutlineLightMode);
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
        <IconButton
          size='md'
          fontSize='xl'
          color='current'
          variant='secondary'
          onClick={toggleMode}
          icon={<SwitchIcon />}
          ml={{ base: '0', md: '3' }}
          aria-label={`Switch to ${text} mode`}
          _hover={{ bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200') }}
        />
        <Link href='/signin'>
          <Button
            fontSize='sm'
            variant='primary'
            rounded='full'
            _hover={{ bg: useColorModeValue('thia.purple.100', 'thia.purple.600') }}
          >
            Sign in
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default NavLinks;
