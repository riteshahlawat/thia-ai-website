import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    useColorMode,
    useColorModeValue,
    Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdOutlineLightMode, MdDarkMode } from 'react-icons/md';
import { useAuth, useSigninCheck, useUser } from 'reactfire';
<<<<<<<< HEAD:src/modules/navbar/NavLinks.tsx
import { links } from '../../constants/links';
========
import { links } from '@/constants/links';
>>>>>>>> main:src/components/layout/Navbar/NavLinks.tsx

const navItemLinks = [
    links.docs.index,
    links.pricing.index,
    links.download.index,
    links.support.index,
];

const SignInSignOut = () => {
    const { status, data: signInCheckResult } = useSigninCheck();
    const { data: user } = useUser();
    const auth = useAuth();
    const router = useRouter();

    if (status === 'loading') {
        return <Box />;
    }
    if (signInCheckResult.signedIn === true) {
        return (
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant='primary'>
                    <Box maxW='150px'>
                        <Text isTruncated>{user?.displayName}</Text>
                    </Box>
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => router.push('/dashboard')}>Dashboard</MenuItem>
                    <MenuItem
                        onClick={async () => {
                            await auth.signOut();
                            router.push('/');
                        }}
                    >
                        Sign Out
                    </MenuItem>
                </MenuList>
            </Menu>
        );
    } else {
        return (
            <Link href='/signin'>
                <Button
                    fontSize='sm'
                    variant='primary'
                    borderRadius={100}
                    _focus={{ boxShadow: 'none' }}
                    _active={{ bg: 'brand.primary.dark' }}
                >
                    Sign in
                </Button>
            </Link>
        );
    }
};

export const NavLinks = ({ isOpen }: { isOpen: boolean }) => {
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
                <SignInSignOut />
            </Stack>
        </Box>
    );
};
