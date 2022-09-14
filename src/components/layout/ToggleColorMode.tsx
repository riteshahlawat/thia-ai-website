import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';

export const ToggleColorMode = (props: { [key: string]: any }) => {
    const { toggleColorMode: toggleMode } = useColorMode();
    const SwitchIcon = useColorModeValue(MdDarkMode, MdOutlineLightMode);
    const text = useColorModeValue('dark', 'light');

    return (
        <IconButton
            {...props}
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
    );
};
