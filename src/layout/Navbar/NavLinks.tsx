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
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useAuth, useSigninCheck, useUser } from 'reactfire';

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
    const { status, data: signInCheckResult } = useSigninCheck();
    const { data: user } = useUser();
    const auth = useAuth();
    const router = useRouter();
    const SignInSignOut = () => {
        if (status === "loading") {
            return (
                <Box />
            )
        } 
        if (signInCheckResult.signedIn === true) {
            return (
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon /> }>
                        <Box maxW='150px'>
                            <Text isTruncated>
                                {user?.displayName}
                            </Text>
                        </Box>
                    </MenuButton>
                    <MenuList>
                        <MenuItem
                            onClick={() => router.push('/dashboard')}
                        >
                            Dashboard
                        </MenuItem>
                        <MenuItem
                            onClick={async () => {
                                await auth.signOut();
                                router.push('/')
                            }}
                        >
                        Signout</MenuItem>
                    </MenuList>
                </Menu>
            )
        } else {
            return (
                <Link href='/login'>
                    <Button
                    fontSize='sm'
                    variant='solid'
                    borderRadius={100}
                    _focus={{ boxShadow: 'none' }}
                    _active={{ bg: 'brand.primary.dark' }}
                    _hover={{ color: useColorModeValue('black', 'white'), bg: 'whiteAlpha.300' }}
                    >
                        Sign in
                    </Button>
                </Link>
            )
        }
    }
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
                    bg='transparent'
                    borderRadius={100}
                    color={useColorModeValue('brand.color.light', 'brand.color.dark')}
                    alignItems='center'
                    display='inline-flex'
                    _focus={{ boxShadow: 'none' }}
                    _active={{ bg: 'brand.primary.dark' }}
                    _hover={{ bg: 'whiteAlpha.300' }}
                    >
                    {label}
                    </Button>
                </Link>
                ))}
                <SignInSignOut />
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
