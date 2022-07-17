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
    Avatar,
    Flex,
    MenuDivider,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdOutlineLightMode, MdDarkMode } from 'react-icons/md';
import { useAuth, useSigninCheck, useUser } from 'reactfire';
import { links } from '@/constants/links';
import { MdArrowDropDown } from 'react-icons/md';

const navItemLinks = [links.docs.index, links.pricing.index, links.download.index, links.support.index];

const SignInSignOut = () => {
    const { data: user } = useUser();
    const auth = useAuth();
    const router = useRouter();

    const onSignOut = async () => {
        await auth.signOut();
        router.push('/');
    };

    if (user) {
        return (
            <Menu>
                <MenuButton>
                    <Flex align='center'>
                        <Avatar size='sm' name={user.displayName ?? ''} src={user.photoURL ? user.photoURL : undefined} />
                        <MdArrowDropDown fontSize={20} />
                    </Flex>
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => router.push('/dashboard')}>Dashboard</MenuItem>
                    <MenuItem onClick={() => router.push('/settings')}>Settings</MenuItem>
                    <MenuItem onClick={() => router.push('/billing')}>Billing</MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
                </MenuList>
            </Menu>
        );
    } else {
        return (
            <>
                <Link href='/signin'>
                    <Button
                        fontSize='sm'
                        variant='secondary'
                        borderRadius={100}
                        _focus={{ boxShadow: 'none' }}
                        _active={{ bg: 'brand.primary.dark' }}
                    >
                        Sign in
                    </Button>
                </Link>
                <Link href='/signup'>
                    <Button
                        fontSize='sm'
                        variant='primary'
                        borderRadius={100}
                        _focus={{ boxShadow: 'none' }}
                        _active={{ bg: 'brand.primary.dark' }}
                    >
                        Try Thia for Free
                    </Button>
                </Link>
            </>
        );
    }
};

export const NavLinks = ({ isOpen }: { isOpen: boolean }) => {
    const { toggleColorMode: toggleMode } = useColorMode();
    const SwitchIcon = useColorModeValue(MdDarkMode, MdOutlineLightMode);
    const text = useColorModeValue('dark', 'light');

    return (
        <Box display={{ base: isOpen ? 'block' : 'none', md: 'block' }} flexBasis={{ base: '100%', md: 'auto' }}>
            <Stack spacing={5} align='center' direction={{ base: 'column', md: 'row' }}>
                {Object.values(navItemLinks).map(({ path, label }) => (
                    <Link href={path} key={label}>
                        <Button key={label} fontSize='sm' fontWeight='normal' borderRadius={100} variant='secondaryGhost'>
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
