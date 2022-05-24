import { Box, Button, IconButton, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { MdOutlineLightMode, MdDarkMode } from 'react-icons/md';
import { links } from '../../constants/links';

const navItemLinks = [
  links.docs.index,
  links.pricing.index,
  links.download.index,
  links.support.index,
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
        {Object.values(navItemLinks).map(({ path, label }) => (
          <Link href={path} key={label}>
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
