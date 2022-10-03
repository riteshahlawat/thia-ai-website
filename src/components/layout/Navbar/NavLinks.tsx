import { useRouter } from 'next/router';
import { useAuth, useUser } from 'reactfire';
import { links } from '@/constants/links';
import { MdArrowDropDown } from 'react-icons/md';
import { ToggleColorMode } from '../ToggleColorMode';
import {
    Box,
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
import { ChakraNextLink } from '@/components/common/ChakraNextLink';

const navItemLinks = [links.docs, links.download, links.pricing, links.blog, links.changelog];

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
                <ChakraNextLink href='/signin' styleProps={{ variant: 'secondaryButton', fontSize: 'sm', h: { base: '30px', md: '40px' } }}>
                    Sign in
                </ChakraNextLink>
                <ChakraNextLink href='/signup' styleProps={{ variant: 'primaryButton', fontSize: 'sm', h: { base: '30px', md: '40px' } }}>
                    Try for Free
                </ChakraNextLink>
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
            display: 'block',
            transition: {
                duration: 0.7,
                ease: 'easeIn',
            },
        },
        closed: {
            opacity: 0,
            transition: {
                duration: 0.7,
                ease: 'easeOut',
                delay: 0.5,
            },
            transitionEnd: {
                display: 'none',
            },
        },
        notMobile: { display: 'block', opacity: 1 },
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
                            <Box as={motion.div} variants={listItem} key={label} w='full'>
                                <ChakraNextLink
                                    key={label}
                                    href={path}
                                    styleProps={{
                                        variant: 'secondaryGhostButton',
                                        fontSize: { base: 'md', md: 'sm' },
                                        h: { base: 'var(--header-height)', md: 10 },
                                        w: { base: 'full', md: 'auto' },
                                        justifyContent: 'center',
                                        borderRadius: { base: 'none', md: 100 },
                                        color: {
                                            base: buttonTextColor,
                                            md: path === router.asPath ? buttonActiveTextColor : buttonTextColor,
                                        },
                                        bg: { base: 'inherit', md: path === router.asPath ? buttonBG : 'inherit' },
                                    }}
                                >
                                    {label}
                                </ChakraNextLink>
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
