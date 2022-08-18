import { AspectRatio, Box, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
    w: string;
    isIcon?: boolean;
};

const Logo = ({ w, isIcon }: Props) => {
    const logoPath = useColorModeValue('/logo/thia-logo-light.svg', '/logo/thia-logo-dark.svg');
    return (
        <Link href='/'>
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
        </Link>
    );
};

export default Logo;
