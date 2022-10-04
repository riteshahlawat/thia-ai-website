import { Link } from '@chakra-ui/react';

export const SkipNavigation = () => {
    return (
        <Link
            href='#main-content'
            variant='primaryButton'
            pos='absolute'
            zIndex={1001}
            top='10px'
            left='10px'
            rounded='lg'
            transform='translateY(-150%)'
            transition='transform 300ms ease'
            _focus={{ transform: 'translateY(0%)' }}
        >
            Skip navigation
        </Link>
    );
};
