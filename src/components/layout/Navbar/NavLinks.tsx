import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth, useUser } from 'reactfire';
import { links } from '@/constants/links';
import { MdArrowDropDown } from 'react-icons/md';
import { ToggleColorMode } from '../ToggleColorMode';
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Stack, Avatar, Flex, MenuDivider, useColorModeValue } from '@chakra-ui/react';

const navItemLinks = [links.docs.index, links.pricing.index, links.download.index, links.changelog.index, links.support.index];

export const SignInSignOut = () => {
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
                    <MenuItem onClick={() => router.push('/billing')}>Billing and Plans</MenuItem>
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
    const router = useRouter();
    const buttonBG = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
    const buttonTextColor = useColorModeValue('thia.gray.700', 'thia.gray.400');
    const buttonActiveTextColor = useColorModeValue('black', 'white');
    return (
        <Box
            top='var(--header-height)'
            w={{ base: 'full', md: 'auto' }}
            position={{ base: 'absolute', md: 'static' }}
            display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
            bg={{ base: useColorModeValue('thia.bg-base', 'thia.bg-dark'), md: 'transparent' }}
        >
            <Stack spacing={5} align='center' direction={{ base: 'column', md: 'row' }}>
                {Object.values(navItemLinks).map(({ path, label }) => (
                    <Link href={path} key={label}>
                        <Button
                            key={label}
                            fontSize='sm'
                            borderRadius={100}
                            variant='secondaryGhost'
                            color={path.pathname === router.asPath ? buttonActiveTextColor : buttonTextColor}
                            bg={path.pathname === router.asPath ? buttonBG : 'inherit'}
                        >
                            {label}
                        </Button>
                    </Link>
                ))}
                <ToggleColorMode />
            </Stack>
        </Box>
    );
};
