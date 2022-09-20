import { AspectRatio, Box, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { ChakraNextLink } from './ChakraNextLink';

type Props = {
    w: string;
    isIcon?: boolean;
};

const Logo = ({ w, isIcon }: Props) => {
    const logoPath = useColorModeValue('/logo/thia-logo-light.svg', '/logo/thia-logo-dark.svg');
    return (
        <ChakraNextLink href='/'>
            <Box position='relative' w={w} cursor='pointer'>
                <AspectRatio ratio={isIcon ? 1 : 60 / 13}>
                    <Image
                        alt={isIcon ? 'thia-icon' : 'thia-logo'}
                        src={isIcon ? '/logo/thia-icon.svg' : logoPath}
                        layout='fill'
                        objectFit='contain'
                    />
                </AspectRatio>
            </Box>
        </ChakraNextLink>
    );
};

export default Logo;
