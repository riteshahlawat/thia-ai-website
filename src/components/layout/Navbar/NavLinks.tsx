import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth, useUser } from 'reactfire';
import { links } from '@/constants/links';
import { MdArrowDropDown } from 'react-icons/md';
import { ToggleColorMode } from '../ToggleColorMode';
import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Avatar,
    Flex,
    MenuDivider,
    useColorModeValue,
    useBreakpointValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const navItemLinks = [links.docs, links.pricing, links.download, links.changelog, links.support];

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
                        size={{ base: 'sm', md: 'md' }}
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
                        size={{ base: 'sm', md: 'md' }}
                        fontSize='sm'
                        variant='primary'
                        borderRadius={100}
                        _focus={{ boxShadow: 'none' }}
                        _active={{ bg: 'brand.primary.dark' }}
                    >
                        Sign up
                    </Button>
                </Link>
            </>
        );
    }
};

export const NavLinks = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => {
    const router = useRouter();
    const buttonBG = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
    const buttonTextColor = useColorModeValue('thia.gray.700', 'thia.gray.400');
    const buttonActiveTextColor = useColorModeValue('black', 'white');
    const isMobile = useBreakpointValue({ base: true, md: false });

    const menuVariant = {
        opened: {
            opacity: 1,
            transition: {
                duration: 0.63,
                ease: [0.74, 0, 0.19, 1.02],
            },
        },
        closed: {
            opacity: 0,
            transition: {
                duration: 0.63,
                ease: [0.74, 0, 0.19, 1.02],
            },
        },
        notMobile: { opacity: 1 },
    };

    const list = {
        opened: {
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1,
            },
        },
        closed: {
            transition: {
                staggerChildren: 0.06,
                staggerDirection: -1,
            },
        },
    };

    const listItem = {
        opened: {
            opacity: 1,
            y: '0%',
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
        closed: {
            opacity: 0,
            y: '20%',
            transition: {
                duration: 0.25,
                ease: 'easeInOut',
            },
        },
        notMobile: { y: '0%', opacity: 1 },
    };

    return (
        <motion.div initial='closed' animate={isMobile ? (isOpen ? 'opened' : 'closed') : 'notMobile'}>
            <Box
                left={0}
                right={0}
                top='var(--header-height)'
                m='0 !important'
                as={motion.div}
                variants={menuVariant}
                w={{ base: 'full', md: 'auto' }}
                h={{ base: '100vh', md: 'auto' }}
                pos={{ base: 'absolute', md: 'static' }}
                bg={{ base: useColorModeValue('thia.bg-base', 'thia.bg-dark'), md: 'transparent' }}
            >
                <Box as={motion.div} variants={list}>
                    <Stack h='full' spacing={{ base: 0, md: 3 }} align='center' direction={{ base: 'column', md: 'row' }}>
                        {Object.values(navItemLinks).map(({ path, label }) => (
                            <Box as={motion.div} variants={listItem} w='full'>
                                <Link href={path} key={label}>
                                    <Button
                                        h={{ base: 'var(--header-height)', md: 10 }}
                                        key={label}
                                        fontSize={{ base: 'md', md: 'sm' }}
                                        w={{ base: 'full', md: 'auto' }}
                                        borderRadius={{ base: 'none', md: 100 }}
                                        variant='secondaryGhost'
                                        color={{
                                            base: buttonTextColor,
                                            md: path === router.asPath ? buttonActiveTextColor : buttonTextColor,
                                        }}
                                        bg={{ base: 'inherit', md: path === router.asPath ? buttonBG : 'inherit' }}
                                        onClick={toggle}
                                    >
                                        {label}
                                    </Button>
                                </Link>
                            </Box>
                        ))}
                        <Box as={motion.div} variants={listItem}>
                            <ToggleColorMode w={{ base: '100vw', md: 'auto' }} rounded={{ base: 'none', md: 'full' }} />
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </motion.div>
    );
};
